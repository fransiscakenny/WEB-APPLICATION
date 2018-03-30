"""
SO YOU THINK YOU CAN CATER?
CS 1520 - ASSIGNMENT 3
FRANSISCA K LARASATI
"""
import time
import os
from hashlib import md5
from datetime import datetime
from flask import Flask, request, session, url_for, redirect, render_template, abort, g, flash, _app_ctx_stack
from werkzeug import check_password_hash, generate_password_hash

from threemods import db, Customer, Event, Owner, Staff

#Creating Application:
app = Flask(__name__)

#Configuration:
PER_PAGE = 30
DEBUG = True
SECRET_KEY = 'development key'

SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(app.root_path, 'catering.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config.from_object(__name__)
app.config.from_envvar('CATERING_SETTINGS', silent=True)
db.init_app(app)

public = """<!DOCTYPE html>
<html>
	<head>
		<title>Cathy Cater!</title>
	</head>
	<body>
        <p>Welcome to Cathy Cater!</p>
	</body>
</html>
"""

public1 = """<!DOCTYPE html>
<html>
	<head>
		<title>Cathy!!! Cater!</title>
	</head>
	<body>
        <p>Welcome to Cathy Cater!</p>
	</body>
</html>
"""

@app.cli.command('initdb')
def init_dbcommand():
    db.create_all()
    print("Database has been initialized.")

@app.before_request
def before_request():
	g.user = None
	if 'user_id' in session:
		g.user = Customer.query.filter_by(user_id=session['user_id']).first()

@app.route('/')
def mainpage():
	if not g.user:
		return redirect(url_for('publicmainpage'))

@app.route('/mainpage')
def publicmainpage():
	db.session.add(Owner('owner', 'login'))
	db.session.commit()
	#db.session.add(Event("", "", "", "", ""))
	#db.session.commit()
	return render_template("main.html")

@app.route('/ownerlog', methods=['GET', 'POST'])
def ownerlog():
	events = Event.query.all()
	if request.method == "POST":
		if request.form['username'] != 'owner' or request.form['password'] != 'pass':
			error = "Invalid username/password!"
		else:
			return redirect(url_for("ownerprof"))
	return render_template("ownerlog.html")

@app.route('/ownerprofile', methods=['GET', 'POST'])
def ownerprof():
	events = Event.query.all()
	staffs = Staff.query.all()
	if events is None:
		return render_template("main.html")
		#return render_template("ownerprof.html")
	#return render_template("main.html")
	return render_template("ownerprof.html", events = events, staffs = staffs)
		#events = Event.query.all()
		#return render_template("ownerprof.html", events)


@app.route('/custsignup', methods=['GET', 'POST'])
def custsign():
	if request.method == "POST":
		customer = Customer.query.filter_by(username=request.form['username']).first()
		if customer is None:
			db.session.add(Customer(request.form['username'], request.form['email'], request.form['password']))
			db.session.commit()
			flash("IT WORKS")
			return redirect(url_for("custlog"))
		else:
			error = "Username already exists!"
			return render_template("custsigner.html")
	else:
		return render_template("custsigner.html")

@app.route('/custlogin', methods=['GET', 'POST'])
def custlog():
	if request.method == "POST":
		customer = Customer.query.filter_by(username=request.form['username']).first()
		if customer is None:
			return render_template("custlogger.html")
		if customer is not None:
			if customer.pw_hash != request.form['password']:
				error = "Invalid password!"
				return render_template("custlogger.html")
			else:
				return redirect(url_for("custprofile", username = customer.username))
		else:
			return redirect(url_for("custprofile", username = customer.username))
	return render_template("custlogger.html")

@app.route('/<username>', methods=['GET', 'POST'])
#TRYING SHOWING EVENTS
def custprofile(username):
	events = Event.query.all()
	if request.method == "POST":
		db.session.add(Event(username, request.form['name'], request.form['contact'], request.form['date'], request.form['location']))
		db.session.commit()
		#return render_template("custprofile.html", username = username, events = events)
		return redirect(url_for("savingevent", created = request.form['name']))
	#events = Event.query.filter_by(user=username)
	#events = Event
	return render_template("custprofile.html", username = username, events = events)

@app.route('/saving<created>')
def savingevent(created):
	cevent = Event.query.filter_by(name=created).first()
	if cevent is None:
		error = "Event not found!"
		return render_template("savingevent.html")
	return render_template("event.html", event = cevent)
	#return render_template("event.html", username = cevent.user, name = cevent.name, contact = cevent.contact, date = cevent.date, location = cevent.location)

@app.route('/logout')
def unlogger():
	return render_template("logout.html")

@app.route('/cancel<username><eventname>')
def cancel(username, eventname):
	if eventname is None:
		return render_template("logout.html")
	else:
		#Event.query.filter_by(name=eventname).delete()
		db.session.commit()
		cancelling = Event.query.filter_by(name=eventname).first()
		print("cancelling event:".format(cancelling))
		#cancelling = Event.query.filter_by(name=eventname).all()
		#if cancelling is No,,ne:
		#	return render_template("main.html")
		#else:
		db.session.delete(cancelling)
		db.session.commit()
		return render_template("custprofile.html", username = username, events = Event.query.all())
	return render_template("custprofile.html", username = username, events = Event.query.all())

@app.route('/assignstaff<event>', methods=['GET', 'POST'])
def assign(event):
	eventt = Event.query.all()
	if request.method == 'POST':
		if request.form['staffname'] is None:
			error = "Invalid staff name!"
		else:
			EV = Event.query.filter_by(name = event).first()
			print("EVENTTT event:".format(EV))
			db.session.commit()
			curStaff = Staff.query.filter_by(username = request.form['staffname']).first()
			EV.staff = request.form['staffname']
			curStaff.event = event
			db.session.commit()
			EV.staff = request.form['staffname']
			db.session.commit()
			return redirect(url_for('ownerprof'))
	return render_template("assign.html", events = eventt)

@app.route('/makestaff', methods=['GET', 'POST'])
def makestaff():
	if request.method == 'POST':
		db.session.add(Staff(request.form['username'], request.form['email'], request.form['password']))
		db.session.commit()
		return redirect(url_for('ownerprof'))
	return render_template("makingstaff.html")

@app.route('/stafflog', methods=['GET', 'POST'])
def stafflogger():
	if request.method == "POST":
		staff = Staff.query.filter_by(username=request.form['username']).first()
		print("here0")
		if staff is None:
			print("here1")
			return render_template("stafflogger.html")
		if staff is not None:
			if staff.pw_hash != request.form['password']:
				error = "Invalid password!"
				print("here2")
				return render_template("stafflogger.html")
			else:
				print("here3")
				return redirect(url_for("staffprofile", username = staff.username))
		#else:
			#return redirect(url_for("staffprofile", username = staff.username))
	return render_template("stafflogger.html")

@app.route('/staffprof<username>')
def staffprofile(username):
	#staffevent = Event.query.all()
	staffevent = Event.query.filter_by(staff = username).all()
	eventss = Event.query.filter_by(staff = None).all()

	#staffevent = Event.query.filter_by(staff=username).first()
	#otherevent = Event.query.filter(Event.staff != username).all()
	print("EVENTTT event:".format(staffevent))
	return render_template("staffprof.html", username = username, sevents = staffevent, events = eventss)

@app.route('/signup<staffname>/')
def eventsignup(staffname):
	eventss = Event.query.filter_by(staff = None).all()
	return render_template("eventsign.html", staffname = staffname, events = eventss)

@app.route('/signingup<staffs>/<events>/')
def signup(staffs, events):
	#staffevent = Event.query.filter_by(staff = staffs).all()
	EV = Event.query.filter_by(name = events).first()
	eventss = Event.query.filter_by(staff = None).all()
	if EV is not None:
		db.session.commit()
		curStaff = Staff.query.filter_by(username = staffs).first()
		curStaff.event = events
		db.session.commit()
		EV.staff = staffs
		db.session.commit()
		return redirect(url_for("staffprofile"), username = EV.staff)
		#return redirect(url_for("staffprofile"), username = staffs)
		#return render_template("staffprof.html", username = staffs, sevents = staffevent)
	return render_template("eventsign.html", staffname = staffs, events = eventss)
"""
@app.route('/signingup<staffs><events>/')
def signup1(staffs, events):
	staffevent = Event.query.filter_by(staff = staffs).all()
	EV = Event.query.filter_by(name = events).first()
	eventss = Event.query.filter_by(staff = None).all()
	if EV is not None:
		db.session.commit()
		curStaff = Staff.query.filter_by(username = staffs).first()
		#EV.staff = staffs
		curStaff.event = events
		db.session.commit()
		EV.staff = staffs
		db.session.commit()
		return redirect(url_for("staffprofile"), username = staffs)
		#return render_template("staffprof.html", username = staffs, sevents = staffevent)
	return render_template("staffsign.html")
	#return render_template("staffprof.html", username = staffs, sevents = staffevent)
"""

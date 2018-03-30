"""
CHATTY CATHY
CS 1520 - ASSIGNMENT 4
FRANSISCA K LARASATI
"""

import time
import os
from hashlib import md5
from datetime import datetime
from flask import Flask, jsonify, request, session, url_for, redirect, render_template, abort, g, flash, _app_ctx_stack
from werkzeug import check_password_hash, generate_password_hash
from flask_restful import reqparse, abort, Api, Resource, marshal_with_field, fields

from chatmodel import db, User, ChatRoom, Messages

app = Flask(__name__)
#ADDITIONAL 1
api = Api(app) #Creating the API

#ADDITIONAL 2 ----
#CONFIGURATION:
PER_PAGE = 30
DEBUG = True
SECRET_KEY = 'development key'

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(app.root_path, 'chat.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config.from_object(__name__)
app.config.from_envvar('CATERING_SETTINGS', silent=True)
db.init_app(app)

TODOS = {
    'todo1': {'task': 'build an API'},
    'todo2': {'task': '????'},
    'todo3': {'task': 'profit!'},
}
#CHATS -> CHATROOMNAME -> LISTS OF CHATS
#CHATS = {}


CMESS = {}

@app.cli.command('initdb')
def init_dbcommand():
    db.create_all()
    print("Database has been initialized")

@app.before_request
def before_request():
	g.user = None
	if 'user_id' in session:
		g.user = User.query.filter_by(user_id=session['user_id']).first()

@app.route('/')
def mainpage():
    return redirect(url_for('publicmainpage'))

@app.route('/mainpage')
def publicmainpage():
    return render_template('cmainpage.html')

@app.route('/signup', methods=['GET', 'POST'])
def signingup():
    if request.method == "POST":
        user = User.query.filter_by(username=request.form['username']).first()
        if user is None:
            db.session.add(User(request.form['username'], request.form['email'], request.form['password']))
            db.session.commit()
            return redirect(url_for("signingin"))
        else:
            error = "Username already exists!"
            return render_template("csignin.html")
    return render_template('csignup.html')

@app.route('/signin', methods=['GET', 'POST'])
def signingin():
    if request.method == "POST":
        user = User.query.filter_by(username = request.form['username']).first()
        if user is None:
            error = "Username / Password not found!"
            return redirect(url_for("signingup"))
        else:
            return redirect(url_for("profile", username = user.username))
    return render_template('csignin.html')

@app.route('/<username>profile', methods=['GET', 'POST'])
def profile(username):
    c = ChatRoom.query.all()
    return render_template("cprofile.html", username = username, chatroom = c)

@app.route('/<username>createcr', methods=['GET', 'POST'])
def createcr(username):
    if request.method == "POST":
        cr = ChatRoom.query.filter_by(name = request.form['name']).first()
        if cr is not None:
            error = "Chat Room name already exists!"
        else:
            #ADDING CHAT NAME TO CHATS
            TODOS[request.form['name']] = ['HEY!'] #will be list of the chats
            session[request.form['name']] = TODOS[request.form['name']]
            db.session.add(ChatRoom(request.form['name']))
            db.session.commit()
            return redirect(url_for("chatroom", name=request.form['name'], username = username))
    return render_template("newcr.html", username = username)

@app.route('/chatroom<name>/<username>/', methods=['GET', 'POST'])
def chatroom(name, username):
    m = Messages.query.filter_by(name = name).all()
    if request.method == "POST":
        db.session.add(Messages(name = name, username = username, message = request.form['message']))
        db.session.commit()
        CMESS["name"] = ""
        mess = ""
        mess += username
        mess += ": "
        mess += request.form['message']
        TODOS[name].append(mess)
        #TODOS[name].append(request.form['message'])
        m = Messages.query.filter_by(name = name).all()
        return render_template("chatroom.html", username = username, name=name, message = m)
    return render_template("chatroom.html", username = username, name=name, message = m)

@app.route('/logout')
def logout():
    return render_template("logout.html")
@app.route('/cr<name>', methods=['GET'])
def getmessage(name):
    m = Messages.query.filter_by(name = name).all()
    mlist = []
    for n in m:
        mlist.append(n)
    return jsonify({"messages": [x.json for x in mlist]})
    #return jsonify(mlist)

def abort_if_todo_doesnt_exist(todo_id):
    if todo_id not in TODOS:
        abort(404, message="Todo {} doesn't exists".format(todo_id))

parser = reqparse.RequestParser()
parser.add_argument('task')

# TODOS
# Shows a single todo item and lets you delete a todo item

class Todo(Resource):
    def get(self, todo_id):
        abort_if_todo_doesnt_exist(todo_id)
        return TODOS[todo_id]

    def delete(self, todo_id):
        abort_if_todo_doesnt_exist(todo_id)
        del TODOS[todo_id]
        return '', 204

    def put(self, todo_id):
        args = parser.parse_args()
        task = {'task': args['task']}
        TODOS[todo_id] = task
        return task, 201

class TodoList(Resource):
    def get(self):
        return TODOS

    def post(self):
        args = parser.parse_args()
        todo_id = int(max(TODOS.keys()).lstrip('todo')) + 1
        todo_id = 'todo%i' % todo_id
        TODOS[todo_id] = {'task': args['task']}
        return TODOS[todo_id], 201
#ADDITIONAL
#ACTUALLY SETTING UP API RESOURCE ROUTING HERE:
api.add_resource(TodoList, '/todos')
api.add_resource(Todo, '/todos/<todo_id>')

if __name__ == '__main__':
    app.run(debug=True)

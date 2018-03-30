from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Owner(db.Model):
    user_id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(24), nullable=False)
    pw_hash = db.Column(db.String(64), nullable=False)

    def __init__(self, username, pw_hash):
            self.username = username
            self.pw_hash = pw_hash

    def __repr__(self):
            return '<Owner {}>'.format(self.username)

class Staff(db.Model):
    user_id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(24), nullable=False)
    email = db.Column(db.String(80), nullable=False)
    pw_hash = db.Column(db.String(64), nullable=False)
    event = db.Column(db.String(24), nullable=True)

    def __init__(self, username, email, pw_hash):
        self.username = username
        self.email = email
        self.pw_hash = pw_hash

    def __repr__(self):
        return '<Owner {}>'.format(self.username)

class Customer(db.Model):
	user_id = db.Column(db.Integer, primary_key=True)
	username = db.Column(db.String(24), nullable=False)
	email = db.Column(db.String(80), nullable=False)
	pw_hash = db.Column(db.String(64), nullable=False)

	def __init__(self, username, email, pw_hash):
		self.username = username
		self.email = email
		self.pw_hash = pw_hash

	def __repr__(self):
		return '<User {}>'.format(self.username)

class Event(db.Model):
    userid = db.Column(db.Integer, primary_key=True)
    user = db.Column(db.String(24), nullable=False)
    name = db.Column(db.String(24), nullable=False)
    contact = db.Column(db.String(24), nullable=False)
    date = db.Column(db.Integer, nullable=False)
    location = db.Column(db.String(24), nullable=False)
    staff = db.Column(db.String(24), nullable=True)

    def __init__(self, user, name, contact, date, location):
            self.user = user
            self.name = name
            self.contact = contact
            self.date = date
            self.location = location

    def __repr__(self):
            return '<Event {}>'.format(self.name)

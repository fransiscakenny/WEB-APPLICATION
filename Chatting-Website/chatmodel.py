from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    user_id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(24), nullable=False)
    email = db.Column(db.String(24), nullable=False)
    password = db.Column(db.String(24), nullable=False)

    def __init__(self, username, email, password):
        self.username = username
        self.email = email
        self.password = password

    def __repr__(self):
        return '<User {}>'.format(self.username)

class ChatRoom(db.Model):
    user_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(24), nullable=False)

    def __init__(self, name):
        self.name = name

    def __repr__(self):
        return 'Chat Room: {}'.format(self.name)


class Messages(db.Model):
    user_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(24), nullable=False)
    username = db.Column(db.String(24), nullable=False)
    message = db.Column(db.String(150), nullable=False)

    def __init__(self, name, username, message):
        self.name = name
        self.username = username
        self.message = message

    def __repr__(self):
        return '{}: {}'.format(self.username, self.message)


"""
class ChatRoom(db.Model):
    name = db.Column(db.String(24), nullable=False) #name of the chatroom
    messages =
    def __init__(self, name, chat):
        self.name = name
        chat = json.dumps(chat)
        message = json.loads(chat)
        self.messages = message

    def __repr__(self):
        return '<User {}>'.format(self.name)

def toJSON(self):
    return {""}

"""

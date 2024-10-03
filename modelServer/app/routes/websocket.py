from flask import Blueprint
from flask_sockets import Sockets

bp = Blueprint('websocket', __name__)
sockets = Sockets()

@sockets.route('/ws')
def websocket(ws):
    while not ws.closed:
        message = ws.receive()
        ws.send(f"Echo: {message}")

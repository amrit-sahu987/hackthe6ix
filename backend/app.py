from flask import Flask, jsonify, request
#from flask_restful import reqparse, Api, Resource
from flask_cors import CORS
import json

app = Flask(__name__)
user_agent_data = None
CORS(app)
'''
api = Api(app)

parser = reqparse.RequestParser()
parser.add_argument('task')
class Message(Resource):
    def get(self):
        return {"message": 'Hello World'}
api.add_resource(Message, '/api/hello')
'''
@app.route("/api/userAgent", methods=['POST'])
def user_agent():
    user_agent = request.json['userAgent']
    user_agent_data = json.dumps(user_agent)
    return jsonify({
        'userAgent': user_agent
    })

@app.route("/api/home", methods=['GET'])
def return_home():
    if user_agent_data == "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 Edg/126.0.0.0":
        return None
    else:
        return app.send_static_file('index.tsx')
    
@app.route("/api/userInfo", methods=['GET'])
def user_info():
    return app.send_static_file('userInfo.tsx')

@app.route("/api/echo", methods=['POST'])
def echo():
    data = request.get_json()
    return jsonify({
        'username': data.get('username', ''),
        'password': data.get('password', '')
    })

@app.route("/api/ipAddress", methods=['POST'])
def ip_address():
    ip_address = request.json['data']
    return jsonify({
        'ip_address': ip_address
    })

if __name__ == '__main__':
    app.run(debug=True, port=8080)
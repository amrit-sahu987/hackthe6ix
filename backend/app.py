from flask import Flask, jsonify, request
#from flask_restful import reqparse, Api, Resource
from flask_cors import CORS

app = Flask(__name__)
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

@app.route("/api/home", methods=['GET'])
def return_home():
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

@app.route("/api/userAgent", methods=['POST'])
def user_agent():
    user_agent = request.json['userAgent']
    return jsonify({
        'userAgent': user_agent
    })

if __name__ == '__main__':
    app.run(debug=True, port=8080)
from flask import Flask, jsonify, request
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

@app.route("/api/userAgent", methods=['POST'])
def user_agent():
    user_agent = request.json['userAgent']
    user_agent_data = json.dumps(user_agent)
    return jsonify({
        'userAgent': user_agent
    })

@app.route("/api/home", methods=['GET'])
def return_home():
    user_agent_data = request.headers.get('User-Agent')
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
    ip_address = request.remote_addr 
    user_agent = request.headers.get('User-Agent') 

    return jsonify({
        'username': data.get('username', ''),
        'password': data.get('password', ''),
        'ip_address': ip_address,
        'user_agent': user_agent
    })

@app.route("/api/ipAddress", methods=['POST'])
def ip_address():
    if request.headers.getlist("X-Forwarded-For"):
        ip_address = request.headers.getlist("X-Forwarded-For")[0]
    else:
        ip_address = request.remote_addr
    return jsonify({
        'ip_address': ip_address
    })

if __name__ == '__main__':
    app.run(debug=True, port=8080)
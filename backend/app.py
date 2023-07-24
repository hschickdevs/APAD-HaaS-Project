from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin

app = Flask(__name__)

cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route('/')
def home():
    return "Hello! https://www.youtube.com/watch?v=dQw4w9WgXcQ"

@app.route('/api/get-test-data', methods=['GET'])
def get_data():
    data = {"name": "Harrison",
            "opinion": "Python is EZ"}
    return jsonify(data)

@app.route('/api/post-test-data', methods=['POST'])
def post_data():
    data = request.get_json()  # Get data posted as a json
    return jsonify(data), 201  # Return data with 201 status code


if __name__ == '__main__':
    app.run()
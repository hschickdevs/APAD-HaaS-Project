from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)

cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route('/')
def home():
    return "Use the /api route to fetch data."


""" ------------------------ TEST ROUTES ------------------------ """

@app.route('/api/test', methods=['GET'])
def get_data():
    data = {"name": "Harrison", "opinion": "Python is EZ"}
    return jsonify(data)


@app.route('/api/post-test-data', methods=['POST'])
def post_data():
    data = request.get_json()  # Get data posted as a json
    return jsonify(data), 201  # Return data with 201 status code


""" ------------------------ AUTH ROUTES ------------------------ """

@app.route('/api/auth/login', methods=['GET', 'POST'])
def get_data():
    """
    ON POST: Handle user login
    ON GET: Check if user is logged in

    :return: err ???
    """
    data = {"name": "Harrison", "opinion": "Python is EZ"}
    return jsonify(data)


@app.route('/api/auth/signup', methods=['GET', 'POST'])
def get_data():
    """
    ON POST: Handle user signup
    ON GET: ???

    :return: err ???
    """
    data = {"name": "Harrison", "opinion": "Python is EZ"}
    return jsonify(data)


if __name__ == '__main__':
    app.run()

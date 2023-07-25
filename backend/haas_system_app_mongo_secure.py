from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from flask_jwt_extended import JWTManager, jwt_required, create_access_token
from werkzeug.security import generate_password_hash, check_password_hash
from os import getenv

app = Flask(__name__)
app.config['MONGO_URI'] = 'mongodb://localhost:27017/myDatabase'  # Update this with the live MongoDB URI
app.config['JWT_SECRET_KEY'] = getenv("FLASK_SECRET_KEY")
mongo = PyMongo(app)
jwt = JWTManager(app)

"""
NECESSARY DOCUMENTATION:

- With the implementation of jwt 
"""

@app.route('/')
def home():
    return "Welcome to the HaaS system!"


@app.route('/register', methods=['POST'])
def register():
    username = request.json.get('username', None)
    password = request.json.get('password', None)
    password_hash = generate_password_hash(password)

    # Save the username and hashed password to the MongoDB database
    # ...

    return jsonify({"msg": "User registered successfully!", "username": username, "password": password}), 201


@app.route('/login', methods=['POST'])
def login():
    username = request.json.get('username', None)
    password = request.json.get('password', None)

    # Fetch the user from your MongoDB database and verify their password
    # This is just a placeholder logic:
    user = {"username": "test", "password": generate_password_hash("test")}  # Replace this with the MongoDB query

    # Check for discrepancies (Can make these one response if security flaw)
    if username != user["username"]:
        return jsonify({"msg": "Bad username"}), 401
    if not check_password_hash(user["password"], password):
        return jsonify({"msg": "Bad password"}), 401

    access_token = create_access_token(identity=username)
    return jsonify(access_token=access_token), 200


""" ------------------------ PROJECT ROUTES ------------------------ """


@app.route('/api/create_project', methods=['POST'])
@jwt_required
def create_project():
    # Implement project creation logic here
    return "Project created successfully!", 200


@app.route('/api/access_project/<int:project_id>', methods=['GET'])
@jwt_required
def access_project(project_id):
    # Implement project access logic here
    return f"Accessing project with id {project_id}", 200


""" ------------------------ RESOURCE ROUTES ------------------------ """


@app.route('/api/view_resources', methods=['GET'])
@jwt_required
def view_resources():
    # Implement resource viewing logic here
    return "Viewing all resources", 200


@app.route('/api/check_out_resource/<int:resource_id>', methods=['POST'])
@jwt_required
def request_resource():
    resource_id = request.json["resource_id"]
    project_id = request.json["project_id"]
    # Implement resource request logic here
    return f"Resource {resource_id} checked out successfully!", 200


@app.route('/api/check_in_resource/<int:resource_id>', methods=['POST'])
@jwt_required
def check_in_resource(resource_id):
    # Implement resource check-in logic here
    return f"Resource with id {resource_id} checked in successfully!", 200


if __name__ == "__main__":
    app.run(debug=True)

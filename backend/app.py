from werkzeug.security import generate_password_hash, check_password_hash
from os import getenv

from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, jwt_required, create_access_token

import database

app = Flask(__name__)

cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

app.config['CORS_HEADERS'] = 'Content-Type'
app.config['JWT_SECRET_KEY'] = getenv("JWT_SECRET_KEY")

jwt = JWTManager(app)

"""
NECESSARY DOCUMENTATION:

- With the implementation of jwt, requests to methods with @jwt_required( decorator must have an 
  "Authorization: Bearer <YOUR_TOKEN>" header with the access token specified
- Posts should specify "Content-Type: application/json" header as well

ENVIRONMENT VARIABLES REQUIRED:
- JWT_SECRET_KEY
- MONGO_DB_URI (e.g. 'mongodb://localhost:27017/myDatabase')

ERROR CODES:
- 401: Bad Credentials/Unauthorized
- 400: Bad Request
- 200: Success
"""


@app.route('/')
def home():
    return jsonify({
        "name": "Hardware-as-a-Service System API",
        "version": "MVP",
        "description": "This API allows users to manage accounts, projects, and resources in the HaaS system.",
        "routes": {
            "/api/register": "POST: Register a new user",
            "/api/login": "POST: Login and receive a JWT token",
            "/api/create_project": "POST: Create a new project (requires JWT token)",
            "/api/access_project": "GET: Access a specific project (requires JWT token)",
            "/api/view_resources": "GET: View all available resources (requires JWT token)",
            "/api/check_out_resource": "POST: Check out a resource (requires JWT token)",
            "/api/check_in_resource": "POST: Check in a resource (requires JWT token)"
        }})



""" ------------------------ AUTHORIZATION ROUTES ------------------------ """


@app.route('/api/register', methods=['POST'])
def register():
    username = request.json.get('username', None)
    password = request.json.get('password', None)
    password_hash = generate_password_hash(password)

    # Check if user already exists, and if not
    # Save the username and hashed password to the MongoDB database
    try:
        database.addUser(username, password_hash)
    except Exception as err:
        return jsonify({"msg": f"Error: {err}"}), 400

    return jsonify({"msg": "User registered successfully!", "user": {"username": username, "password": password}}), 200


@app.route('/api/login', methods=['POST'])
def login():
    username = request.json.get('username', None)
    password = request.json.get('password', None)

    # Fetch the user from your MongoDB database and verify their password
    # user = {"username": "test", "password": generate_password_hash("test")}  # This is just placeholder logic
    # Check for discrepancies (Can make these one response if security flaw)
    user = database.findUser(username)
    if user is None:
        return jsonify({"msg": "User not found"}), 401
    if not check_password_hash(user["password"], password):
        return jsonify({"msg": "Bad password"}), 401

    access_token = create_access_token(identity=username)
    return jsonify(access_token=access_token), 200


""" ------------------------ PROJECT ROUTES ------------------------ """


@app.route('/api/create_project', methods=['POST'])
@jwt_required()
def create_project():
    # Implement project creation logic here
    try:
        database.addProject(request.json["project_id"], request.json["username"], request.json["projectName"], request.json["projectDescription"])
    except Exception as err:
        return jsonify({"msg": f"Error: {err}"}), 400

    return "Project created successfully!", 200  # Should return new project ID and data


@app.route('/api/access_project', methods=['GET'])
@jwt_required()
def access_project():
    project_id = request.json["project_id"]

    # Implement project access logic here
    try:
        project = database.findProject(project_id)
    except Exception as err:
        return jsonify({"msg": f"Error: {err}"}), 400
    
    return jsonify(project), 200


""" ------------------------ RESOURCE ROUTES ------------------------ """


@app.route('/api/view_resources', methods=['GET'])
@jwt_required()
def view_resources():
    # Implement resource viewing logic here
    return "Viewing all resources", 200


@app.route('/api/check_out_resource', methods=['POST'])
@jwt_required()
def request_resource():
    resource_id = request.json["resource_id"]
    project_id = request.json["project_id"]
    quantity = request.json["quantity"]

    # Implement resource request logic here with MongoDB
    # ...

    return f"{quantity} of resource {resource_id} checked out successfully!", 200


@app.route('/api/check_in_resource', methods=['POST'])
@jwt_required()
def check_in_resource():
    resource_id = request.json["resource_id"]
    project_id = request.json["project_id"]
    quantity = request.json["quantity"]

    # Implement resource check-in logic here with MongoDB
    # ...

    return f"{quantity} of resource {resource_id} checked in successfully!", 200


if __name__ == "__main__":
    app.run(debug=True)

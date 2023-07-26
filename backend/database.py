# Packages
import pymongo
from hashlib import md5 # Replace with the new package for encode / decode
from os import getenv

# Initializing
client    = pymongo.MongoClient(getenv("MONGO_DB_URI"))
database  = client["project-database"]

users     = database.users
projects  = database.projects
resources = database.resources
hardwares = database.hardwares

### HARDWARES NEEDS TO BE INITIALIZED WITH HARDCODED VALUES ALREADY ###
print(f"Database Initialized - Connected to databases: {', '.join(list(client.list_database_names()))}")

# USERS DATABASE METHODS -----------------------------------------------------------
def findUser(username):
    user = users.find_one({'username': username})
    return user

def addUser(username, password):
    user_dict = {
        "username": username,
        "password": md5(password.encode('utf-8')).hexdigest()
    }
    if findUser(username) != None:
        raise ValueError("Username already exists")
    
    users.insert_one(user_dict)
    return user_dict



# PROJECTS DATABASE METHODS ---------------------------------------------------------
def findProject(project_id):
    return projects.find_one({'project_id': project_id})

def addProject(project_id, username, projectName, projectDescription):
    project_dict = {
        "project_id": project_id,
        "username": username,
        "projectName": projectName,
        "projectDescription": projectDescription
    }
    if findProject(project_id) != None:
        raise ValueError("Project ID already exists")
        
    projects.insert_one(project_dict)
    return project_dict

# RESOURCES DATABASE METHODS ---------------------------------------------------------
def findResource(checkedOut_id):
    return resources.find_one({'checkedOut_id': checkedOut_id})
    

def addResource(checkedOut_id, project_id, hardware_id, checkedOut):
    resource_dict = {
        "checkedOut_id": checkedOut_id,
        "project_id": project_id,
        "hardware_id": hardware_id,
        "checkedOut": checkedOut
    }
    resources.insert_one(resource_dict)
    return resource_dict

# HARDWARES DATABASE METHODS --------------------------------------------------------
def findHardware(hardware_id):
    return hardwares.find_one({'hardware_id': hardware_id})

def addHardware(hardware_id, maxAmount, availableAmount):
    hardware_dict = {
        "hardware_id": hardware_id,
        "maxAmount": maxAmount,
        "availableAmount": availableAmount
    }
    hardwares.insert_one(hardware_dict)
    return hardware_dict








# ---------------------------------------------- TESTS ----------------------------------------------------------
'''


# def deleteUser(username): # Not needed
#     users.delete_one({'username': username})


import pymongo 

class Database():
    
    @staticmethod
    def init():
        client = pymongo.MongoClient("mongodb+srv://ianjenatz:Group6-Password@group6.4bbohko.mongodb.net/?retryWrites=true&w=majority")
        database  = client["project-database"]
    
    @staticmethod
    def findDB(collection, payload):
        object = database[collection].find_one(payload)
        return object

    @staticmethod
    def addDB(collection, payload):
        database[collection].insert_one(payload)
    
    @staticmethod
    def updateDB(collection, payload):
        database[collection].update_one() # Have to recheck Mongo Update vs Upsert

    # Whatever Else Methods We Need




'''
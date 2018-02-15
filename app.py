import os
from os.path import join, dirname
# from dotenv import load_dotenv
import sqlite3 as sql
from flask import Flask, request, Response, json, render_template
from flask_pymongo import PyMongo


#Environment Variables
# dotenv_path = join(dirname(__file__), '.env')
# load_dotenv(dotenv_path)

app = Flask(__name__, template_folder='static')

#Connect flask app to you MongoDB server
mongo = PyMongo(app)
app.config['MONGO_URI'] = 'mongodb://localhost:27017/myproject'


#Route for /
@app.route("/")
def hello():
    return render_template('/index.html')

#Post request method for /login
@app.route('/login', methods=['POST'])
def login():
    email =  request.form['email'];
    password = request.form['password'];
    con = sql.connect("temp.db")
    cur = con.cursor()
    cur.execute("INSERT INTO users (email,password) VALUES (?,?)", ('fadi', '123'))
    temp = cur.execute("SELECT * from users (email, password) VALUES (?, ?)", (email, password))
    print(temp.fetchall())
    if email == 'fadi' and password == '123':
        return json.dumps({
            'auth': True,
            'user': email
        })
    else:
        return json.dumps({
            'auth': False,
            'user': email
        })

#Post request method for /register
@app.route('/register', methods=['POST'])
def register():
    email =  request.form['email'];
    password = request.form['password'];
    return json.dumps({
        'registered': True,
        'user': email,
    });

if __name__ == "__main__":
    app.run(port=5000)
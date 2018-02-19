import os
from os.path import join, dirname
# from dotenv import load_dotenv
import sqlite3 as sql
from flask import Flask, request, Response, json, jsonify, render_template
from flask_pymongo import PyMongo


#Environment Variables
# dotenv_path = join(dirname(__file__), '.env')
# load_dotenv(dotenv_path)

app = Flask(__name__, template_folder='static')
app.config["DEBUG"] = True

#Route for /
@app.route("/")
def hello():
    return render_template('/index.html')

def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d

#Post request method for /login
@app.route('/login', methods=['POST'])
def login():
    email =  request.form['email'];
    password = request.form['password'];
    con = sql.connect("temp.db")
    con.row_factory = dict_factory
    cur = con.cursor()
    # cur.execute("CREATE TABLE users(id INT PRIMARY_KEY, firstName TEXT, lastName TEXT, email TEXT UNIQUE, password TEXT)")
    cur.execute("INSERT INTO Users VALUES(1, 'Fadi', 'Bitar', 'fadi', '123')")
    cur.execute("SELECT * FROM users WHERE email = 'fadi';")
    temp = cur.fetchone()
    print(temp)
    if email == temp["email"] and password == temp["password"]:
        return jsonify({
            'auth': True,
            'user': email
        })
    else:
        return jsonify({
            'auth': False
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
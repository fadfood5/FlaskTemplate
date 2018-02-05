import os
from os.path import join, dirname
from dotenv import load_dotenv
from flask import Flask, request, json, render_template
from flask.ext.mysql import MySQL

#Environment Variables
dotenv_path = join(dirname(__file__), '.env')
load_dotenv(dotenv_path)

app = Flask(__name__, template_folder='static')

#Start mySQL server
mysql = MySQL()
app.config['MYSQL_DATABASE_USER'] = os.environ.get("MYSQL_DATABASE_USER")
app.config['MYSQL_DATABASE_PASSWORD'] = os.environ.get("MYSQL_DATABASE_PASSWORD")
app.config['MYSQL_DATABASE_DB'] = os.environ.get("MYSQL_DATABASE_DB")
app.config['MYSQL_DATABASE_HOST'] = 'localhost'
mysql.init_app(app)
conn = mysql.connect()

#Route for /
@app.route("/")
def hello():
    return render_template('/index.html')
 

#Post request method for /register
@app.route('/register', methods=['POST'])
def register():
    user =  request.form['username'];
    password = request.form['password'];
    return json.dumps({
        'status': 'OK',
        'user': user,
    });

if __name__ == "__main__":
    app.run(port=3000)
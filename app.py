import os
from os.path import join, dirname
# from dotenv import load_dotenv
from flask import Flask, request, Response, json, render_template

#Environment Variables
# dotenv_path = join(dirname(__file__), '.env')
# load_dotenv(dotenv_path)

app = Flask(__name__, template_folder='static')

#Start mySQL server


#Route for /
@app.route("/")
def hello():
    return render_template('/index.html')

#Post request method for /login
@app.route('/login', methods=['POST'])
def do_admin_login():
    print(request.form)
    user =  request.form['username'];
    password = request.form['password'];
    if user == 'fadi' and password == '123':
        return json.dumps({
            'auth': 1,
            'user': user
        })
    else:
        return json.dumps({
            'auth': 0,
            'user': user
        })

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
    app.run(port=5000)
from flask import Flask, request, jsonify, send_file, render_template, make_response
from flask_cors import CORS  # Import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
name_list = []


@app.route('/', methods=['GET'])
def getFirstPage():
    return render_template('/index.html')


@app.route('/Login_page.html', methods=['GET'])
def getLoginPage():
    return render_template('/Login_page.html')


@app.route('/index.html',methods=['GET'])
def getIndexPage():
    return render_template('/index.html')

@app.route('/login', methods=['POST'])
def loginCalc():
    # Get the image URL from the query parameters
    username = request.form.get('username')
    print('Received download: ', username)
    password = request.form.get('password')
    print('Received download: ', password)
    name_list.append(username)
    response = make_response(name_list)
    response.set_cookie('username', username)
    return response


if __name__ == '__main__':
    app.run(debug=True, port=5500)

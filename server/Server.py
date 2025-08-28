from flask import Flask, request, jsonify, send_file, render_template, make_response
from flask_cors import CORS  # Import CORS
from community_place import CommunityPlace
import os

from db_users import *

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
name_list = []
IMAGES_FOLDER = os.path.join(os.getcwd(), "static/images")
i = 0

@app.route('/', methods=['GET'])
def getFirstPage():
    return render_template('/userView.html')


@app.route('/Login_page.html', methods=['GET'])
def getLoginPage():
    return render_template('/Login_page.html')


@app.route('/index.html',methods=['GET'])
def getIndexPage():
    return render_template('/index.html')

@app.route('/login', methods=['GET', 'POST'])
def loginCalc():
    # Get the image URL from the query parameters

    username = request.form.get('username')
    print('Received download: ', username)
    password = request.form.get('password')
    print('Received download: ', password)


def login():
    username = request.args.get('username')
    print(username)
    password = request.args.get('password')
    print(password)
    name_list.append(username)
    response = make_response(name_list)
    response.set_cookie('username', username)
    result = login_user(username, password)

    if result is None:
        response.status_code = 404
    else:
        response.status_code = 200
    response.status_code = 200
    return response

@app.route('/userView.html', methods=['GET'])
def userViewGet():
    return render_template('/userView.html')



@app.route('/RegisterRequest', methods=['GET'])
def getRegister():
    username = request.args.get('username')
    print(username)
    password = request.args.get('password')
    print(password)
    phone = request.args.get('phone')
    print(phone)


    response = make_response()
    response.status_code = 200
    return response


@app.route('/Login_page', methods=['GET'])
def getLoginPageAll():
    return render_template('/Login_page.html')

@app.route('/register.html', methods=['GET'])
def getRegisterPageAll():
    return render_template('/register.html')

@app.route('/community_places', methods=['GET'])
def get_community_places():
    global i
    places = []
    for idx, filename in enumerate(os.listdir(IMAGES_FOLDER)):
        description = f"This is a description for {filename}"
        picture_path = f"/static/images/{filename}"
        place = CommunityPlace(
            name=filename.split('.')[0],
            description=description,
            picture_path=picture_path,
            id=idx
        )
        places.append({
            "id": place.id,
            "name": place.name,
            "description": place.description,
            "picture_path": place.picture_path
        })
    response = make_response()
    response.status_code = 200
    response.data = jsonify(list[i])
    i += 1
    if i > len(places):
        i = 0
    return response


if __name__ == '__main__':
    app.run(debug=True, port=5500)

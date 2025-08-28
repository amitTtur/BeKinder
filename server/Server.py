from flask import Flask, request, jsonify, send_file, render_template, make_response
from flask_cors import CORS  # Import CORS
from community_place import CommunityPlace
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
name_list = []
IMAGES_FOLDER = os.path.join(os.getcwd(), "static/images")


@app.route('/', methods=['GET'])
def getIndexPage():
    return render_template('Login_page.html')


@app.route('/Login_page.html', methods=['GET'])
def getLoginPage():
    return render_template('Login_page.html')


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


@app.route('/community_places', methods=['GET'])
def get_community_places():
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

    return jsonify(places)


if __name__ == '__main__':
    app.run(debug=True, port=5500)

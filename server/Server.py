from flask import Flask, request, jsonify, send_file
from flask_cors import CORS  # Import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/login', methods=['POST'])
def download_image():
    # Get the image URL from the query parameters
    username = request.args.get('Username')
    print('Received download: ', username)
    password = request.args.get('Password')
    print('Received download: ', password)



if __name__ == '__main__':
    app.run(debug=True, port=5500)

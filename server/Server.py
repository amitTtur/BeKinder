from flask import Flask, request, jsonify, send_file
from flask_cors import CORS  # Import CORS
from logicExtractor import getSiteMediaUrl,order_ambitious_url,extractName
import requests
from io import BytesIO

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

#getsTheUrl
@app.route('/search', methods=['GET'])
def search():
    query = request.args.get('url')
    print('Received search query:', query)
    urls = getSiteMediaUrl(query)
    print(urls)
    return jsonify({"query_received": urls})

@app.route('/download_image', methods=['GET'])
def download_image():
    # Get the image URL from the query parameters
    image_url = request.args.get('url')
    print('Received download: ', image_url)

    if not image_url:
        return "No image URL provided.", 400

    try:
        # Send a GET request to the image URL
        response = requests.get(order_ambitious_url(image_url))

        # Check if the request was successful
        if response.status_code == 200:
            # Create an in-memory bytes buffer to hold the image data
            image_data = BytesIO(response.content)

            # Set the appropriate MIME type for the image
            return send_file(image_data, mimetype='image/png', as_attachment=True, download_name='downloaded_image.png')
        else:
            return f"Failed to download image. Status code: {response.status_code}", 400
    except Exception as e:
        return f"An error occurred: {e}", 500

if __name__ == '__main__':
    app.run(debug=True, port=50000)

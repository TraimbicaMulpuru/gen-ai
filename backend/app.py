from flask import Flask, request, jsonify
from flask_cors import CORS # CRITICAL
import recommender

app = Flask(__name__)
# This line tells Python to accept requests from your React App
CORS(app) 

@app.route('/recommend', methods=['POST'])
def recommend():
    try:
        data = request.json
        print(f"User Request: {data}")
        result = recommender.get_outfit(data)
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    # Running on 5002 as requested
    app.run(debug=True, port=5002)
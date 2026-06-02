from flask import Flask
from flask_cors import CORS

from src.routes.face_routes import face_bp

app = Flask(__name__)
CORS(app)
app.register_blueprint(face_bp)

if __name__ == '__main__':
    app.run(port=5001)

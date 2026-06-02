from flask import Blueprint, request, jsonify
import face_recognition

from ..services.image_utils import decode_base64_image
from ..services import face_store

face_bp = Blueprint('face', __name__)


@face_bp.route('/register', methods=['POST'])
def register():
    data = request.json
    name = data['name']
    rgb_img = decode_base64_image(data['image'])
    encodings = face_recognition.face_encodings(rgb_img)
    if not encodings:
        return jsonify({'result': 'no_face'})
    face_store.save_face(name, encodings[0].tolist())
    return jsonify({'result': 'registered', 'name': name})


@face_bp.route('/recognize', methods=['POST'])
def recognize():
    data = request.json
    rgb_img = decode_base64_image(data['image'])
    encodings = face_recognition.face_encodings(rgb_img)
    if not encodings:
        return jsonify({'result': 'no_face'})
    name = face_store.find_match(encodings[0])
    if name:
        return jsonify({'result': 'recognized', 'name': name})
    return jsonify({'result': 'unknown'})

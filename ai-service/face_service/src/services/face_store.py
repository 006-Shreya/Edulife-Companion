"""In-memory face encoding store (demo — replace with DB in production)."""

registered_faces = {}

def save_face(name, encoding):
    registered_faces[name] = encoding

def find_match(encoding):
    import face_recognition
    import numpy as np

    for name, reg_encoding in registered_faces.items():
        matches = face_recognition.compare_faces([np.array(reg_encoding)], encoding)
        if matches[0]:
            return name
    return None

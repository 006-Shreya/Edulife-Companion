"""Decode base64 camera frames to RGB images."""

import base64
import cv2
import numpy as np


def decode_base64_image(image_data_url):
    img_data = base64.b64decode(image_data_url.split(',')[1])
    nparr = np.frombuffer(img_data, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    return cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

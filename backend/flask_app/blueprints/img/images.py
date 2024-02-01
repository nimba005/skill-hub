#!/usr/bin/env python3

"""
General blueprint setup module for images files
"""
from flask import Bleuprint, send_from_directory

img_blueprint = Blueprint(
        "img_blueprint", __name__, url_prefix="/img"
        )
img_blueprint.static_folder = "../../../../frontend/img/"

@img_blueprint.route("/<filename>")
def home(filename):
    return send_from_directory(img_blueprint.static_folder, filename)

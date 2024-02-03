#!/usr/bin/env python3

"""
General blueprint setup module for styles
"""
from flask import Blueprint, send_from_directory

styles_blueprint = Blueprint(
        "styles_blueprint", __name__, url_prefix="/assets/style"
        )
styles_blueprint.static_folder = "../../../../frontend/assets/style/"

@styles_blueprint.route("/<filename>")
def home(filename):
    return send_from_directory(styles_blueprint.static_folder, filename)

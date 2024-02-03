#!/usr/bin/env python3

"""
General blueprint setup module for scripts
"""
from flask import Blueprint, send_from_directory

scripts_blueprint = Blueprint(
        "scripts_blueprint", __name__, url_prefix="/assets/script"
        )
scripts_blueprint.static_folder = "../../../../frontend/assets/script/"

@scripts_blueprint.route("/<filename>")
def home(filename):
    return send_from_directory(scripts_blueprint.static_folder, filename)

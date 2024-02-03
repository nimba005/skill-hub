#!/usr/bin/env python3

"""
General blueprint setup module for web
"""
from flask import Blueprint, render_template

web_blueprint = Blueprint("web_blueprint", __name__)

@web_print.route("/")
def home():
    return render_template("index.html")

@web_blueprint.route("/<filename>")
def html(filename):
    return render_template(filename)

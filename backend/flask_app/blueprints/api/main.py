#!/usr/bin/env python3
"""
source for all api blueprints
"""
from flask import Blueprint

api_blueprint = Blueprint("apis", __name__, url_prefix="/api")

from backend.flask_app.blueprints.api import course
from backend.flask_app.blueprints.api import user
from backend.flask_app.blueprints.api import review
from backend.flask_app.blueprints.api import registered_course

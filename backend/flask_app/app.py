#!/usr/bin/env python3

"""
Flask app module
"""

from flask import Flask
from backend.flask_app.blueprints.html.web import web_blueprint
from backend.flask_app.blueprints.assets.styles import styles_blueprint
from backend.flask_app.blueprints.assets.scripts import scripts_blueprint
from backend.flask_app.blueprints.img.images import img_blueprint
from backend.flask_app.blueprints.api.main import api_blueprint
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Set the template folder
template_folder = "../../frontend/HTML/"
app.template_folder = template_folder

# Setting static folder
static_folder = "../../frontend/assets/"
app.static_folder = static_folder

#Setting identation for better readability of json response
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = True

@app.route('/favicon.ico')
def favicon():
    return '', 204

app.register_blueprint(web_blueprint)
app.register_blueprint(styles_blueprint)
app.register_blueprint(scripts_blueprint)
app.register_blueprint(img_blueprint)
app.register_blueprint(api_blueprint)

if __name__ == "__main__":
    app.run(debug=True)

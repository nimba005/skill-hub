#!/usr/bin/env python3
"""
Blueprint for reviews on courses route
"""

from flask import jsonify, abort, request
from backend.flask_app.blueprints.api.main import api_blueprint
from backend.storage.tables.review import Review
from backend.storage.tables.course import Course
from backend.storage.tables.user import User
from backend import db, to_dict
from uuid import uuid4

@api_blueprint.route("/reviews", methods=["POST"])
def reviews():
    """
    Routes that add a review to specified course
    """
    data = request.get_json()
    if not data:
        abort(400, description="Param not a JSON type")

    for param in ["user_id", "course_id", "message"]:
        if param not in data:
            abort(400, description="{} is missing".format(param.title()))

    course_obj = db.get_row(Course, data.get("course_id"))
    user_obj = db.get_row(User, data.get("user_id"))
    if None in [course_obj, user_obj]:
        abort(500, description="Internal error with the database, try again later")
    if len(course_obj) == 0:
        abort(400, description="Provided course id is not associated with any course in the db")
    if len(user_obj) == 0:
        abort(400, description="Provided user id is not associated with any user in the db")

    new_review = Review(
            id=str(uuid4()),
            message=data.get("message"),
            course_id=data.get("course_id"),
            user_id=data.get("user_id"),
            course=course_obj
            )

    db.add(new_review)
    new_review = db.get_row(Review, new_review.id)
    new_review = to_dict(new_review)

    res = jsonify({"review": new_review})
    res.status_code = 200
    return res

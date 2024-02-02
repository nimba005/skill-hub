#!/usr/bin/env python3
"""
Blueprint for the available courses route
"""

from flask import jsonify, abort
from backend.flask_app.blueprints.api.main import api_blueprint
from backend.storage.tables.course import Course
from backend import db, to_dict

@api_blueprint.route("/courses")
def courses():
    """
    Route that returns all courses in database
    """
    c_objects = db.get_table(Course)
    if c_objects is None:
        abort(500, description="The database has encountered an error, please try again")
    if len(c_objects) == 0:
        abort(404, description="No course found")

    courses = []
    for course in c_objects:
        reviews = [to_dict(review) for review in course.reviews]
        videos = [to_dict(video) for video in course.videos]
        course_dict = to_dict(course)
        course_dict["reviews"] = reviews
        course_dict["videos"] = videos
        courses.append(course_dict)

    res = jsonify({"courses": courses})
    res.status_code = 200
    return res

@api_blueprint.route("/courses/<string:arg>")
def course(arg):
    """
    Route that returns a course that matches with the provided id or title
    """

    c_objects = db.get_table(Course)
    if c_objects is None:
        abort(500, description="The database has encountered an error, please try again")

    data = {}
    for course in c_objects:
        reviews = [to_dict(review) for review in course.reviews]
        videos = [to_dict(video) for video in course.videos]
        course_dict = to_dict(course)
        course_dict["reviews"] = reviews
        course_dict["videos"] = videos
        if arg in [course_dict.get("title"), course_dict.get("id")]:
            data = course_dict
            break
    if len(data) == 0:
        abort(404, description="Course not found")

    res = jsonify({"course": data})
    res.status_code = 200
    return res 

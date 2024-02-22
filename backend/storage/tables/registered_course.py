#!/usr/bin/env python3
"""
Registered_course TABLE declaration for our database
"""

from sqlalchemy import Column, ForeignKey, String
from .user import Base
from uuid import uuid4

class Registered(Base):
    """
    Declaration of Registered courses class or table
    """
    __tablename__ = 'registered_courses'
    id = Column(String(100), primary_key=True, default=str(uuid4()), unique=True)
    user_id = Column(String(100), ForeignKey("users.id"), nullable=False)
    course_id = Column(String(100), ForeignKey("courses.id"), nullable=False)
    course_title = Column(String(200), nullable=False)

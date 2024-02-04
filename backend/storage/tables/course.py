#!/usr/bin/env python3
"""
Course TABLE declaration for our database
"""
from sqlalchemy import Boolean, Column, Integer, String
from backend.storage.tables.user import Base
from sqlalchemy.orm import Relationship
from uuid import uuid4

class Course(Base):
    """ 
    Declaration of Course class or table
    """
    __tablename__ = 'courses'
    title = Column(String(100), unique=True, nullable=False)
    id = Column(String(100), primary_key=True, default=str(uuid4()), unique=True)
    image_url = Column(String(600), nullable=False)
    description = Column(String(1000), default="No description set for this course")
    likes = Column(Integer, default=0)
    categories = Column(String(200))
    is_popular = Column(Boolean, default=False)
    #query_link = Column(String(500), nullable=False)

    # Declaring relationships
    videos = Relationship('Video', back_populates="course")
    reviews = Relationship('Review', back_populates="course")

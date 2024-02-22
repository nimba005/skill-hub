#!/usr/bin/env python3

"""
Video TABLE declaration for our database
"""

from sqlalchemy import Column, ForeignKey, String
from .user import Base
from sqlalchemy.orm import Relationship
from uuid import uuid4

class Video(Base):
    """
    Declaration of Video class or table
    """
    __tablename__ = 'videos'
    id = Column(String(100), primary_key=True, default=str(uuid4()), unique=True)
    title = Column(String(200), default="(null)")
    course_id = Column(String(100), ForeignKey("courses.id"), nullable=False)
    embed_link = Column(String(1000), nullable=False)

    # Declaring relationships
    course = Relationship('Course', back_populates="videos")

#!/usr/bin/env python3
"""
Interest TABLE declaration for our database
"""

from sqlalchemy import Column, ForeignKey, Integer, String
from .user import Base
from sqlalchemy.orm import Relationship

class Interest(Base):
    """
    Declaration of Interest class or table
    """
    __tablename__ = 'interests'
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(String(100), ForeignKey("users.id"), nullable=False)
    interest_list = Column(String(200))

    # Declaring relationships
    user = Relationship('User', back_populates="interests")

#!/usr/bin/env python3

"""
User TABLE declaration for our database
"""

from uuid import uuid4
from sqlalchemy import Boolean, Column, String
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import Relationship

Base = declarative_base()

class User(Base):
    """
    Declaration of User class or table
    """
    __tablename__ = 'users'
    name = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    password = Column(String(200), nullable=False)
    id = Column(String(100), primary_key=True, default=str(uuid4()), unique=True)
    is_active = Column(Boolean, default=True)

    # Declaring relationships
    interests = Relationship('Interest', back_populates="user")

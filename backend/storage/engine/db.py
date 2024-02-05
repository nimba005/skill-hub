#!/usr/bin/env python3
"""
The engine for managing ourn database data
"""

from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from backend.storage.tables.user import Base, User
from backend.storage.tables.course import Course
from backend.storage.tables.interest import Interest
from backend.storage.tables.registered_course import Registered
from backend.storage.tables.review import Review
from backend.storage.tables.video import Video
from os import getenv
from dotenv import load_dotenv

class Database:
    """
    A class that defines all the attributes and methods that
    manage the database data
    """

    def __init__(self):
        """
        Initializtions
        """
        self.__session = None
        self.__connected = False

    def connect(self):
        """
        db methods that starts and connects to the database
        """
        try:
            # loadiing DB details from environment data
            load_dotenv()
            user = getenv("DB_USER")
            password = getenv("DB_PASSWORD")
            database = getenv("DB_DATABASE")
            if None in [user, password, database]:
                raise ValueError(
                    "One or more required environment variables are missing"
                )

            # Creating database engine
            db_url = "mysql://{}:{}@localhost/{}".format(
                user,
                password,
                database)
            engine = create_engine(db_url, pool_size=20, max_overflow=10)
        except Exception as err:
            return {
                "connected": False,
                "error": err
            }
        else:
            Base.metadata.create_all(engine)
            Session = sessionmaker(bind=engine)
            session = scoped_session(Session)
            self.__session = session
            self.__connected = True
            return {
                "connected": True,
                "error": None
            }

    def add(self, data):
        """
        db method that adds table data to the db
        """
        if not self.__connected:
            return {
                "db_connection_status": False,
                "data_added": False
            }
        self.__session.add(data)
        self.__session.commit()
        return {
            "db_connection_status": True,
            "data_added": True
        }

    def remove(self, data):
        """
        db method that deletes table data from the db
        """
        if not self.__connected:
            return {
                "db_connection_status": False,
                "data_removed": False
            }
        self.__session.delete(data)
        self.__session.commit()
        return {
            "db_connection_status": True,
            "data_removed": True
        }

    def save(self):
        """
        db method that saves current session state to the db
        """
        if self.__connected:
            self.__session.commit()
            return {
                "saved": True
            }
        else:
            return {
                "saved": False
            }

    def get_table(self, table):
        """
        db method that gets all rows in the provided table from the db
        """
        if self.__connected:
            data = self.__session.query(table).all()
            return data
        else:
            return None

    def get_row(self, table, id):
        """
        db method that gets the row whose column matched the provided
        column data
        """
        if self.__connected:
            datas = self.__session.query(table).all()
            for data in datas:
                if data.id == str(id):
                    return data
            return {}
        else:
            return None

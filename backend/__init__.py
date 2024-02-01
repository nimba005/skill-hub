#!/usr/bin/env python3

from backend.storage.engine.db import Database

db = Database()
db.connect()

def to_dict(obj):
    """
    Takes sn object and convert it into a dict
    """
    if "_sa_instance_state" in dic:
        del dic["_sa_instance_state"]
    return dic

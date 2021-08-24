#!/usr/bin/python3

from sqlalchemy.orm import Session
from ..core import schemas, models


def get_user_interested(db: Session, usr_id: int):
    pass


def create_user(db: Session, user_in: schemas.CreateUserInterested):
    db_user_in = models.UserInterested(**user_in.dict())
    db.add(db_user_in)
    db.commit()
    db.refresh(db_user_in)
    return db_user_in
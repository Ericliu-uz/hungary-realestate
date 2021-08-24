#!/usr/bin/python3
from typing import Optional

from passlib.context import CryptContext
from sqlalchemy.orm import Session
from core import schemas, models

# pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
#
#
# def create_password_hash(password):
#     return pwd_context.hash(password)


def get_user(db: Session, usr_id: int):
    return db.query(models.User).filter(models.User.u_id == usr_id).first()


def get_user_by_username(db: Session, usr_name: str):
    return db.query(models.User).filter(models.User.u_username == usr_name).first()


def create_user(db: Session, user: schemas.CreateUser):
    db_user = models.User(**user.dict())
    db_user.set_hashed_password(user.u_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def update_user(db: Session, user_id: int, u_fullname: Optional[str] = None, u_contact: Optional[int] = None, u_email: Optional[str] = None):
    if u_fullname:
        db.query(models.User).filter(models.User.u_id == user_id).update({models.User.u_fullname: u_fullname})
    if u_contact:
        db.query(models.User).filter(models.User.u_id == user_id).update({models.User.u_contact: u_contact})
    if u_email:
        db.query(models.User).filter(models.User.u_id == user_id).update({models.User.u_email: u_email})
    db.commit()

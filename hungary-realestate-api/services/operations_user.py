#!/usr/bin/python3
from passlib.context import CryptContext
from sqlalchemy.orm import Session
from models import properties_user
from core import schemas

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def create_password_hash(password):
    return pwd_context.hash(password)


def get_user(db: Session, usr_id: int):
    return db.query(properties_user.User).filter(properties_user.User.u_id == usr_id).first()


def get_user_by_username(db: Session, usr_name: str):
    return db.query(properties_user.User).filter(properties_user.User.u_username == usr_name).first()


def create_user(db: Session, user: schemas.CreateUser):
    db_user = properties_user.User(**user.dict())
    db_user.u_hashed_password = create_password_hash(db_user.u_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

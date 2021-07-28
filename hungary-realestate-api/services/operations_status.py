#!/usr/bin/python3

from sqlalchemy.orm import Session
from ..models import properties_status
from ..core import schemas


def get_house_status(db: Session, house_id: int):
    return db.query(properties_status.Status).filter(properties_status.Status.s_hid == house_id).first()


def create_user(db: Session, status: schemas.CreateStatus):
    db_status = properties_status.User(**status.dict())
    db.add(db_status)
    db.commit()
    db.refresh(db_status)
    return db_status
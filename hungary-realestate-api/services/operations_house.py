#!/usr/bin/python3

from sqlalchemy.orm import Session
from ..models import properties_house
from ..core import schemas


def get_houses(db: Session, house_id: int):
    return db.query(properties_house.House).filter(properties_house.House.h_id == house_id).first()


def create_house(db: Session, house: schemas.CreateHouse):
    db_house = properties_house.House(**house.dict())
    db.add(db_house)
    db.commit()
    db.refresh(db_house)
    return db_house





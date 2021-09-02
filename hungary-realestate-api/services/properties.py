#!/usr/bin/python3
from typing import Optional

from sqlalchemy.orm import Session
from core import schemas, models
from sqlalchemy import and_


def create_property(db: Session, house: schemas.CreateProperty):
    db_house = models.Property(**house.dict())
    db.add(db_house)
    db.commit()
    db.refresh(db_house)
    return db_house


def property_is_existed(db: Session, new_property: schemas.CreateProperty):
    if db.query(models.Property).filter(and_(models.Property.h_street == new_property.h_street, models.Property.h_floor == new_property.h_floor, models.Property.h_number == new_property.h_number)).first():
        return True
    else:
        return False


def delete_property(db: Session, house_id: int):
    db.delete(models.Property).filter(models.Property.h_id == house_id).first()
    db.commit()
    db.refresh(models.Property)


def update_property(db: Session, house_id: int, h_type: Optional[int] = None, h_postcode: Optional[int] = None, h_city: Optional[str] = None, h_street: Optional[str] = None, h_number: Optional[int] = None, h_floor: Optional[int] = None, h_rooms: Optional[int] = None, h_rent: Optional[int] = None):
    if h_type:
        db.query(models.Property).filter(models.Property.h_id == house_id).update({models.Property.h_type: h_type})
    if h_postcode:
        db.query(models.Property).filter(models.Property.h_id == house_id).update({models.Property.h_postcode: h_postcode})
    if h_city:
        db.query(models.Property).filter(models.Property.h_id == house_id).update({models.Property.h_city: h_city})
    if h_street:
        db.query(models.Property).filter(models.Property.h_id == house_id).update({models.Property.h_street: h_street})
    if h_number:
        db.query(models.Property).filter(models.Property.h_id == house_id).update({models.Property.h_number: h_number})
    if h_floor:
        db.query(models.Property).filter(models.Property.h_id == house_id).update({models.Property.h_floor: h_floor})
    if h_rooms:
        db.query(models.Property).filter(models.Property.h_id == house_id).update({models.Property.h_rooms: h_rooms})
    if h_rent:
        db.query(models.Property).filter(models.Property.h_id == house_id).update({models.Property.h_rent: h_rent})
    db.commit()


def get_my_properties(db: Session, user_id: int):
    return eval(str(db.query(models.Property).filter(models.Property.user_id == user_id).all()))


def get_properties(db: Session, h_type: Optional[int] = None, h_city: Optional[str] = None, h_street: Optional[str] = None, h_floor: Optional[int] = None, h_rooms: Optional[int] = None, skip: int = 0, limit: int = 10):
    properties_id = []
    if h_type:
        r1 = [x.h_id for x in db.query(models.Property.h_id).filter(models.Property.h_type == h_type)]
        for x in r1:
            properties_id.append(x)

    if h_city:
        r2 = [x.h_id for x in db.query(models.Property.h_id).filter(models.Property.h_city == h_city)]
        if not properties_id:
            properties_id.extend(r2)
        else:
            for x in properties_id:
                if x not in r2:
                    properties_id.remove(x)

    if h_street:
        r3 = [x.h_id for x in db.query(models.Property.h_id).filter(models.Property.h_street == h_street)]
        if not properties_id:
            properties_id.extend(r3)
        else:
            for x in properties_id:
                if x not in r3:
                    properties_id.remove(x)

    if h_floor:
        r4 = [x.h_id for x in db.query(models.Property.h_id).filter(models.Property.h_floor == h_floor)]
        if not properties_id:
            properties_id.extend(r4)
        else:
            for x in properties_id:
                if x not in r4:
                    properties_id.remove(x)

    if h_rooms:
        r5 = [x.h_id for x in db.query(models.Property.h_id).filter(models.Property.h_rooms == h_rooms)]
        if not properties_id:
            properties_id.extend(r5)
        else:
            for x in properties_id:
                if x not in r5:
                    properties_id.remove(x)

    return eval(str(db.query(models.Property).filter(models.Property.h_id.in_(properties_id)).offset(skip).limit(limit).all()))


def get_all_properties(db: Session, h_type: Optional[int] = None, h_city: Optional[str] = None, h_street: Optional[str] = None, h_floor: Optional[int] = None, h_rooms: Optional[int] = None):
    properties_id = []
    if h_type:
        r1 = [x.h_id for x in db.query(models.Property.h_id).filter(models.Property.h_type == h_type)]
        for x in r1:
            properties_id.append(x)

    if h_city:
        r2 = [x.h_id for x in db.query(models.Property.h_id).filter(models.Property.h_city == h_city)]
        if not properties_id:
            properties_id.extend(r2)
        else:
            for x in properties_id:
                if x not in r2:
                    properties_id.remove(x)

    if h_street:
        r3 = [x.h_id for x in db.query(models.Property.h_id).filter(models.Property.h_street == h_street)]
        if not properties_id:
            properties_id.extend(r3)
        else:
            for x in properties_id:
                if x not in r3:
                    properties_id.remove(x)

    if h_floor:
        r4 = [x.h_id for x in db.query(models.Property.h_id).filter(models.Property.h_floor == h_floor)]
        if not properties_id:
            properties_id.extend(r4)
        else:
            for x in properties_id:
                if x not in r4:
                    properties_id.remove(x)

    if h_rooms:
        r5 = [x.h_id for x in db.query(models.Property.h_id).filter(models.Property.h_rooms == h_rooms)]
        if not properties_id:
            properties_id.extend(r5)
        else:
            for x in properties_id:
                if x not in r5:
                    properties_id.remove(x)

    return eval(
        str(db.query(models.Property).filter(models.Property.h_id.in_(properties_id)).all()))



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
    db.delete(models.Property).filter(models.Property.id == house_id).first()
    db.commit()
    db.refresh(models.Property)


def update_property(db: Session, property_id: int, type: Optional[int] = None, postcode: Optional[int] = None, city: Optional[str] = None, street: Optional[str] = None, number: Optional[int] = None, floor: Optional[int] = None, rooms: Optional[int] = None, price: Optional[int] = None):
    if type:
        db.query(models.Property).filter(models.Property.id == property_id).update({models.Property.type: type})
    if postcode:
        db.query(models.Property).filter(models.Property.id == property_id).update({models.Property.h_postcode: postcode})
    if city:
        db.query(models.Property).filter(models.Property.id == property_id).update({models.Property.h_city: city})
    if street:
        db.query(models.Property).filter(models.Property.id == property_id).update({models.Property.h_street: street})
    if number:
        db.query(models.Property).filter(models.Property.id == property_id).update({models.Property.h_number: number})
    if floor:
        db.query(models.Property).filter(models.Property.id == property_id).update({models.Property.h_floor: floor})
    if rooms:
        db.query(models.Property).filter(models.Property.id == property_id).update({models.Property.h_rooms: rooms})
    if price:
        db.query(models.Property).filter(models.Property.id == property_id).update({models.Property.h_rent: price})
    db.commit()


def get_my_properties(db: Session, user_id: int):
    return eval(str(db.query(models.Property).filter(models.Property.user_id == user_id).all()))


def get_properties(db: Session, type: Optional[int] = None, city: Optional[str] = None, street: Optional[str] = None, floor: Optional[int] = None, rooms: Optional[int] = None, skip: int = 0, limit: int = 10):
    properties_id = []

    if type == city == street == floor == rooms is None:
        return eval(str(db.query(models.Property).all()))

    if type:
        r1 = [x.id for x in db.query(models.Property.id).filter(models.Property.type == type)]
        for x in r1:
            properties_id.append(x)

    if city:
        r2 = [x.id for x in db.query(models.Property.id).filter(models.Property.city == city)]
        if not properties_id:
            properties_id.extend(r2)
        else:
            for x in properties_id:
                if x not in r2:
                    properties_id.remove(x)

    if street:
        r3 = [x.id for x in db.query(models.Property.id).filter(models.Property.street == street)]
        if not properties_id:
            properties_id.extend(r3)
        else:
            for x in properties_id:
                if x not in r3:
                    properties_id.remove(x)

    if floor:
        r4 = [x.id for x in db.query(models.Property.id).filter(models.Property.floor == floor)]
        if not properties_id:
            properties_id.extend(r4)
        else:
            for x in properties_id:
                if x not in r4:
                    properties_id.remove(x)

    if rooms:
        r5 = [x.id for x in db.query(models.Property.id).filter(models.Property.rooms == rooms)]
        if not properties_id:
            properties_id.extend(r5)
        else:
            for x in properties_id:
                if x not in r5:
                    properties_id.remove(x)

    return eval(str(db.query(models.Property).filter(models.Property.id.in_(properties_id)).offset(skip).limit(limit).all()))


def get_all_properties(db: Session, type: Optional[int] = None, city: Optional[str] = None, street: Optional[str] = None, floor: Optional[int] = None, rooms: Optional[int] = None):
    properties_id = []
    if type:
        r1 = [x.id for x in db.query(models.Property.id).filter(models.Property.type == type)]
        for x in r1:
            properties_id.append(x)

    if city:
        r2 = [x.id for x in db.query(models.Property.id).filter(models.Property.city == city)]
        if not properties_id:
            properties_id.extend(r2)
        else:
            for x in properties_id:
                if x not in r2:
                    properties_id.remove(x)

    if street:
        r3 = [x.id for x in db.query(models.Property.id).filter(models.Property.street == street)]
        if not properties_id:
            properties_id.extend(r3)
        else:
            for x in properties_id:
                if x not in r3:
                    properties_id.remove(x)

    if floor:
        r4 = [x.id for x in db.query(models.Property.id).filter(models.Property.floor == floor)]
        if not properties_id:
            properties_id.extend(r4)
        else:
            for x in properties_id:
                if x not in r4:
                    properties_id.remove(x)

    if rooms:
        r5 = [x.id for x in db.query(models.Property.id).filter(models.Property.rooms == rooms)]
        if not properties_id:
            properties_id.extend(r5)
        else:
            for x in properties_id:
                if x not in r5:
                    properties_id.remove(x)

    return eval(
        str(db.query(models.Property).filter(models.Property.id.in_(properties_id)).all()))



#!/usr/bin/python3
from typing import Optional
from core import schemas
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from core.db import Base, session, engine
from services import properties
from auth.token_auth import jwt_get_current_user, User, oauth2_schema
from sqlalchemy.orm import Session

app01 = APIRouter()

Base.metadata.create_all(bind=engine)


def get_db():
    db = session
    try:
        yield db
    finally:
        db.close()


class Properties(BaseModel):
    current_page: int
    page_count: int
    page_size: int
    results: list


@app01.post("/properties", response_model=schemas.ReadProperty, dependencies=[Depends(jwt_get_current_user)])
async def create_property(new_property: schemas.CreateProperty, db: Session = Depends(get_db), token: str = Depends(oauth2_schema)):
    if properties.property_is_existed(db=db, new_property=new_property):
        raise HTTPException(status_code=400, detail="Property has been registered")

    item_dict = new_property.dict()
    current_user = (await jwt_get_current_user(token))
    current_uid = current_user.uid
    if new_property.user_id == 0:
        item_dict["user_id"] = current_uid
        new_property_updated = schemas.CreateProperty(**item_dict)

    return properties.create_property(db=db, house=new_property_updated)


@app01.get("/properties", response_model=Properties)
def get_properties(db: Session = Depends(get_db), p_type: Optional[int] = None, p_city: Optional[str] = None, p_street: Optional[str] = None, p_floor: Optional[int] = None, p_bathrooms: Optional[int] = None, p_garage: Optional[int] = None, p_bedrooms: Optional[int] = None, skip: int = 0, limit: int = 30):
    results_all = properties.get_all_properties(db=db, type=p_type, city=p_city, street=p_street, floor=p_floor, bedrooms=p_bedrooms, bathrooms=p_bathrooms, garage=p_garage)
    results = properties.get_properties(db=db, type=p_type, city=p_city, street=p_street, floor=p_floor, bedrooms=p_bedrooms, skip=skip, limit=limit)
    page_size = limit
    page_count = len(results_all)/limit
    if skip <= limit:
        current_page = 1
    else:
        current_page = skip/limit
    return {"current_page": current_page, "page_count": page_count, "page_size": page_size, "results": results}


@app01.get("/properties/me", dependencies=[Depends(jwt_get_current_user)])
async def get_my_properties(token: str = Depends(oauth2_schema), db: Session = Depends(get_db)):
    current_user = (await jwt_get_current_user(token))
    current_uid = current_user.uid
    res = properties.get_my_properties(db=db, user_id=current_uid)
    return res


@app01.put("/properties/{property_id}", dependencies=[Depends(get_my_properties)])
def update_my_properties(db: Session = Depends(get_db), property_id: int = 0, p_type: Optional[int] = None, p_postcode: Optional[int] = None, p_city: Optional[str] = None, p_street: Optional[str] = None, p_number: Optional[int] = None, p_floor: Optional[int] = None, p_rooms: Optional[int] = None, p_price: Optional[int] = None):

    return properties.update_property(db, property_id, p_type, p_postcode, p_city, p_street, p_number, p_floor, p_rooms, p_price)
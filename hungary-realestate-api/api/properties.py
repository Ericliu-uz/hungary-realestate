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


@app01.post("/property", response_model=schemas.ReadProperty, dependencies=[Depends(jwt_get_current_user)])
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
def get_properties(db: Session = Depends(get_db), p_type: Optional[int] = None, p_city: Optional[str] = None, p_street: Optional[str] = None, p_floor: Optional[int] = None, p_rooms: Optional[int] = None, skip: int = 0, limit: int = 30):
    results_all = properties.get_all_properties(db=db, h_type=p_type, h_city=p_city, h_street=p_street, h_floor=p_floor, h_rooms=p_rooms)
    results = properties.get_properties(db=db, h_type=p_type, h_city=p_city, h_street=p_street, h_floor=p_floor, h_rooms=p_rooms, skip=skip, limit=limit)
    page_size = limit
    page_count = len(results_all)/limit
    if skip <= limit:
        current_page = 1
    else:
        current_page = skip/limit
    return {"current_page": current_page, "page_count": page_count, "page_size": page_size, "results": results}


@app01.get("/properties", dependencies=[Depends(jwt_get_current_user)])
async def get_my_properties(token: str = Depends(oauth2_schema), db: Session = Depends(get_db)):
    current_user = (await jwt_get_current_user(token))
    current_uid = current_user.uid
    res = properties.get_my_properties(db=db, user_id=current_uid)
    return res


@app01.put("/properties/{property_id}", dependencies=[Depends(get_my_properties)])
def update_my_properties(db: Session = Depends(get_db), property_id: int = 0, h_type: Optional[int] = None, h_postcode: Optional[int] = None, h_city: Optional[str] = None, h_street: Optional[str] = None, h_number: Optional[int] = None, h_floor: Optional[int] = None, h_rooms: Optional[int] = None, h_rent: Optional[int] = None):

    return properties.update_property(db, property_id, h_type, h_postcode, h_city, h_street, h_number, h_floor, h_rooms, h_rent)
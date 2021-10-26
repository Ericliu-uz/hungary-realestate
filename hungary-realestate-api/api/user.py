#!/usr/bin/python3
from typing import Optional
from core import schemas
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from core.db import Base, session, engine
from services import user
from auth.token_auth import jwt_get_current_user, User, oauth2_schema
from sqlalchemy.orm import Session


app02 = APIRouter()

Base.metadata.create_all(bind=engine)


def get_db():
    db = session
    try:
        yield db
    finally:
        db.close()


@app02.post("/user", response_model=schemas.ReadUser)
def create_user(new_user: schemas.CreateUser, db: Session = Depends(get_db)):
    db_user = user.get_user_by_username(db=db, usr_name=new_user.u_username)
    if db_user:
        raise HTTPException(status_code=400, detail="This username has been registered")
    return user.create_user(db=db, user=new_user)


@app02.put("/user", dependencies=[Depends(jwt_get_current_user)])
async def update_user(token: str = Depends(oauth2_schema), db: Session = Depends(get_db), u_fullname: Optional[str] = None, u_contact: Optional[int] = None, u_email: Optional[str] = None):
    current_user = (await jwt_get_current_user(token))
    user_id = current_user.uid
    return user.update_user(db=db, user_id=user_id, u_fullname=u_fullname, u_contact=u_contact, u_email=u_email)


@app02.get("/user")
async def read_users_me(current_user: User = Depends(jwt_get_current_user)):
    return current_user


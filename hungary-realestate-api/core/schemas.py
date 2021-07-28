#!/usr/bin/python3
from typing import Optional

from pydantic import BaseModel, constr, EmailStr
from datetime import datetime


class CreateUser(BaseModel):
    username: constr(max_length=20)
    fullname: str
    password: constr(min_length=6)
    contact_number: int
    email: EmailStr
    hashed_password: Optional[str] = None


class CreateHouse(BaseModel):
    type: str
    postcode: int
    city: str
    street: str
    house_number: int
    floor: int = 0
    rooms: int = 0


class CreateUserInterested(BaseModel):
    pass


class CreateStatus(BaseModel):
    active: bool
    expired_time: datetime


class ReadUser(CreateUser):
    id: int
    # create_at: datetime
    # update_at: datetime

    class Config:
        orm_mode = True


class ReadHouse(CreateHouse):
    id: int
    # create_at: datetime
    # update_at: datetime

    class Config:
        orm_mode = True


class ReadUserInterested(CreateUserInterested):
    id: int
    # u_id: int
    h_id: int
    # create_at: datetime
    # update_at: datetime

    class Config:
        orm_mode = True


class ReadStatus(CreateStatus):
    id: int
    h_id: int
    # create_at: datetime
    # update_at: datetime

    class Config:
        orm_mode = True




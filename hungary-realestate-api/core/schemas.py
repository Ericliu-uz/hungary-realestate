#!/usr/bin/python3
from typing import Optional

from pydantic import BaseModel, constr, EmailStr
from datetime import datetime


class CreateUser(BaseModel):
    u_username: constr(max_length=20)
    u_fullname: str
    u_password: constr(min_length=6)
    u_contact: int
    u_email: EmailStr
    u_hashed_password: Optional[str] = None


class CreateProperty(BaseModel):
    type: int = 1
    postcode: int
    city: str
    street: str
    number: int
    floor: int
    rooms: int = 1
    price: int
    isDeleted: bool = False
    isActive: bool = True
    user_id: int


class ReadUser(CreateUser):
    u_id: int
    create_at: datetime
    update_at: datetime

    class Config:
        orm_mode = True


class ReadProperty(CreateProperty):
    id: int
    create_at: datetime
    update_at: datetime

    class Config:
        orm_mode = True










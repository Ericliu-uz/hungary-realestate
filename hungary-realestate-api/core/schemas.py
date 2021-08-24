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
    h_type: int = 1
    h_postcode: int
    h_city: str
    h_street: str
    h_number: int
    h_floor: int
    h_rooms: int = 1
    h_rent: int
    isDeleted: bool = False
    isActive: bool = True


class CreateUserInterested(BaseModel):
    pass


class ReadUser(CreateUser):
    u_id: int
    create_at: datetime
    update_at: datetime

    class Config:
        orm_mode = True


class ReadProperty(CreateProperty):
    h_id: int
    create_at: datetime
    update_at: datetime

    class Config:
        orm_mode = True


class ReadUserInterested(CreateUserInterested):
    id: int
    h_id: int

    class Config:
        orm_mode = True







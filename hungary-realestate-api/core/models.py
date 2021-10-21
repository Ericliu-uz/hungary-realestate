#!/usr/bin/python3

from datetime import datetime

from passlib.context import CryptContext
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, String, DateTime, Integer, func, ForeignKey, Boolean
from sqlalchemy.orm import relationship

Base = declarative_base()


class User(Base):
    __tablename__ = "sys_usr"
    u_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    u_fullname = Column(String(30), nullable=False)
    u_username = Column(String(30), nullable=False, unique=True)
    u_password = Column(String(30), nullable=False)
    u_contact = Column(Integer, nullable=False, unique=True, comment="telephone number")
    u_email = Column(String(30), nullable=False, unique=True)
    u_hashed_password = Column(String(45), nullable=True)

    properties = relationship("Property", back_populates="user")

    create_at = Column(DateTime, default=datetime.now, comment="created")
    update_at = Column(DateTime, default=datetime.now, onupdate=func.now(), comment="updated")

    def set_hashed_password(self, password):
        self.u_hashed_password = CryptContext(schemes=["bcrypt"], deprecated="auto").hash(password)

    def __repr__(self):
        return "{" + '"uid":"{}","username":"{}","password":"{}","hashed_password":"{}"'.format(self.u_id, self.u_username, self.u_password, self.u_hashed_password) + "}"


class Property(Base):
    __tablename__ = "properties"
    h_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    h_type = Column(Integer, nullable=False)
    h_postcode = Column(Integer, nullable=False)
    h_city = Column(String(30), comment="city name", nullable=False)
    h_street = Column(String(30), comment="street name", nullable=False)
    h_number = Column(Integer, comment="house number", nullable=False)
    h_floor = Column(Integer, comment="in which floor", nullable=False)
    h_rooms = Column(Integer, comment="how many bedrooms", nullable=False)
    h_rent = Column(Integer, comment="price", nullable=False)
    isDeleted = Column(Boolean, nullable=False)
    isActive = Column(Boolean, nullable=False)

    user_id = Column(Integer, ForeignKey('sys_usr.u_id'))
    user = relationship("User", back_populates="properties")

    create_at = Column(DateTime, default=datetime.now, comment="created")
    update_at = Column(DateTime, default=datetime.now, onupdate=func.now(), comment="updated")

    def __repr__(self):
        return "{" + "'h_id':'{}','h_type':'{}','h_postcode':'{}','h_city':'{}','h_street':'{}','h_number':'{}','h_floor':'{}','h_rooms':'{}','h_rent':'{}','create_at':'{}','update_at':'{}','address':'{}'".format(self.h_id ,self.h_type, self.h_postcode, self.h_city, self.h_street , self.h_number, self.h_floor, self.h_rooms, self.h_rent, self.create_at, self.update_at, str(self.h_number)+' '+self.h_street+', '+self.h_city+' '+str(self.h_postcode)) + "}"



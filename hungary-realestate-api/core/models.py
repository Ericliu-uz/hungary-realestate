#!/usr/bin/python3

from datetime import datetime

from passlib.context import CryptContext
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, String, DateTime, Integer, func, ForeignKey, Boolean, Text
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
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    type = Column(Integer, nullable=False)
    postcode = Column(Integer, nullable=False)
    city = Column(String(30), comment="city name", nullable=False)
    street = Column(String(30), comment="street name", nullable=False)
    number = Column(Integer, comment="house number", nullable=False)
    floor = Column(Integer, comment="in which floor", nullable=False)
    rooms = Column(Integer, comment="how many bedrooms", nullable=False)
    price = Column(Integer, comment="price", nullable=False)
    title = Column(String(45), nullable=False)
    description = Column(Text(2000))
    isDeleted = Column(Boolean, nullable=False)
    isActive = Column(Boolean, nullable=False)

    user_id = Column(Integer, ForeignKey('sys_usr.u_id'))
    user = relationship("User", back_populates="properties")

    create_at = Column(DateTime, default=datetime.now, comment="created")
    update_at = Column(DateTime, default=datetime.now, onupdate=func.now(), comment="updated")

    def __repr__(self):
        return "{" + "'id':'{}','type':'{}','postcode':'{}','city':'{}','street':'{}','number':'{}','floor':'{}','rooms':'{}','price':'{}','create_at':'{}','update_at':'{}','address':'{}','image':{}".format(self.id, self.type, self.postcode, self.city, self.street, self.number, self.floor, self.rooms, self.price, self.create_at, self.update_at, str(self.number) + ' ' + self.street + ', ' + self.city + ' ' + str(self.postcode), []) + "}"



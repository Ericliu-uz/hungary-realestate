#!/usr/bin/python3

from datetime import datetime
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
    user_interested = relationship("UserInterested", back_populates="user")

    # create_at = Column(DateTime, default=datetime.now, comment="created")
    # update_at = Column(DateTime, default=datetime.now, onupdate=func.now(), comment="updated")


class House(Base):
    __tablename__ = "house_info"
    h_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    h_type = Column(String(30), nullable=False)
    h_postcode = Column(Integer, nullable=False)
    h_city = Column(String(30), comment="city name", nullable=False)
    h_street = Column(String(30), comment="street name", nullable=False)
    h_number = Column(Integer, comment="house number", nullable=False)
    h_floor = Column(Integer, comment="in which floor", nullable=False)
    h_rooms = Column(Integer, comment="how many bedrooms", nullable=False)
    user_interested = relationship("UserInterested", back_populates="house")
    status = relationship("Status", back_populates="house")

    # create_at = Column(DateTime, default=datetime.now, comment="created")
    # update_at = Column(DateTime, default=datetime.now, onupdate=func.now(), comment="updated")


class UserInterested(Base):
    __tablename__ = "usr_interested"
    i_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    i_uid = Column(Integer, ForeignKey('sys_usr.u_id'), comment="user info")
    i_hid = Column(Integer, ForeignKey('house_info.h_id'), comment="house info")
    house = relationship("House", back_populates="user_interested")
    user = relationship("User", back_populates="user_interested")

    # create_at = Column(DateTime, default=datetime.now, comment="created")
    # update_at = Column(DateTime, default=datetime.now, onupdate=func.now(), comment="updated")


class Status(Base):
    __tablename__ = "status"
    s_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    s_active = Column(Boolean, nullable=False)
    s_expired_time = Column(DateTime, nullable=False)
    s_hid = Column(Integer, ForeignKey('house_info.h_id'), comment="house info")
    house = relationship("House", back_populates="status")

    # create_at = Column(DateTime, default=datetime.now, comment="created")
    # update_at = Column(DateTime, default=datetime.now, onupdate=func.now(), comment="updated")
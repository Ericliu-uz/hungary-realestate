#!/usr/bin/python3

from datetime import datetime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, String, DateTime, Integer, func
from sqlalchemy.orm import relationship

Base = declarative_base()


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

    create_at = Column(DateTime, default=datetime.now, comment="created")
    update_at = Column(DateTime, default=datetime.now, onupdate=func.now(), comment="updated")




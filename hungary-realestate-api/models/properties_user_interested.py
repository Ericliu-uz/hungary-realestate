#!/usr/bin/python3

from datetime import datetime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, DateTime, Integer, func, ForeignKey
from sqlalchemy.orm import relationship

Base = declarative_base()


class UserInterested(Base):
    __tablename__ = "usr_interested"
    i_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    i_uid = Column(Integer, ForeignKey('sys_usr.id'), comment="user info")
    i_hid = Column(Integer, ForeignKey('house_info.id'), comment="house info")
    house = relationship("House", back_populates="user_interested")
    user = relationship("User", back_populates="user_interested")

    create_at = Column(DateTime, default=datetime.now, comment="created")
    update_at = Column(DateTime, default=datetime.now, onupdate=func.now(), comment="updated")
#!/usr/bin/python3

from datetime import datetime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, DateTime, Integer, func, ForeignKey, Boolean
from sqlalchemy.orm import relationship

Base = declarative_base()


class Status(Base):
    __tablename__ = "status"
    s_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    s_active = Column(Boolean, nullable=False)
    s_expired_time = Column(DateTime, nullable=False)
    s_hid = Column(Integer, ForeignKey('house_info.h_id'), comment="house info")
    house = relationship("House", back_populates="status")

    create_at = Column(DateTime, default=datetime.now, comment="created")
    update_at = Column(DateTime, default=datetime.now, onupdate=func.now(), comment="updated")


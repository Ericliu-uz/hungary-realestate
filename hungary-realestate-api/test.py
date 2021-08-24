# from passlib.context import CryptContext
#
# from core.schemas import *
# from core.db import session
# from core.logger import logger
# import models
# from services.operations_user import get_user_by_username
#
#
# pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
#
#
# def create_password_hash(password):
#     return pwd_context.hash(password)
#
#
# #print(create_password_hash('990929'))
# res = (eval(str(get_user_by_username(session, 'lewis'))))
# res1 = {"lewis": res}
# print(res1)
from typing import Optional

from fastapi import Depends
from sqlalchemy.orm import Session
from core import models
from core.db import Base, session, engine

Base.metadata.create_all(bind=engine)


def get_db():
    db = session
    try:
        yield db
    finally:
        db.close()


# def get_properties(db: Session, h_type: Optional[int] = None, h_city: Optional[str] = None, h_street: Optional[str] = None, h_floor: Optional[int] = None, h_rooms: Optional[int] = None, skip: int = 0, limit: int = 10):
#     properties_id = []
#     if h_type:
#         r1 = [x.h_id for x in db.query(models.Property.h_id).filter(models.Property.h_type == h_type)]
#         for x in r1:
#             properties_id.append(x)
#
#     if h_city:
#         r2 = [x.h_id for x in db.query(models.Property.h_id).filter(models.Property.h_city == h_city)]
#         if not properties_id:
#             properties_id.extend(r2)
#         else:
#             for x in properties_id:
#                 if x not in r2:
#                     properties_id.remove(x)
#
#     # if h_street:
#     #     r3 = db.query(models.Property.h_id).filter(models.Property.h_street == h_street).all()
#     #     l3 = [x for x in r3]
#     #     if properties_id is None:
#     #         properties_id.extend(l3)
#     #     else:
#     #         for x in properties_id:
#     #             if x not in l3:
#     #                 properties_id.remove(x)
#
#     # if h_floor:
#     #     l4 = db.query(models.Property.h_id).filter(models.Property.h_floor == h_floor).all()
#     #     if properties_id is None:
#     #         properties_id.extend(l4)
#     #     else:
#     #         for x in properties_id:
#     #             if x not in l4:
#     #                 properties_id.remove(x)
#     #
#     # if h_rooms:
#     #     l5 = db.query(models.Property.h_id).filter(models.Property.h_rooms == h_rooms).all()
#     #     if properties_id is None:
#     #         properties_id.extend(l5)
#     #     else:
#     #         for x in properties_id:
#     #             if x not in l5:
#     #                 properties_id.remove(x)
#     print(properties_id)
#
#     # print(db.query(models.Property).filter(models.Property.h_id == 4).all())
#
#     print(eval(str((db.query(models.Property).filter(models.Property.h_id.in_(properties_id)).offset(skip).limit(limit).all()))))


# def get_property(db: Session):
#     res = [x.h_id for x in db.query(models.Property.h_id)]
#     for x in res:
#         print(x)

#get_properties(db=session, h_city='Budapest')

#get_property(db=session)

# get_properties_api(db=Depends(get_db), p_type=1)
# get_property(db=Depends(get_db))

# def update_property(db: Session, house_id: int, h_type: Optional[int] = None, h_postcode: Optional[int] = None, h_city: Optional[str] = None, h_street: Optional[str] = None, h_number: Optional[int] = None, h_floor: Optional[int] = None, h_rooms: Optional[int] = None):
#
#     if h_type:
#         db.query(models.Property).filter(models.Property.h_id == house_id).update({models.Property.h_type: h_type})
#     if h_postcode:
#         db.query(models.Property).filter(models.Property.h_postcode == h_postcode).update({models.Property.h_type: h_type})
#     if h_city:
#         db.query(models.Property).filter(models.Property.h_city == h_city).update({models.Property.h_type: h_type})
#     if h_street:
#         db.query(models.Property).filter(models.Property.h_street == h_street).update({models.Property.h_type: h_type})
#     if h_number:
#         db.query(models.Property).filter(models.Property.h_number == h_number).update({models.Property.h_type: h_type})
#     if h_floor:
#         db.query(models.Property).filter(models.Property.h_floor == h_floor).update({models.Property.h_type: h_type})
#     if h_rooms:
#         db.query(models.Property).filter(models.Property.h_rooms == h_rooms).update({models.Property.h_type: h_type})
#     db.commit()


# update_property(db=session, house_id=4, h_type=2)

def get_user_by_username(db: Session, usr_name: str):
    return db.query(models.User).filter(models.User.u_username == usr_name).first()


print(get_user_by_username(db=session, usr_name="ericliu"))
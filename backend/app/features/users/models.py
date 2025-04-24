from sqlalchemy import Column, String, Boolean, Date, Integer, DateTime
from app.core.database import Base
from datetime import datetime  # for datetime.utcnow()


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String, nullable=False)
    second_name = Column(String, nullable=True)
    email = Column(String, unique=True, nullable=False, index=True)
    password = Column(String, nullable=False)
    selfie_verification = Column(String, nullable=True)
    user_name = Column(String, unique=True, nullable=False)
    photo = Column(String, nullable=True)
    birth_date = Column(Date, nullable=True)
    phone = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    # last_scene
    is_deleted = Column(Boolean, default=False)
    is_registered = Column(Boolean, default=False)
    is_verified = Column(Boolean, default=False)

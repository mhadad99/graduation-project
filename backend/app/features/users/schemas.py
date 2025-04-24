from datetime import date, datetime
from typing import Optional
from pydantic import BaseModel, EmailStr
from pydantic.types import conint


class UserCreate(BaseModel):
    first_name: str
    second_name: Optional[str] = None
    email: EmailStr
    password: str
    user_name: str
    phone: Optional[str] = None
    birth_date: Optional[date] = None

    class Config:
        orm_mode = True


class UserOut(BaseModel):
    id: int
    email: EmailStr
    created_at: datetime

    class Config:
        orm_mode = True


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    id: Optional[int] = None

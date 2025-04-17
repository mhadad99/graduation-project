from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import date


class UserCreate(BaseModel):
    first_name: str
    second_name: Optional[str] = None
    email: EmailStr
    password: str
    user_name: str
    phone: Optional[str] = None
    birth_date: Optional[date] = None


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

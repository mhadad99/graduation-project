from sqlalchemy.orm import Session
from app.features.users.models import User
from app.features.users.schemas import UserCreate, UserLogin
from app.core.security import hash_password, verify_password
from fastapi import HTTPException


def register_user(db: Session, user_data: UserCreate):
    if db.query(User).filter(User.email == user_data.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")
    if db.query(User).filter(User.user_name == user_data.user_name).first():
        raise HTTPException(status_code=400, detail="Username already taken")

    new_user = User(
        first_name=user_data.first_name,
        second_name=user_data.second_name,
        email=user_data.email,
        password=hash_password(user_data.password),
        user_name=user_data.user_name,
        phone=user_data.phone,
        birth_date=user_data.birth_date,
        is_registered=True,
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message": "User registered successfully"}


def login_user(db: Session, login_data: UserLogin):
    user = db.query(User).filter(User.email == login_data.email).first()
    if not user or not verify_password(login_data.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    return {"message": f"Welcome back, {user.first_name}!"}

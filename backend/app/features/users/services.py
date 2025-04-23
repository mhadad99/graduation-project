from fastapi import status, HTTPException
from random import randrange
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.common import utils
from app.core import security
from app.features.users import models, schemas

from sqlalchemy.orm import Session
from fastapi import HTTPException, status


def authenticate_user_service(user_credentials: OAuth2PasswordRequestForm, db: Session):
    user = (
        db.query(models.User)
        .filter(models.User.email == user_credentials.username)
        .first()
    )

    if not user or not utils.verify(user_credentials.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Invalid credentials"
        )

    access_token = security.create_access_token(data={"user_id": user.id})
    return schemas.Token(access_token=access_token, token_type="bearer")


def register_user_service(user_data: schemas.UserCreate, db: Session):
    existing_user = (
        db.query(models.User)
        .filter(
            (models.User.email == user_data.email)
            | (models.User.user_name == user_data.user_name)
        )
        .first()
    )
    if existing_user:
        raise HTTPException(status_code=400, detail="Email or Username already exists")

    hashed_password = utils.hash(user_data.password)
    user_data.password = hashed_password

    new_user = models.User(**user_data.dict())
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


def get_user_by_id_service(user_id: int, db: Session):
    user = (
        db.query(models.User)
        .filter(models.User.id == user_id, models.User.is_deleted == False)
        .first()
    )
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"user with id: {user_id} was not found",
        )
    return user


def get_all_users_service(db: Session):
    return db.query(models.User).filter(models.User.is_deleted == False).all()


def update_user_service(user_id: int, update_data: schemas.UserCreate, db: Session):
    user = (
        db.query(models.User)
        .filter(models.User.id == user_id, models.User.is_deleted == False)
        .first()
    )
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    for field, value in update_data.dict(exclude_unset=True).items():
        setattr(user, field, value)

    db.commit()
    db.refresh(user)
    return user


def delete_user_service(user_id: int, db: Session):
    user = (
        db.query(models.User)
        .filter(models.User.id == user_id, models.User.is_deleted == False)
        .first()
    )
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    user.is_deleted = True
    db.commit()
    return {"msg": f"User {user_id} marked as deleted"}

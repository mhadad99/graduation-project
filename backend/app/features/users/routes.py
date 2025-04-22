from typing import List
from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.features.users import schemas
from app.features.users.services import (
    authenticate_user_service,
    delete_user_service,
    get_all_users_service,
    get_user_by_id_service,
    register_user_service,
    update_user_service,
)

from fastapi.security import OAuth2PasswordRequestForm

from app.core import security
from app.features.users import models

router = APIRouter(prefix="/users", tags=["Users"])


@router.post("/login", response_model=schemas.Token)
def login(
    user_credentials: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
):
    return authenticate_user_service(user_credentials, db)


@router.post("", status_code=status.HTTP_201_CREATED, response_model=schemas.UserOut)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    return register_user_service(user, db)


from app.core import security  # make sure you import this if it's in another file


@router.get("/{id}", response_model=schemas.UserOut)
def get_user(
    id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(security.get_current_user),
):
    return get_user_by_id_service(id, db)


@router.get("/{id}", response_model=schemas.UserOut)
def get_user(
    id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(security.get_current_user),
):
    return get_user_by_id_service(id, db)


@router.get("/", response_model=List[schemas.UserOut])
def get_all_users(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(security.get_current_user),
):
    return get_all_users_service(db)


@router.put("/{id}", response_model=schemas.UserOut)
def update_user(
    id: int,
    user_data: schemas.UserCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(security.get_current_user),
):
    return update_user_service(id, user_data, db)


@router.delete("/{id}")
def delete_user(
    id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(security.get_current_user),
):
    return delete_user_service(id, db)

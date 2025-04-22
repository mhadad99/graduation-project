from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.features.users import schemas
from app.core.database import get_db
from app.features.users import services

router = APIRouter()


@router.post("/register")
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    return services.register_user(db, user)


@router.post("/login")
def login(user: schemas.UserLogin, db: Session = Depends(get_db)):
    return services.login_user(db, user)

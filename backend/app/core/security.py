from fastapi import Depends, HTTPException, status
import jwt
from jose import JWTError
from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from fastapi.security import HTTPAuthorizationCredentials, OAuth2PasswordBearer

from app.core import database
from app.features.users import models, schemas
from .config import settings

from fastapi.security import HTTPBearer

oauth2_scheme = HTTPBearer()
SECRET_KEY = settings.secret_key
ALGORITHM = settings.algorithm
ACCESS_TOKEN_EXPIRE_MINUTES = settings.access_token_expire_minutes


def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

    return encoded_jwt


def verify_access_token(token: str, credentials_exception):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=ALGORITHM)
        id: str = payload.get("user_id")

        if id is None:
            raise credentials_exception
        token_data = schemas.TokenData(id=id)  # validate with is can be more things
    except JWTError:
        raise credentials_exception
    return token_data


# take token from request automatically, extract id for us
# its going to verify that the token is correct by calling verify access token
# can be passed to any path we have as a dependency
def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(oauth2_scheme),
    db: Session = Depends(database.get_db),
):
    token = credentials.credentials  # This is the actual token string

    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    token_data = verify_access_token(token, credentials_exception)
    user = db.query(models.User).filter(models.User.id == token_data.id).first()
    return user

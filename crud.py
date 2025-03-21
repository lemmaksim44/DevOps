from sqlalchemy.orm import Session
from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from datetime import datetime, timedelta
import bcrypt
import jwt
from jwt import PyJWTError

from database import get_db
from models import User
from schemas import *


def create_user(user: RegUser, db: Session):
    hash_password = bcrypt.hashpw(user.password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")
    new_user = User (
        username = user.username,
        password = hash_password
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


def get_user(username, db: Session):
    return db.query(User).filter(User.username == username).first()


def auth_user(user: AuthUser, db: Session):
    db_user = get_user(user.username, db)
    if db_user and bcrypt.checkpw(user.password.encode("utf-8"), db_user.password.encode("utf-8")):
        return db_user
    return None


SECRET_KEY = "VetKey"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(status_code=401, detail="Could not validate credentials")

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except PyJWTError:
        raise credentials_exception

    user = get_user(username, db)
    if user is None:
        raise credentials_exception

    return user
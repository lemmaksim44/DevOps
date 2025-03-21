from sqlalchemy.orm import Session
import bcrypt

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


def get_user(user: GetUser, db: Session):
    return db.query(User).filter(User.username == user.username).first()

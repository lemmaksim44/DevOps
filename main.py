from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session

from schemas import RegUser
from database import get_db
from crud import *


app = FastAPI()


@app.get("/")
async def root():
    return {"message": "API for veterinary clinic. Go to /docs or /redoc to find out more"}


@app.post("/register/")
async def register(user: RegUser, db: Session = Depends(get_db)):
    db_user = get_user(user, db)
    if db_user:
        raise HTTPException(status_code=400, detail="User already exists")

    if len(user.password) < 6:
        raise HTTPException(status_code=400, detail="Weak password")

    return create_user(user, db)
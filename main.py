from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from models import AnimalType
from schemas import RegUser
from crud import *


app = FastAPI()


@app.get("/", response_model=Message)
async def root():
    return {"message": "API for veterinary clinic. Go to /docs or /redoc to find out more"}


@app.post("/register/", response_model=RegUser)
async def register(user: RegUser, db: Session = Depends(get_db)):
    db_user = get_user(user.username, db)
    if db_user:
        raise HTTPException(status_code=400, detail="User already exists")

    if len(user.password) < 6:
        raise HTTPException(status_code=400, detail="Weak password")

    return create_user(user, db)


@app.post("/auth/", response_model=TokenResponse)
async def auth(user: AuthUser, db: Session = Depends(get_db)):
    db_user = auth_user(user, db)
    if not db_user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    access_token = create_access_token(data={"sub": db_user.username})
    return {"access_token": access_token, "token_type": "bearer"}


@app.get("/auth/", response_model=GetUser)
async def status_auth(user: GetUser = Depends(get_current_user)):
    """
    Send in headaers:

    headers: {
                'Authorization': 'token_type access_token'
            }

    example:
    
    headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkb2N0b3IyIiwiZXhwIjoxNzQyNTQ5NzY0fQ.kc9p5G31xdzHrWfaMZQxJlT_rGqQx4_7tHlDOU319o1'
            }
    """
    return user


@app.get("/animal_type/", response_model=AnimalResponse)
async def animal_type(db: Session = Depends(get_db)):
    db_animal = db.query(AnimalType).order_by(AnimalType.id).all()
    return db_animal
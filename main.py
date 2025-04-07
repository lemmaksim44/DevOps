from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import desc
from typing import List

from database import get_db
from models import AnimalType, Report
from schemas import *
from crud import *


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


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
    
    Use these headers in the following requests
    """
    return user


@app.get("/animal_type/", response_model=List[AnimalResponse])
async def animal_type(user: GetUser = Depends(get_current_user), db: Session = Depends(get_db)):
    db_animal = db.query(AnimalType).order_by(AnimalType.id).all()
    return db_animal


@app.get("/report/", response_model=List[GetReport])
async def get_report(user: GetUser = Depends(get_current_user), db: Session = Depends(get_db)):
    db_report = db.query(
        Report.id,
        Report.date,
        Report.time,
        Report.owner,
        AnimalType.animal.label("pet"),
        Report.pet_name
        ).join(AnimalType, Report.pet == AnimalType.id).order_by(desc(Report.id)).all()
    return db_report


@app.post("/report/", response_model=CreateReport)
async def post_report(data: CreateReport, user: GetUser = Depends(get_current_user), db: Session = Depends(get_db)):
    return create_report(data, db)


@app.put("/report/", response_model=PutReport)
async def put_report(data: PutReport, user: GetUser = Depends(get_current_user), db: Session = Depends(get_db)):
    return change_report(data, db)


@app.delete("/report/", response_model=Message)
async def delete_report(data: DeleteReport, user: GetUser = Depends(get_current_user), db: Session = Depends(get_db)):
    db_report = db.query(Report).filter(Report.id == data.id).first()
    if not db_report:
        raise HTTPException(status_code=404, detail="Report not found")

    db.delete(db_report)
    db.commit()
    return {"message": "The report was successfully deleted"}
from pydantic import BaseModel
import datetime as dt

class Message(BaseModel):
    message: str

class RegUser(BaseModel):
    username: str
    password: str

class AuthUser(BaseModel):
    username: str
    password: str

class GetUser(BaseModel):
    id: int
    username: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str

class AnimalResponse(BaseModel):
    id: int
    animal: str

class GetReport(BaseModel):
    id: int
    date: dt.date
    time: dt.time
    owner: str
    pet: str
    pet_name: str

class CreateReport(BaseModel):
    date: dt.date
    time: dt.time
    owner: str
    pet: str
    pet_name: str

class PutReport(BaseModel):
    id: int
    date: dt.date
    time: dt.time
    owner: str
    pet: str
    pet_name: str

class DeleteReport(BaseModel):
    id: int
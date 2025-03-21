from pydantic import BaseModel


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
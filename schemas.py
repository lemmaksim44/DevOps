from pydantic import BaseModel


class RegUser(BaseModel):
    username: str
    password: str

class AuthUser(BaseModel):
    username: str
    password: str

class GetUser(BaseModel):
    id: int
    username: str
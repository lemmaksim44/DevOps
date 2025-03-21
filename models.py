from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Date, Time, ForeignKey


Base = declarative_base()

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True, nullable=False)
    username = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)

class AnimalType(Base):
    __tablename__ = "animal_type"

    id = Column(Integer, primary_key=True, index=True, nullable=False)
    animal = Column(String, unique=True, index=True, nullable=False)

class Report(Base):
    __tablename__ = "report"

    id = Column(Integer, primary_key=True, index=True, nullable=False)
    date = Column(Date, index=True, nullable=False)
    time = Column(Time, nullable=False)
    owner = Column(String, index=True, nullable=False)
    pet = Column(Integer, ForeignKey("animal_type.id"), nullable=False)
    pet_name = Column(String, nullable=False)
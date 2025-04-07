import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Base
from pathlib import Path
from models import AnimalType


URL = "sqlite:///./test.db"

engine = create_engine(URL, connect_args={"check_same_thread": False})

session_local = sessionmaker(autocommit=False, autoflush=False, bind=engine)

@pytest.fixture(scope="session")
def setup_test_db():
    Base.metadata.create_all(bind=engine)
    animal_types = [
        AnimalType(animal="Собака"),
        AnimalType(animal="Кошка"),
        AnimalType(animal="Хомяк"),
        AnimalType(animal="Крыса"),
        AnimalType(animal="Морская свинка"),
        AnimalType(animal="Кролик"),
        AnimalType(animal="Попугай"),
        AnimalType(animal="Еж")
    ]
    
    db = session_local()
    db.add_all(animal_types)
    db.commit()
    db.close()

    yield

    Base.metadata.drop_all(bind=engine)
    engine.dispose()
    db_file = Path("test.db")
    if db_file.exists():
        db_file.unlink()

@pytest.fixture(scope="function")
def get_test_db(setup_test_db):
    db = session_local()
    try:
        yield db
    finally:
        db.close()
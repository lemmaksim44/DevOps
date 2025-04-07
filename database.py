from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker


URL = "postgresql+psycopg2://postgres:Postgresql123@localhost:5432/VetAPI"

engine = create_engine(URL)

session_local = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = session_local()
    try:
        yield db
    finally:
        db.close()
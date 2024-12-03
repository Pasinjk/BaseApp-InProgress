import os

from sqlmodel import create_engine,SQLModel,Session
from dotenv import  load_dotenv

load_dotenv()

PG_DB_USER = os.environ.get("PG_DB_USER")
PG_DB_PASS = os.environ.get("PG_DB_PASS")
PG_DB_SERVER_NAME =  os.environ.get("PG_DB_SERVER_NAME")
PG_DB_PORT = os.environ.get("PG_DB_PORT")
PG_DB_NAME = os.environ.get("PG_DB_NAME")

SQLALCHEMY_DATABASE_URL = f"postgresql+asyncpg://{PG_DB_USER}:{PG_DB_PASS}@{PG_DB_SERVER_NAME}:{PG_DB_PORT}/{PG_DB_NAME}"

engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread":False})
SQLModel.metadata.create_all(engine)

def get_db ():
    with Session(engine) as db:
        yield db
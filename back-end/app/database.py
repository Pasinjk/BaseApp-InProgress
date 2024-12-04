import os
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv

load_dotenv()

PG_DB_USER = os.environ.get("PG_DB_USER")
PG_DB_PASS = os.environ.get("PG_DB_PASS")
PG_DB_SERVER_NAME = os.environ.get("PG_DB_SERVER_NAME")
PG_DB_PORT = os.environ.get("PG_DB_PORT")
PG_DB_NAME = os.environ.get("PG_DB_NAME")

SQLALCHEMY_DATABASE_URL = f"postgresql+asyncpg://{PG_DB_USER}:{PG_DB_PASS}@{PG_DB_SERVER_NAME}:{PG_DB_PORT}/{PG_DB_NAME}"

engine = create_async_engine(SQLALCHEMY_DATABASE_URL, future=True, echo=True)
AsyncSessionLocal = sessionmaker(
    bind=engine,
    class_=AsyncSession,
    autoflush=False,
    autocommit=False,
)
Base = declarative_base()


async def get_db():
    async with AsyncSessionLocal() as db:
        try:
            yield db
        finally:
            await db.close()

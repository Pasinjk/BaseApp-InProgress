from sqlalchemy import Column, Integer, String

from app.database import Base


class ItemDB(Base):
    __tablename__ = "items"

    id = Column(Integer, primary_key=True)
    title = Column(String, index=True)
    description = Column(String, index=True)
    price = Column(Integer)

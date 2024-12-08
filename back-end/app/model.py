from sqlalchemy import Column, Integer, String, DateTime, Boolean
from datetime import datetime
from app.database import Base


class UsersDB(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, autoincrement=True)
    email = Column(String(255), nullable=False)
    username = Column(String(255), nullable=False)
    password_hash = Column(String(255), nullable=False)
    first_name = Column(String(255), nullable=False)
    last_name = Column(String(255), nullable=False)
    phone = Column(String(10))
    department = Column(String(255))
    role = Column(String(255))
    is_admin = Column(Boolean, nullable=False, default=False)
    is_active = Column(Boolean, nullable=False, default=True)
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.now)

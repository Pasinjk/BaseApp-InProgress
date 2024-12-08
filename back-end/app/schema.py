from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class UserCreated(BaseModel):
    email: str
    username: str
    password: str
    first_name: str
    last_name: str
    phone: Optional[str] = None
    department: Optional[str] = None
    role: Optional[str] = None


class UserResponse(BaseModel):
    id: int
    email: str
    username: str
    first_name: str
    last_name: str
    phone: Optional[str] = None
    department: Optional[str] = None
    role: Optional[str] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    is_admin: Optional[bool] = None


class UserLogin(BaseModel):
    username: str
    password: str

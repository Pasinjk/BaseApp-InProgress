from pydantic import BaseModel
from typing import Optional


class Department(BaseModel):
    department_name: str
    description: Optional[str] = None


class DepartmentCreated(Department):
    pass


class DepartmentResponse(Department):
    id: int

    class Config:
        from_attributes = True


class UpdateDepart(BaseModel):
    id: int
    department_name: str
    description: Optional[str] = None


class UpdateDepartResponse(UpdateDepart):
    class Config:
        from_attributes = True


class Role(BaseModel):
    role_name: str
    description: Optional[str] = None


class RoleCreated(Role):
    pass


class RolesResponse(Role):
    id: int

    class Config:
        from_attributes = True

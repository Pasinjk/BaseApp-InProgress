from sqlalchemy import select, update
from app.auth import validate_api_key
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.schema import (
    DepartmentCreated,
    DepartmentResponse,
    RoleCreated,
    RolesResponse,
    UpdateDepart,
    UpdateDepartResponse,
)
from app.database import get_db
from app.model import UsersDB, UserProfileDB, DepartmentDB, RoleDB
from typing import Optional

router = APIRouter(dependencies=[Depends(validate_api_key)])


@router.post(
    "/create_department", tags=["Departments"], response_model=DepartmentResponse
)
async def create_department(
    department: DepartmentCreated, db: AsyncSession = Depends(get_db)
):
    db_department = DepartmentDB(**department.model_dump())
    db.add(db_department)
    await db.commit()
    await db.refresh(db_department)
    return db_department


@router.put(
    "/update_department", tags=["Departments"], response_model=UpdateDepartResponse
)
async def update_department(
    DepartName: UpdateDepart,
    db: AsyncSession = Depends(get_db),
):
    await db.execute(
        update(DepartmentDB)
        .where(DepartmentDB.id == DepartName.id)
        .values(
            department_name=DepartName.department_name,
            description=DepartName.description,
        )
    )
    await db.commit()
    return DepartName


@router.post("/create_role", tags=["Roles"], response_model=RolesResponse)
async def create_role(role: RoleCreated, db: AsyncSession = Depends(get_db)):
    db_role = RoleDB(**role.model_dump())
    db.add(db_role)
    await db.commit()
    await db.refresh(db_role)
    return db_role

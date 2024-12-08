from sqlalchemy import select
from app.auth import validate_api_key
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.schema import UserCreated, UserResponse, UserLogin
from app.database import get_db
from app.model import UsersDB
from passlib.hash import pbkdf2_sha512

router = APIRouter(dependencies=[Depends(validate_api_key)])


@router.post("/create_user", tags=["CRUD_User"], response_model=UserResponse)
async def create_user(user: UserCreated, db: AsyncSession = Depends(get_db)):
    existing_user_query = await db.execute(
        select(UsersDB).where(
            (UsersDB.email == user.email) | (UsersDB.username == user.username)
        )
    )
    existing_user = existing_user_query.scalar_one_or_none()

    if existing_user:
        raise HTTPException(status_code=400, detail="Email or username already exists.")

    password_hash = pbkdf2_sha512.hash(user.password)

    db_user = UsersDB(
        email=user.email,
        username=user.username,
        password_hash=password_hash,
        first_name=user.first_name,
        last_name=user.last_name,
        phone=user.phone,
        department=user.department,
        role=user.role,
        is_admin=False,
        is_active=True,
    )
    db.add(db_user)
    await db.commit()
    await db.refresh(db_user)
    return UserResponse(
        id=db_user.id,
        email=db_user.email,
        username=db_user.username,
        first_name=db_user.first_name,
        last_name=db_user.last_name,
        phone=db_user.phone,
        department=db_user.department,
        role=db_user.role,
        created_at=db_user.created_at.isoformat() if db_user.created_at else None,
        updated_at=db_user.updated_at.isoformat() if db_user.updated_at else None,
    )


@router.put("/update_user", tags=["CRUD_User"], response_model=UserResponse)
async def update_user(update_user: UserCreated, db: AsyncSession = Depends(get_db)):
    existing_user_query = await db.execute(
        select(UsersDB).where(UsersDB.email == update_user.email)
    )
    db_user = existing_user_query.scalar_one_or_none()

    if not db_user:
        raise HTTPException(status_code=404, detail="User not found.")

    db_user.username = update_user.username
    db_user.first_name = update_user.first_name
    db_user.last_name = update_user.last_name
    db_user.phone = update_user.phone
    db_user.department = update_user.department
    db_user.role = update_user.role

    if update_user.password:
        db_user.password_hash = pbkdf2_sha512.hash(update_user.password)

    await db.commit()
    await db.refresh(db_user)

    return UserResponse(
        id=db_user.id,
        email=db_user.email,
        username=db_user.username,
        first_name=db_user.first_name,
        last_name=db_user.last_name,
        phone=db_user.phone,
        department=db_user.department,
        role=db_user.role,
        created_at=db_user.created_at.isoformat() if db_user.created_at else None,
        updated_at=db_user.updated_at.isoformat() if db_user.updated_at else None,
    )


@router.delete("/delete_user", tags=["CRUD_User"])
async def delete_user(email_user: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(UsersDB).where(UsersDB.email == email_user))
    user = result.scalar_one_or_none()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    await db.delete(user)
    await db.commit()
    return {"message": "success"}


@router.post("/login", tags=["Authen"], response_model=UserResponse)
async def login(login_user: UserLogin, db: AsyncSession = Depends(get_db)):
    existing_user_query = await db.execute(
        select(UsersDB).where((UsersDB.username == login_user.username))
    )
    existing_user = existing_user_query.scalar_one_or_none()
    result = pbkdf2_sha512.verify(login_user.password, existing_user.password_hash)
    if not result:
        raise HTTPException(
            status_code=401,
            detail="Invalid password",
        )

    return UserResponse(
        id=existing_user.id,
        email=existing_user.email,
        username=existing_user.username,
        first_name=existing_user.first_name,
        last_name=existing_user.last_name,
        phone=existing_user.phone,
        department=existing_user.department,
        role=existing_user.role,
        is_admin=existing_user.is_admin,
    )

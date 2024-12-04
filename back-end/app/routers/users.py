from app.auth import validate_api_key
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.schema import ItemResponse, ItemCreated, Item
from app.database import get_db
from app.model import ItemDB

router = APIRouter(dependencies=[Depends(validate_api_key)])


@router.post("/items", response_model=ItemResponse)
async def create_item(item: Item, db: AsyncSession = Depends(get_db)):
    db_items = ItemDB(**item.model_dump())
    db.add(db_items)
    await db.commit()
    await db.refresh(db_items)
    return db_items

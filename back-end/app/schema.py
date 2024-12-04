from pydantic import BaseModel


class Item(BaseModel):
    title: str
    price: float


class ItemCreated(Item):
    pass


class ItemResponse(Item):
    id: int

    class Config:
        from_attributes = True

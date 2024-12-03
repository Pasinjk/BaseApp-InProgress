from app.auth import validate_api_key
from fastapi import APIRouter, Depends

router = APIRouter(dependencies=[Depends(validate_api_key)])


@router.get("/hello")
async def hello():
    return {"hello": "hello"}

from fastapi import APIRouter, HTTPException, Request
from typing import Optional
from pydantic import BaseModel
from service.profile_service import myProfileGet, myProfileEdit, AllProfileGet
router = APIRouter(prefix="/profile", tags=["profile"])

class profileEditReq(BaseModel):
    user_name: Optional[str] = None
    avatar_url: Optional[str] = None
    gender: Optional[str] = None
    age: Optional[int] = None
    comment: Optional[str] = None
    hobby: Optional[str] = None

@router.get("/me")
def profile(request: Request):
    token = request.session.get("access_token")
    if not token:
        raise HTTPException(status_code=400, detail="ログインtokenがありません")
    id = request.session.get("user_id")
    res = myProfileGet(id)
    if not res:
        raise HTTPException(status_code=400, detail="プロフィール取得失敗")
    return res

@router.patch("/me")
def profileEdit(request: Request, body: profileEditReq ):
    
    token = request.session.get("access_token")
    if not token:
        raise HTTPException(status_code=400, detail="ログインtokenがありません")
    
    id = request.session.get("user_id")

    data = {k: v for k, v in body.model_dump().items() if v is not None}
    if not data:
        raise HTTPException(status_code=400, detail="更新する箇所がありません")

    res = myProfileEdit( id, data )

    if not res:
        raise HTTPException(status_code=400, detail="プロフィール変更失敗")
    return res

@router.get("/")
def allProfileGet(request: Request):
    myId =  request.session.get("user_id")
    res = AllProfileGet( myId )
    if res is None:   # None = 例外やDBエラー
        raise HTTPException(status_code=400, detail="全ユーザープロフィール取得失敗")
    return res
from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel
router = APIRouter(prefix="/profile", tags=["profile"])

class profileEditReq(BaseModel):
    user_name: str
    avatar_url: str
    gender: str
    age: int
    comment: str
    hobby: str 

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
    res = myProfileEdit( id, body.user_name,  body.avatar_url, body.gender, body.age, body.comment, body.hobby )
    if not res:
        raise HTTPException(status_code=400, detail="プロフィール変更失敗")
    return res
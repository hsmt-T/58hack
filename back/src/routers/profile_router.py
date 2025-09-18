from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel
from ..supabase.auth import login, sign
router = APIRouter(prefix="/profile", tags=["profile"])


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
def profileEdit(request: Request ):
    
    token = request.session.get("access_token")
    if not token:
        raise HTTPException(status_code=400, detail="ログインtokenがありません")
    id = request.session.get("user_id")
    res = myProfileEdit(id, req: user_name, req: avatar_url)
    if not res:
        raise HTTPException(status_code=400, detail="プロフィール変更失敗")
    return res
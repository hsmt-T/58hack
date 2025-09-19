from fastapi import APIRouter, HTTPException 
from pydantic import BaseModel
from supabase_service.auth import login, sign
router = APIRouter(prefix="/auth", tags=["auth"])

class Login_Sign_Request(BaseModel):
    email: str
    password: str

@router.post("/sign")
def sign_endpoint(req: Login_Sign_Request):
    res = sign(req.email, req.password)
    if not res:
        raise HTTPException(status_code=400, detail="サインアップ失敗")
    return res

@router.post("/login")
def login_endpoint(req: Login_Sign_Request):
    res = login(req.email, req.password)
    if not res:
        raise HTTPException(status_code=401, detail="ログイン失敗")
    return res
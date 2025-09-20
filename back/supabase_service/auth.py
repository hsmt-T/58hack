from .client import supabase
from fastapi import Request
from fastapi.responses import JSONResponse

def sign (email: str, password: str):
    try:
        res = supabase.auth.sign_up({
            "email": email,
            "password": password
        })
        return res.model_dump()
    except Exception as e:
        import traceback
        print("SignUp error", e)
        traceback.print_exc()
        return None

def login (email: str, password: str, request: Request):
    try:
        res = supabase.auth.sign_in_with_password({
            "email": email,
            "password": password
        })
        if not res.user:
            return None
        request.session["access_token"] = res.session.access_token
        request.session["refresh_token"] = res.session.refresh_token
        request.session["user_id"] = res.user.id

        return JSONResponse(
            content={
                "message": "ログイン成功",
                "user": {
                    "id": res.user.id,
                    "email": res.user.email
                }
            }
        )  
    except Exception as e:
        import traceback
        print("Login error", e)
        traceback.print_exc()
        return JSONResponse(
            content={"message": "ログイン失敗"},
            status_code=400
        )

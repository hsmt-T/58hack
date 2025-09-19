from fastapi import FastAPI
from routers import auth_router, profile_router
from starlette.middleware.sessions import SessionMiddleware
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React の URL
    allow_credentials=True,                   # Cookie を許可
    allow_methods=["*"],
    allow_headers=["*"],
)
app.add_middleware(
    SessionMiddleware,
    secret_key="super-secret-key",  # 環境変数にするのが理想
    session_cookie="session",       # Cookie の名前
    same_site="lax",                # セキュリティ制御
    https_only=False                # 本番は True 推奨
)

# authルート
app.include_router(auth_router.router)
# profileルート
app.include_router(profile_router.router)

@app.get("/")
async def root():
    return {"message": "Hello World"}
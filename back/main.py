from fastapi import FastAPI
from routers import auth_router, profile_router, chat_router
from match import match
from starlette.middleware.sessions import SessionMiddleware
from core.config import secret_key
from fastapi.middleware.cors import CORSMiddleware
from routers import rewrite

app = FastAPI()

origins = [
    "http://localhost:5173",
    "https://58hack-585858.vercel.app"  # 開発環境# 本番 (Vercelにデプロイする場合)
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,                   # Cookie を許可
    allow_methods=["*"],
    allow_headers=["*"],
)
app.add_middleware(
    SessionMiddleware,
    secret_key=secret_key,  # 環境変数にするのが理想
    session_cookie="session",       # Cookie の名前
    same_site="none",   # クロスサイトでも Cookie を送る
    https_only=True
)

# authルート
app.include_router(auth_router.router)
# profileルート
app.include_router(profile_router.router)
# websocketルート
app.include_router(chat_router.router)
# matchルート
app.include_router(match.router)
# rewriteルート
app.include_router(rewrite.router)

@app.get("/")
async def root():
    return {"message": "Hello World"}


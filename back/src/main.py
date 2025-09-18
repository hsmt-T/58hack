from fastapi import FastAPI
from .routers import auth_router

app = FastAPI()

# authルート
app.include_router(auth_router.router)

@app.get("/")
async def root():
    return {"message": "Hello World"}
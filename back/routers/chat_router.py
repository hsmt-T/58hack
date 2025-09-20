from fastapi import APIRouter,  WebSocket,Request, WebSocketDisconnect
from pydantic import BaseModel
from service.chat_service import  websocket_broadcast,myRooms
from supabase_service.client import connections
from core.session import decode_session_cookie
router = APIRouter(prefix="/chat", tags=["chat"])

class ChatBody(BaseModel):
    user_id: str
    matching_id: str
    content: str

@router.get("/room")
def detMychatroom(request: Request):
    user_id = request.session.get("user_id")
    res = myRooms(user_id)
    return res

@router.post("/")
async def sendChat(body: ChatBody):

    await websocket_broadcast(body.matching_id, body.user_id, body.content)
    return {"status": "ok"}

@router.websocket("/{matching_id}")
async def websocket_endpoint(websocket: WebSocket, matching_id: str,):
    await websocket.accept()

    session_cookie = websocket.cookies.get("session")
    if not session_cookie:
        await websocket.close(code=4401)
        return

    session_data = decode_session_cookie(session_cookie)
    if not session_data or "user_id" not in session_data:
        await websocket.close(code=4401)
        return

    # user_id = session_data["user_id"]


    if matching_id not in connections:
        connections[matching_id] = []
    connections[matching_id].append({"user_id": user_id,"websocket": websocket})
    
    try:
        while True:
            data = await websocket.receive_text()
            # 必要に応じて受信したメッセージを処理
            await websocket_broadcast(matching_id, user_id, data)
    except WebSocketDisconnect:
        # 切断された WebSocket を削除
        connections[matching_id] = [
            c for c in connections[matching_id] if c["websocket"] != websocket
        ]
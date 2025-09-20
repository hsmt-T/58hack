from supabase_service.client import supabase
from supabase_service.client import connections
    
async def websocket_broadcast(matching_id, user_id, text):
    await supabase.table("messages").insert({
        "matching_id": matching_id,
        "sender_id": user_id,
        "content": text
    }).execute()

    if matching_id not in connections:
        return
    for c in connections[matching_id]:
        try:
            if c["user_id"] == user_id:  # 自分はスキップ
                continue
            await c["websocket"].send_json({
                "sender_id": user_id,
                "content": text
            })
        except:
            connections[matching_id].remove(c)
    



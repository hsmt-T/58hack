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
    

def myRooms(user_id):
    res = supabase.table("matchings").select("*").or_(
        f"user_A.eq.{user_id},user_B.eq.{user_id}"
    ).execute()

    rooms = []
    for m in res.data:
        partner_id = m["user_A"] if m["user_B"] == user_id else m["user_A"]

        # 相手のプロフィール取得
        profile_res = supabase.table("profiles").select("id, user_name, avatar_url").eq("id", partner_id).execute()
        partner = profile_res.data[0] if profile_res.data else None

        rooms.append({
            "id": m["id"],
            "partner": partner
        })

    return rooms

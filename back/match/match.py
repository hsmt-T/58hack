from fastapi import APIRouter, HTTPException, Request, Depends
from pydantic import BaseModel, field_validator
from supabase_service.client import supabase
from datetime import timedelta, datetime, timezone
from dotenv import load_dotenv
import os

router = APIRouter(prefix="/matching", tags=["matching"])

load_dotenv()



#CHAT_BASE_URL = os.getenv("CHAT_BASE_URL", "http://localhost:3000/chat")




supabase


if not SUPABASE_URL or not SUPABASE_ANON_KEY:
    raise ValueError("SUPABASE_URL OR SUPABASE_ANON_KEY が未設定です。")

if not sb:
    raise ValueError("Supabase クライアントの作成に失敗しました。")

#ユーザー取得
def get_current_user_id(request: Request):
    uid = request.session.get("user_id")
    if not uid:
        raise HTTPException(401,"ログインが必要です")
    return uid

def now_iso():
    return datetime.now(timezone.utc).isoformat()


class LikeIn(BaseModel):
    to_user_id: str
    action: str = "like"
    @field_validator("action")
    @classmethod
    def _ok(cls, v: str):
        v = v.lower()
        if v not in {"like", "dislike"}:
            raise ValueError("action must be 'like' or 'dislike'")
        return v

@router.post("/like")
def like_user(body:LikeIn, me: str = Depends(get_current_user_id)):
    if me == body.to_user_id:
        raise HTTPException(400, "自分自身には操作できません")

    sb.table("likes").upsert(
        {"user": me, "like": body.to_user_id, "create_at": now_iso()},
        on_conflict="user,like",
    ).execute()
    if body.action != "like":
        return {"mutual": False, "message": "dislike recorded"}





    since = (datetime.now(timezone.utc) - timedelta(days=14)).isoformat()
    opp = (
        sb.table("likes")
        .select("id, create_at")
        .eq("user", body.to_user_id)
        .eq("like", me)
        .gt("create_at", since)
        .execute()
    )
    if not opp.data:
        return {"mutual": False, "message": "not mutual yet"}


    u1, u2 = sorted([me, body.to_user_id])
    existing = sb.table("matchings").select("id").eq("user_A", u1).eq("user_B", u2).execute()
    if existing.data:
        matching_id = existing.data[0]["id"]
    else:
        created = sb.table("matchings").insert({"user_A": u1, "user_B": u2}).execute()
        matching_id = created.data[0]["id"]


    sb.table("likes").delete().eq("user", me).eq("like", body.to_user_id).execute()
    sb.table("likes").delete().eq("user", body.to_user_id).eq("like", me).execute()

    return {"mutual": True, "matching_id": matching_id, "message": "matched"}

# ============ Like管理 ============

@router.get("/likes/sent")
def list_likes_sent(me: str = Depends(get_current_user_id)):
    res = sb.table("likes").select("id, like, create_at").eq("user", me).order("create_at", desc=True).execute()
    return {"sent": res.data}

@router.get("/likes/received")
def list_likes_received(me: str = Depends(get_current_user_id)):
    res = sb.table("likes").select("id, user, create_at").eq("like", me).order("create_at", desc=True).execute()
    return {"received": res.data}

@router.get("/likes/pending")
def list_pending(me: str = Depends(get_current_user_id)):
    # 1) 自分→相手（全）
    sent = sb.table("likes").select("like").eq("user", me).execute()
    sent_ids = {row["like"] for row in (sent.data or [])}

    if not sent_ids:
        return {"pending": []}


    recv = (
        sb.table("likes").select("user")
        .in_("user", list(sent_ids))
        .eq("like", me)
        .execute()
    )
    reciprocals = {row["user"] for row in (recv.data or [])}
    pending = list(sent_ids - reciprocals)
    return {"pending": pending}

@router.delete("/like")
def undo_like(to_user_id: str, me: str = Depends(get_current_user_id)):
    sb.table("likes").delete().eq("user", me).eq("like", to_user_id).execute()
    return {"ok": True}

# ============ 自分のマッチ一覧（管理） ============

@router.get("/matches")
def list_matches(me: str = Depends(get_current_user_id)):
    res = sb.table("matchings").select("id, user_A, user_B").or_(f"user_A.eq.{me},user_B.eq.{me}").execute()
    return {"matches": res.data}
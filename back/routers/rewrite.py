from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from google import genai
import os
from dotenv import load_dotenv

# 環境変数読み込み
load_dotenv()

router = APIRouter(prefix="/ai", tags=["ai"])

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise RuntimeError("GEMINI_API_KEY が未設定です")

# Gemini クライアント作成
client = genai.Client(api_key=GEMINI_API_KEY)

class RewriteIn(BaseModel):
    message: str

@router.post("/rewrite")
def rewrite(payload: RewriteIn):
    try:
        prompt = (
            "以下の文章を、相手を傷つけないように柔らかく丁寧な表現に書き直してください。そして文章が短すぎたら少し長い文章を作ってあげて\n"
            "注意点: 文章を説明したり助言したりせず、単純に言葉を優しく置き換えるだけにしてください。あとは自然な流れで会話してるようにしてね\n\n"
            f"{payload.message}"
        )

        resp = client.models.generate_content(
            model="gemini-1.5-flash",
            contents=prompt,
        )

        fixed = resp.text.strip() if hasattr(resp, "text") else ""
        return {"fixed_message": fixed}

    except Exception as e:
        raise HTTPException(500, f"Gemini API エラー: {e}")
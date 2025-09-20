from itsdangerous import URLSafeSerializer
from core.config import secret_key

def decode_session_cookie(cookie_value: str):
    s = URLSafeSerializer(secret_key, salt="starlette.session")
    try:
        session_data = s.loads(cookie_value)
        return session_data  
    except Exception as e:
        print("decode_session_cookie error:", e)
        return None

from ..supabase_service.client import supabase

def myProfileGet ( id: str ):
    try:
        res = supabase.table("profile").select("*").eq("id", id).execute()
        return res.data[0] if res.data else None
    except Exception as e:
        import traceback
        print("myProfile Get error", e)
        traceback.print_exc()
        return None

def myProfileEdit ( id: str, data: dict ):

    try:
        res = supabase.table("profile").update(data).eq("id", id).execute()
        return res.data[0] if res.data else None
    except Exception as e:
        import traceback
        print("myProfile Edit error", e)
        traceback.print_exc()
        return None
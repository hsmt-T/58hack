from supabase_service.client import supabase

def myProfileGet ( id: str ):
    try:
        res = supabase.table("profiles").select("*").eq("id", id).execute()
        return res.data[0] if res.data else None
    except Exception as e:
        import traceback
        print("myProfile Get error", e)
        traceback.print_exc()
        return None

def myProfileEdit ( id: str, data: dict ):

    try:
        res = supabase.table("profiles").update(data).eq("id", id).execute()
        return res.data[0] if res.data else None
    except Exception as e:
        import traceback
        print("myProfile Edit error", e)
        traceback.print_exc()
        return None
    
def AllProfileGet(myId: str):
    try:
        query = supabase.table("profiles").select("*")
        if myId is not None:
            query = query.neq("id", myId)
        res = query.execute()
        return res.data if res.data is not None else []
    except Exception as e:
        print("ALLProfile Edit error", e)
        return []
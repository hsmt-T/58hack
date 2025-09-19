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
    
def AllProfileGet (myId: str):
    try:
        res = supabase.table("profiles").select("*") .neq("id", myId).execute()
        return res.data if res.data else []  
    except Exception as e:
        import traceback
        print("ALLProfile Edit error", e)
        traceback.print_exc()
        return []
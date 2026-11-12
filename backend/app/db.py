from functools import lru_cache
from app.config import settings

@lru_cache
def get_supabase():
    """One Supabase client for the API. Uses the service-role key, so it stays on the server only."""
    from supabase import create_client   # imported lazily so tests run without credentials
    if not settings.supabase_url or not settings.supabase_service_role_key:
        raise RuntimeError("Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in backend/.env")
    return create_client(settings.supabase_url, settings.supabase_service_role_key)

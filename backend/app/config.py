from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    supabase_url: str = ""
    supabase_service_role_key: str = ""
    frontend_origin: str = "http://localhost:5173"
    smtp_from: str = "noreply@justgifting.app"
    admin_key: str = "justgifting-admin-2024"
    model_config = SettingsConfigDict(env_file=".env")

settings = Settings()

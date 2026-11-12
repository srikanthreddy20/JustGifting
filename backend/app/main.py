from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.routers import health, pages, donations, admin

app = FastAPI(title="JustGifting API", version="0.2.0")
app.add_middleware(CORSMiddleware, allow_origins=[settings.frontend_origin],
                   allow_methods=["*"], allow_headers=["*"])
app.include_router(health.router)
app.include_router(pages.router)
app.include_router(donations.router)
app.include_router(admin.router)

"""Request models with validation. Recipient details stay minimal (privacy first)."""
from typing import Literal, Optional
from pydantic import BaseModel, Field

class PageCreate(BaseModel):
    nickname: str = Field(min_length=1, max_length=60)
    age_range: str = ""
    occasion: str = ""
    interests: list[str] = []
    budget_inr: Optional[int] = Field(default=None, ge=0)
    event_date: Optional[str] = Field(default=None, pattern=r"^\d{4}-\d{2}-\d{2}$")   # YYYY-MM-DD
    description: str = Field(default="", max_length=300)

class WishlistItemCreate(BaseModel):
    title: str
    description: str = ""
    price: int
    shop_name: str = ""
    priority: Literal["High Priority", "Nice to Have"] = "Nice to Have"
    image_url: Optional[str] = None

class DonationRequest(BaseModel):
    donor_name: str
    donor_email: str
    gift_id: str
    amount: int
    message: Optional[str] = None

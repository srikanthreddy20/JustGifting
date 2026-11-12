"""All Supabase access lives here so routes stay simple and can be tested with a fake repo."""
import re
from typing import Optional
from app.db import get_supabase

# 'notes' is private, so it is never selected for public responses.
GIFT_COLS = "id,title,description,target_price_inr,category,priority,shop_name,image_url,status"

class SupabaseRepo:
    def __init__(self):
        self.db = get_supabase()

    def get_page(self, slug: str) -> Optional[dict]:
        r = self.db.table("gift_pages").select("*").eq("slug", slug).limit(1).execute()
        return r.data[0] if r.data else None

    def list_gifts(self, page_id: str) -> list[dict]:
        return self.db.table("gifts").select(GIFT_COLS).eq("page_id", page_id).order("priority").execute().data

    def create_page(self, data: dict) -> dict:
        base = re.sub(r"[^a-z0-9]+", "-", f"{data['nickname']}-{data['occasion']}".lower()).strip("-") or "page"
        slug, n = base, 2
        while self.get_page(slug):
            slug, n = f"{base}-{n}", n + 1
        return self.db.table("gift_pages").insert({**data, "slug": slug, "published": False}).execute().data[0]

    # ── Wishlist ──────────────────────────────────────────────────────────────

    def list_wishlist(self, page_id: str) -> list[dict]:
        return self.db.table("wishlist_items").select("*").eq("page_id", page_id).execute().data

    def add_wishlist_item(self, page_id: str, data: dict) -> dict:
        return self.db.table("wishlist_items").insert({**data, "page_id": page_id}).execute().data[0]

    def delete_wishlist_item(self, item_id: str) -> None:
        self.db.table("wishlist_items").delete().eq("id", item_id).execute()

    # ── Admin ─────────────────────────────────────────────────────────────────

    def list_all_pages(self) -> list[dict]:
        return self.db.table("gift_pages").select("*").execute().data

    def delete_page(self, slug: str) -> None:
        self.db.table("gift_pages").delete().eq("slug", slug).execute()

    def update_page(self, slug: str, data: dict) -> Optional[dict]:
        r = self.db.table("gift_pages").update(data).eq("slug", slug).execute()
        return r.data[0] if r.data else None

    def get_stats(self) -> dict:
        pages = self.db.table("gift_pages").select("id,published").execute().data
        total_pages = len(pages)
        published_pages = sum(1 for p in pages if p.get("published"))
        total_gifts = len(self.db.table("wishlist_items").select("id").execute().data)
        return {
            "total_pages": total_pages,
            "published_pages": published_pages,
            "total_gifts": total_gifts,
        }

def get_repo() -> SupabaseRepo:
    return SupabaseRepo()

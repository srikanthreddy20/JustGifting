from fastapi import APIRouter, Depends, HTTPException
from app.repo import get_repo
from app.schemas import PageCreate, WishlistItemCreate

router = APIRouter(prefix="/pages", tags=["pages"])
PUBLIC = ("slug", "nickname", "age_range", "occasion", "interests", "event_date", "description")

@router.post("", status_code=201)
def create_page(body: PageCreate, repo=Depends(get_repo)):
    """Create a gift page. Owner login is added in Week 3."""
    return {"slug": repo.create_page(body.model_dump())["slug"]}

@router.get("/{slug}")
def get_page(slug: str, repo=Depends(get_repo)):
    page = repo.get_page(slug)
    if not page:
        raise HTTPException(404, "Gift page not found")
    return {**{k: page.get(k) for k in PUBLIC}, "gifts": repo.list_gifts(page["id"])}

# ── Wishlist endpoints ────────────────────────────────────────────────────────

@router.get("/{slug}/wishlist", tags=["wishlist"])
def list_wishlist(slug: str, repo=Depends(get_repo)):
    """List all wishlist items for a gift page."""
    page = repo.get_page(slug)
    if not page:
        raise HTTPException(404, "Gift page not found")
    return repo.list_wishlist(page["id"])

@router.post("/{slug}/wishlist", status_code=201, tags=["wishlist"])
def add_wishlist_item(slug: str, body: WishlistItemCreate, repo=Depends(get_repo)):
    """Add a gift to the wishlist for a gift page."""
    page = repo.get_page(slug)
    if not page:
        raise HTTPException(404, "Gift page not found")
    return repo.add_wishlist_item(page["id"], body.model_dump())

@router.delete("/{slug}/wishlist/{gift_id}", status_code=204, tags=["wishlist"])
def delete_wishlist_item(slug: str, gift_id: str, repo=Depends(get_repo)):
    """Delete a wishlist item by id."""
    page = repo.get_page(slug)
    if not page:
        raise HTTPException(404, "Gift page not found")
    repo.delete_wishlist_item(gift_id)

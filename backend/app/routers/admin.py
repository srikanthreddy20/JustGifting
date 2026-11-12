"""Admin router — protected by X-Admin-Key header."""
from fastapi import APIRouter, Depends, Header, HTTPException
from app.repo import get_repo
from app.config import settings

router = APIRouter(prefix="/admin", tags=["admin"])


def require_admin(x_admin_key: str = Header(default="")):
    """Dependency that validates the admin key header."""
    if x_admin_key != settings.admin_key:
        raise HTTPException(status_code=401, detail="Invalid or missing X-Admin-Key")


@router.get("/pages", dependencies=[Depends(require_admin)])
def list_pages(repo=Depends(get_repo)):
    """List all gift pages (all columns)."""
    return repo.list_all_pages()


@router.delete("/pages/{slug}", status_code=204, dependencies=[Depends(require_admin)])
def delete_page(slug: str, repo=Depends(get_repo)):
    """Delete a gift page by slug."""
    repo.delete_page(slug)


@router.patch("/pages/{slug}", dependencies=[Depends(require_admin)])
def update_page(slug: str, body: dict, repo=Depends(get_repo)):
    """
    Partially update a gift page.
    Pass any subset of fields, e.g. `{"published": true}`.
    """
    updated = repo.update_page(slug, body)
    if updated is None:
        raise HTTPException(404, "Gift page not found")
    return updated


@router.get("/stats", dependencies=[Depends(require_admin)])
def get_stats(repo=Depends(get_repo)):
    """Return platform-wide stats: total pages, published pages, total gifts."""
    return repo.get_stats()

import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.repo import get_repo

class FakeRepo:
    """In-memory stand-in for SupabaseRepo so tests need no Supabase account."""
    def __init__(self):
        self.pages = {"mayas-30th": {"id": "p1", "slug": "mayas-30th", "nickname": "Maya", "age_range": "25-34",
                      "occasion": "30th Birthday", "interests": ["coffee"], "event_date": None, "description": "", "owner_id": "secret"}}
    def get_page(self, slug): return self.pages.get(slug)
    def list_gifts(self, page_id): return [{"id": 1, "title": "Coffee set", "target_price_inr": 4500, "priority": 1}]
    def create_page(self, data):
        slug = data["nickname"].lower(); self.pages[slug] = {"id": slug, "slug": slug, **data}; return self.pages[slug]

@pytest.fixture
def c():
    repo = FakeRepo(); app.dependency_overrides[get_repo] = lambda: repo
    yield TestClient(app); app.dependency_overrides.clear()

def test_get_page_returns_gifts_and_hides_internal_fields(c):
    r = c.get("/pages/mayas-30th").json()
    assert r["nickname"] == "Maya" and r["gifts"][0]["title"] == "Coffee set" and "owner_id" not in r

def test_unknown_page_is_404(c):
    assert c.get("/pages/nope").status_code == 404

def test_create_page(c):
    r = c.post("/pages", json={"nickname": "Sam", "occasion": "Birthday", "budget_inr": 5000})
    assert r.status_code == 201 and r.json()["slug"] == "sam"

@pytest.mark.parametrize("body", [{"nickname": ""}, {"nickname": "A", "budget_inr": -5},
                                  {"nickname": "A", "event_date": "tomorrow"}, {"nickname": "A", "description": "x" * 301}])
def test_create_page_validation(c, body):
    assert c.post("/pages", json=body).status_code == 422

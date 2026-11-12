# Database setup (Supabase)
1. Create a project at supabase.com.
2. SQL editor: run `schema.sql`, then `seed.sql`.
3. Project Settings > API: copy the project URL and the service_role key into `backend/.env` (see `backend/.env.example`). The service_role key is server-only: never commit it or use it in the frontend.
4. Start the API and open http://localhost:8000/pages/mayas-30th to see the seeded page.

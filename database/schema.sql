-- JustGifting database: Week 2 (Supabase / PostgreSQL)
-- Run this in the Supabase SQL editor, then seed.sql.
-- Page owners are linked to Supabase Auth in Week 3; views and access rules come later.

create table gift_pages (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid,                              -- linked to auth.users in Week 3
  slug text unique not null,
  nickname text not null,                     -- display name or nickname (privacy first)
  age_range text,
  occasion text,
  interests text[] default '{}',
  budget_inr int check (budget_inr >= 0),
  event_date date,
  description text check (char_length(description) <= 300),
  published boolean default false,
  created_at timestamptz default now()
);

create table gifts (
  id serial primary key,
  page_id uuid not null references gift_pages(id) on delete cascade,
  title text not null,
  description text,
  target_price_inr int not null check (target_price_inr > 0),
  category text,
  priority int not null,
  shop_name text,
  notes text,                                 -- private, never returned by the public API
  image_url text,
  status text default 'available' check (status in ('available','reserved','purchased'))
);

-- Pledges are simulated: no real money moves.
create table pledges (
  id serial primary key,
  gift_id int not null references gifts(id) on delete cascade,
  contributor_name text not null,
  amount_inr int not null check (amount_inr > 0),
  message text,
  created_at timestamptz default now()
);

create index on gifts (page_id, priority);
create index on pledges (gift_id);

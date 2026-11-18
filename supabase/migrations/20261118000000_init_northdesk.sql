-- Northdesk initial schema (matches the approved ERD, with staff_name)
-- Run this once in the Supabase SQL editor, or apply it as a migration.
-- Per the KangaLife brief, row-level security is not required for this project.

-- 1. Categories (fixed lookup list)
create table public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique
    check (char_length(btrim(name)) between 2 and 40),
  created_at timestamptz not null default now()
);

-- 2. Tickets
create table public.tickets (
  id uuid primary key default gen_random_uuid(),
  title text not null
    check (char_length(btrim(title)) between 3 and 100),
  description text not null
    check (char_length(btrim(description)) between 10 and 1000),
  staff_name text not null
    check (char_length(btrim(staff_name)) between 2 and 80),
  category_id uuid not null references public.categories (id),
  priority text not null default 'Medium'
    check (priority in ('Low', 'Medium', 'High', 'Urgent')),
  status text not null default 'Open'
    check (status in ('Open', 'In Progress', 'Resolved', 'Closed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index tickets_category_id_idx on public.tickets (category_id);

-- 3. Keep updated_at current on every edit
create function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger tickets_set_updated_at
before update on public.tickets
for each row
execute function public.set_updated_at();

-- 4. Seed the fixed category list
insert into public.categories (name) values
  ('Hardware'),
  ('Software'),
  ('Network'),
  ('Account'),
  ('Other');

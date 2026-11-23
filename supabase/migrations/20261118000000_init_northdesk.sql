-- Northdesk schema (matches the approved ERD, with staff_name)
-- Run this once in the Supabase SQL editor, or apply it as a migration.
-- Everything lives in its own "northdesk" schema so it stays separate from other tables.
-- Per the KangaLife brief, row-level security is not required for this project.
--
-- After running this, expose the schema to the Data API:
-- Supabase dashboard > Project Settings > Data API > Exposed schemas > add "northdesk".

create schema if not exists northdesk;

-- 1. Categories (fixed lookup list)
create table northdesk.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique
    check (char_length(btrim(name)) between 2 and 40),
  created_at timestamptz not null default now()
);

-- 2. Tickets
create table northdesk.tickets (
  id uuid primary key default gen_random_uuid(),
  title text not null
    check (char_length(btrim(title)) between 3 and 100),
  description text not null
    check (char_length(btrim(description)) between 10 and 1000),
  staff_name text not null
    check (char_length(btrim(staff_name)) between 2 and 80),
  category_id uuid not null references northdesk.categories (id),
  priority text not null default 'Medium'
    check (priority in ('Low', 'Medium', 'High', 'Urgent')),
  status text not null default 'Open'
    check (status in ('Open', 'In Progress', 'Resolved', 'Closed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index tickets_category_id_idx on northdesk.tickets (category_id);

-- 3. Keep updated_at current on every edit
create function northdesk.set_updated_at()
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
before update on northdesk.tickets
for each row
execute function northdesk.set_updated_at();

-- 4. Let the Data API roles use the schema
grant usage on schema northdesk to anon, authenticated, service_role;
grant all on all tables in schema northdesk to anon, authenticated, service_role;
grant all on all sequences in schema northdesk to anon, authenticated, service_role;
grant execute on all functions in schema northdesk to anon, authenticated, service_role;

alter default privileges in schema northdesk
  grant all on tables to anon, authenticated, service_role;
alter default privileges in schema northdesk
  grant all on sequences to anon, authenticated, service_role;
alter default privileges in schema northdesk
  grant execute on functions to anon, authenticated, service_role;

-- 5. Seed the fixed category list
insert into northdesk.categories (name) values
  ('Hardware'),
  ('Software'),
  ('Network'),
  ('Account'),
  ('Other');

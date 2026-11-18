# Northdesk

Support ticket tracker for Northside Training Centre, built for ICTPRG535 Assessment Task 2.

> This README is a skeleton. Sections marked TODO must be completed before submission (task 4.3).

## Project Overview

Northdesk replaces Northside Training Centre's IT support spreadsheet with a shared web page where staff create, view, edit and delete support tickets. It runs on the centre's local network, so there is no sign-in.

TODO: list the key features once they are built (create, list, detail, edit, delete, filters, toasts, responsive layout).

## Tech Stack

- Next.js (App Router) with React and TypeScript
- shadcn/ui and Tailwind CSS
- Supabase (PostgreSQL) with supabase-js
- React Hook Form with Zod
- Lucide React icons
- GitHub for source control, Vercel for hosting

## Prerequisites

- Node.js 22 or newer and npm
- A free Supabase account and project
- Git

TODO: confirm versions you actually used.

## Installation

```bash
git clone https://github.com/lukeo100/northdesk.git
cd northdesk
npm install
```

TODO: add the shadcn/ui setup commands you ran, and any extra libraries you installed.

## Environment Variables

Copy the example file and fill in your own values:

```bash
cp .env.example .env.local
```

| Variable | Where to find it |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase dashboard, Project Settings, API |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Supabase dashboard, Project Settings, API keys (publishable key) |

Never commit `.env.local`. Only use the publishable (public) key in the browser.

## Database Setup

1. Create a new Supabase project.
2. Open the SQL editor and run `supabase/migrations/20261118000000_init_northdesk.sql`.
3. Check that the `categories` and `tickets` tables exist and that the five categories were added.

The migration creates both tables, the CHECK rules for required fields, lengths and allowed status and priority values, an `updated_at` trigger, and the seed categories. See `docs/diagrams/erd.png` for the schema.

## Running Locally

```bash
npm run dev
```

Open http://localhost:3000.

## Building the Application

```bash
npm run build
npm start
```

## Deployment

TODO: describe the Vercel setup (import the GitHub repo, add the two environment variables in project settings, deploy).

## Troubleshooting

TODO: add the real problems you hit. Likely candidates:

- Missing Supabase environment variables error on start: check `.env.local` exists and the dev server was restarted after editing it.
- Empty ticket list or category dropdown: confirm the migration ran and the seed categories exist.
- Insert fails with a constraint error: the value broke a database rule (length or allowed status/priority).

## Project Documentation

- `docs/diagrams`: user flows and ERD (Mermaid source and PNG)
- `docs/wireframes`: wireframe notes
- `docs/BUILD-GUIDE.md`: suggested build order

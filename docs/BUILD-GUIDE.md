# Northdesk build guide

Suggested order for the build day. Tick things off as you go and commit after each step.

## 0. Before you start

1. Supabase project set up with the Northdesk tables in their own `northdesk` schema (from `supabase/migrations/20261118000000_init_northdesk.sql`), and `northdesk` added under Project Settings, Data API, Exposed schemas.
2. `.env.local` created from `.env.example` with your project URL and publishable key.
3. `npm install` then `npm run dev` runs without errors.

## 1. Add shadcn/ui

Run these on your own machine (they download from the shadcn registry):

```bash
npx shadcn@latest init
npx shadcn@latest add button input textarea select label dialog alert-dialog sonner badge table card skeleton form
```

If `form` is not offered in your version, check the shadcn docs for the current form components and use those with React Hook Form.

Add the `<Toaster />` from sonner to `src/app/layout.tsx` so toasts show on every page.

## 2. Build order

1. Data layer: implement the functions in `src/lib/tickets.ts` (start with `getTickets` and `getCategories`).
2. Ticket list page (`src/app/page.tsx`): table, empty state, error state.
3. Create form: Zod schema in `src/lib/validation.ts`, then `src/app/tickets/new/page.tsx`.
4. Ticket detail page.
5. Edit form (reuse the create form as a shared component).
6. Delete with the confirmation dialog.
7. Toasts for success and error on create, edit and delete.
8. Filters and title search on the list.
9. Responsive layout (check the mobile wireframe).

## 3. Rules to remember

- Validation limits in `src/lib/validation.ts` must match the CHECK constraints in the migration.
- Status is not on the create form, new tickets start as Open.
- Commit often with meaningful messages, for example `feat: add ticket list page`.
- Note any change from the approved plan and reconfirm it with Lewis.

## 4. Deploy to Vercel

1. Import the GitHub repo in Vercel.
2. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` in the project settings.
3. Deploy, then run through your test cases on the live URL.

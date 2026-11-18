import Link from "next/link";

// Ticket list page (wireframe 1, and 6 for mobile).
// TODO: load tickets with getTickets() from "@/lib/tickets" and show them in a table.
// TODO: add the search box and the status, priority and category filters.
// TODO: add View, Edit and Delete actions on each row (Delete opens a confirmation dialog).
// TODO: loading, empty and error states from the "view" user flow.
export default function TicketListPage() {
  return (
    <main className="mx-auto w-full max-w-6xl p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Tickets</h1>
        <Link href="/tickets/new" className="underline">
          New ticket
        </Link>
      </div>
      <p className="mt-4 text-sm text-gray-600">
        TODO: build the ticket list here. See docs/wireframes and docs/diagrams.
      </p>
    </main>
  );
}

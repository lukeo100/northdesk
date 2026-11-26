import { TicketList } from "@/components/ticket-list";

// Ticket list page (wireframe 1, and 6 for mobile).
// The data fetching and filters live in <TicketList /> (a client component).
export default function TicketListPage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 p-4 sm:p-8">
      <div>
        <h1 className="text-2xl font-bold">Tickets</h1>
        <p className="text-sm text-muted-foreground">
          Search, filter and manage support tickets.
        </p>
      </div>
      <TicketList />
    </main>
  );
}

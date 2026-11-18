import Link from "next/link";

// Ticket detail page (wireframe 2).
// TODO: load the ticket with getTicket(id) and show every field plus created/updated times.
// TODO: add Edit and Delete buttons (Delete opens the confirmation dialog, wireframe 5).
// TODO: handle a ticket that does not exist.
export default async function TicketDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <main className="mx-auto w-full max-w-6xl p-8">
      <Link href="/" className="text-sm underline">
        Back to tickets
      </Link>
      <h1 className="mt-4 text-2xl font-bold">Ticket {id}</h1>
      <p className="mt-4 text-sm text-gray-600">TODO: build the detail view here.</p>
    </main>
  );
}

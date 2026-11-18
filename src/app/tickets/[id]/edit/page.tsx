import Link from "next/link";

// Edit ticket page (wireframe 4).
// TODO: load the ticket with getTicket(id) and pre-fill the form (same form as create, plus Status).
// TODO: on save call updateTicket(), show a success toast, then go back to the detail page.
// TIP: build the form as one shared component and reuse it for create and edit.
export default async function EditTicketPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <main className="mx-auto w-full max-w-3xl p-8">
      <Link href={`/tickets/${id}`} className="text-sm underline">
        Back to ticket
      </Link>
      <h1 className="mt-4 text-2xl font-bold">Edit ticket</h1>
      <p className="mt-4 text-sm text-gray-600">TODO: build the edit form here.</p>
    </main>
  );
}

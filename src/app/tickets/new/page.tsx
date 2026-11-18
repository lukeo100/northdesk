import Link from "next/link";

// Create ticket page (wireframe 3).
// TODO: build the form with React Hook Form + the Zod schema in "@/lib/validation".
// TODO: load categories with getCategories() for the category dropdown.
// TODO: on submit call createTicket(), show a success toast, then go back to the list.
// TODO: on error show an error toast and keep what the user typed.
// Note: status is not on this form, new tickets start as Open.
export default function NewTicketPage() {
  return (
    <main className="mx-auto w-full max-w-3xl p-8">
      <Link href="/" className="text-sm underline">
        Back to tickets
      </Link>
      <h1 className="mt-4 text-2xl font-bold">New ticket</h1>
      <p className="mt-4 text-sm text-gray-600">TODO: build the create form here.</p>
    </main>
  );
}

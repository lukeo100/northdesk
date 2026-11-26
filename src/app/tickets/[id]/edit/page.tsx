import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { TicketForm } from "@/components/ticket-form";

// Edit ticket page (wireframe 4).
// The form reads the ticket id from the URL itself, loads the ticket and shows the Status field.
export default function EditTicketPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-6 p-4 sm:p-8">
      <h1 className="text-2xl font-bold">Edit ticket</h1>
      <Suspense fallback={<Skeleton className="h-96 w-full" />}>
        <TicketForm mode="edit" />
      </Suspense>
    </main>
  );
}

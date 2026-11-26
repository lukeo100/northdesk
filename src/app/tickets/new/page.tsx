import Link from "next/link";
import { RiArrowLeftLine } from "@remixicon/react";
import { TicketForm } from "@/components/ticket-form";

// Create ticket page (wireframe 3).
// Note: status is not on this form, new tickets start as Open.
export default function NewTicketPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-6 p-4 sm:p-8">
      <Link href="/" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <RiArrowLeftLine className="size-4" aria-hidden="true" />
        Back to tickets
      </Link>
      <h1 className="text-2xl font-bold">New ticket</h1>
      <TicketForm mode="create" />
    </main>
  );
}

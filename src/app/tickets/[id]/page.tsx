import { Suspense } from "react";
import Link from "next/link";
import { RiArrowLeftLine } from "@remixicon/react";
import { Skeleton } from "@/components/ui/skeleton";
import { TicketDetail } from "@/components/ticket-detail";

// Ticket detail page (wireframe 2).
// The page does not read params itself. <TicketDetail /> reads the id from the URL in the browser,
// and Suspense lets the page shell show straight away.
export default function TicketDetailPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-6 p-4 sm:p-8">
      <Link href="/" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <RiArrowLeftLine className="size-4" aria-hidden="true" />
        Back to tickets
      </Link>
      <Suspense fallback={<Skeleton className="h-64 w-full" />}>
        <TicketDetail />
      </Suspense>
    </main>
  );
}

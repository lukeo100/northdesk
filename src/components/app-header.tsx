import Link from "next/link";
import { RiAddLine, RiTicket2Line } from "@remixicon/react";
import { Button } from "@/components/ui/button";

// Site header shown on every page (see the wireframes).
export function AppHeader() {
  return (
    <header className="border-b bg-background">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-8">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
          <RiTicket2Line className="size-6" aria-hidden="true" />
          Northdesk
        </Link>
        <Button render={<Link href="/tickets/new" />} nativeButton={false}>
          <RiAddLine data-icon="inline-start" />
          New ticket
        </Button>
      </div>
    </header>
  );
}

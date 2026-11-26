import Link from "next/link";
import { RiEyeLine, RiPencilLine, RiInboxLine } from "@remixicon/react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DeleteTicketDialog } from "@/components/delete-ticket-dialog";
import { PriorityBadge, StatusBadge } from "@/components/ticket-badges";
import { formatDate } from "@/lib/format";
import type { TicketWithCategory } from "@/types/ticket";

// Ticket table (wireframe 1). Pure presentation: it only renders the tickets it is given.
export function TicketTable({
  tickets,
  onDeleted,
}: {
  tickets: TicketWithCategory[];
  onDeleted: (id: string) => void;
}) {
  if (tickets.length === 0) {
    return <TicketEmptyState />;
  }

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="hidden md:table-cell">Staff</TableHead>
            <TableHead className="hidden lg:table-cell">Created</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tickets.map((ticket) => (
            <TableRow key={ticket.id}>
              <TableCell className="max-w-64 truncate font-medium">{ticket.title}</TableCell>
              <TableCell>{ticket.categories?.name ?? "Uncategorised"}</TableCell>
              <TableCell>
                <PriorityBadge priority={ticket.priority} />
              </TableCell>
              <TableCell>
                <StatusBadge status={ticket.status} />
              </TableCell>
              <TableCell className="hidden md:table-cell">{ticket.staff_name}</TableCell>
              <TableCell className="hidden lg:table-cell">{formatDate(ticket.created_at)}</TableCell>
              <TableCell>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    render={<Link href={`/tickets/${ticket.id}`} />}
                    nativeButton={false}
                  >
                    <RiEyeLine data-icon="inline-start" />
                    View
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    render={<Link href={`/tickets/${ticket.id}/edit`} />}
                    nativeButton={false}
                  >
                    <RiPencilLine data-icon="inline-start" />
                    Edit
                  </Button>
                  <DeleteTicketDialog ticket={ticket} onDeleted={() => onDeleted(ticket.id)} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

// Shown when there are no tickets, or no tickets match the filters.
export function TicketEmptyState() {
  return (
    <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed p-12 text-center">
      <RiInboxLine className="size-8 text-muted-foreground" aria-hidden="true" />
      <h2 className="text-lg font-medium">No tickets found</h2>
      <p className="text-sm text-muted-foreground">
        Try changing your search or filters, or create a new ticket.
      </p>
      <Button render={<Link href="/tickets/new" />} nativeButton={false}>
        New ticket
      </Button>
    </div>
  );
}

// Loading state: rows of skeletons while tickets are fetched.
export function TicketTableSkeleton() {
  return (
    <div className="flex flex-col gap-2" aria-busy="true" aria-label="Loading tickets">
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} className="h-12 w-full" />
      ))}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { RiPencilLine } from "@remixicon/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { DeleteTicketDialog } from "@/components/delete-ticket-dialog";
import { PriorityBadge, StatusBadge } from "@/components/ticket-badges";
import { formatDate } from "@/lib/format";
import { getTicket } from "@/lib/tickets";
import type { TicketWithCategory } from "@/types/ticket";

// Loads one ticket in the browser and shows every field (wireframe 2).
export function TicketDetail() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [ticket, setTicket] = useState<TicketWithCategory | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false; // ignore the result if the page was left before it arrived
    getTicket(id)
      .then((data) => {
        if (!cancelled) setTicket(data);
      })
      // getTicket uses .single(), so a missing id ends up here too.
      .catch(() => {
        if (!cancelled) setError("This ticket could not be found.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col gap-4" aria-busy="true" aria-label="Loading ticket">
        <Skeleton className="h-8 w-2/3" />
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-40 w-full" />
      </div>
    );
  }

  if (error || !ticket) {
    return (
      <div className="flex flex-col items-start gap-3 rounded-lg border border-dashed p-8">
        <h1 className="text-lg font-medium">Ticket not found</h1>
        <p className="text-sm text-muted-foreground">{error}</p>
        <Button variant="outline" render={<Link href="/" />} nativeButton={false}>
          Back to tickets
        </Button>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">{ticket.title}</CardTitle>
        <CardDescription>Raised by {ticket.staff_name}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <div className="flex flex-wrap gap-2">
          <StatusBadge status={ticket.status} />
          <PriorityBadge priority={ticket.priority} />
        </div>

        <dl className="grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-sm text-muted-foreground">Category</dt>
            <dd>{ticket.categories?.name ?? "Uncategorised"}</dd>
          </div>
          <div>
            <dt className="text-sm text-muted-foreground">Staff name</dt>
            <dd>{ticket.staff_name}</dd>
          </div>
          <div>
            <dt className="text-sm text-muted-foreground">Created</dt>
            <dd>{formatDate(ticket.created_at)}</dd>
          </div>
          <div>
            <dt className="text-sm text-muted-foreground">Last updated</dt>
            <dd>{formatDate(ticket.updated_at)}</dd>
          </div>
        </dl>

        <div>
          <h2 className="text-sm text-muted-foreground">Description</h2>
          <p className="mt-1 whitespace-pre-wrap">{ticket.description}</p>
        </div>

        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            render={<Link href={`/tickets/${ticket.id}/edit`} />}
            nativeButton={false}
          >
            <RiPencilLine data-icon="inline-start" />
            Edit
          </Button>
          {/* After a delete from here, the ticket no longer exists, so go back to the list. */}
          <DeleteTicketDialog ticket={ticket} onDeleted={() => router.push("/")} />
        </div>
      </CardContent>
    </Card>
  );
}

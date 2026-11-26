"use client";

import { RiDeleteBinLine } from "@remixicon/react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deleteTicket } from "@/lib/tickets";
import type { Ticket } from "@/types/ticket";

// Delete confirmation (wireframe 5). Used on the list rows and the detail page.
// The parent decides what happens after a successful delete (remove the row, or go back to the list).
export function DeleteTicketDialog({
  ticket,
  onDeleted,
}: {
  ticket: Pick<Ticket, "id" | "title">;
  onDeleted: () => void;
}) {
  async function handleDelete() {
    try {
      await deleteTicket(ticket.id);
      toast.success("Ticket deleted");
      onDeleted();
    } catch (e) {
      // The ticket stays in place if the delete failed.
      toast.error(e instanceof Error ? e.message : "Could not delete the ticket");
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger render={<Button variant="destructive" size="sm" />}>
        <RiDeleteBinLine data-icon="inline-start" />
        Delete
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this ticket?</AlertDialogTitle>
          <AlertDialogDescription>
            &quot;{ticket.title}&quot; will be permanently removed. This cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive" onClick={handleDelete}>
            Delete ticket
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

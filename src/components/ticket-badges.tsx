import { Badge } from "@/components/ui/badge";
import type { Priority, Status } from "@/types/ticket";

// The label is always shown as text, so meaning never depends on colour alone.
const statusVariant: Record<Status, "default" | "secondary" | "outline" | "ghost"> = {
  Open: "outline",
  "In Progress": "secondary",
  Resolved: "default",
  Closed: "ghost",
};

const priorityVariant: Record<Priority, "default" | "secondary" | "outline" | "destructive"> = {
  Low: "outline",
  Medium: "secondary",
  High: "default",
  Urgent: "destructive",
};

export function StatusBadge({ status }: { status: Status }) {
  return <Badge variant={statusVariant[status]}>{status}</Badge>;
}

export function PriorityBadge({ priority }: { priority: Priority }) {
  return <Badge variant={priorityVariant[priority]}>{priority}</Badge>;
}

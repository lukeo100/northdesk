import { z } from "zod";
import { PRIORITIES, STATUSES } from "@/types/ticket";

// These limits must match the CHECK constraints in the database migration.
export const LIMITS = {
  title: { min: 3, max: 100 },
  description: { min: 10, max: 1000 },
  staffName: { min: 2, max: 80 },
} as const;

// TODO: build the Zod schema for the create/edit form.
// - title, description and staff_name: required, trimmed, within LIMITS
// - category_id: required (a uuid from the categories table)
// - priority: one of PRIORITIES
// - status: one of STATUSES
// Give each rule a clear error message, because these show inline under the fields.
export const ticketSchema = z.object({
  // TODO
});

// Hook this up with React Hook Form via zodResolver(ticketSchema).
export type TicketFormValues = z.infer<typeof ticketSchema>;

// Keep these referenced so the imports are used until the schema is written.
export const ALLOWED = { PRIORITIES, STATUSES };

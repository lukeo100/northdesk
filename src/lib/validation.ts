import { z } from "zod";
import { PRIORITIES, STATUSES } from "@/types/ticket";

// These limits must match the CHECK constraints in the database migration.
export const LIMITS = {
  title: { min: 3, max: 100 },
  description: { min: 10, max: 1000 },
  staffName: { min: 2, max: 80 },
} as const;

// Validation rules for the create and edit forms. Each message shows inline under its field.
// .trim() runs first, so "   " counts as empty and the length rules apply to the cleaned text.
export const ticketSchema = z.object({
  title: z
    .string()
    .trim()
    .min(LIMITS.title.min, `Title must be at least ${LIMITS.title.min} characters`)
    .max(LIMITS.title.max, `Title must be ${LIMITS.title.max} characters or fewer`),

  description: z
    .string()
    .trim()
    .min(LIMITS.description.min, `Description must be at least ${LIMITS.description.min} characters`)
    .max(LIMITS.description.max, `Description must be ${LIMITS.description.max} characters or fewer`),

  staff_name: z
    .string()
    .trim()
    .min(LIMITS.staffName.min, `Staff name must be at least ${LIMITS.staffName.min} characters`)
    .max(LIMITS.staffName.max, `Staff name must be ${LIMITS.staffName.max} characters or fewer`),

  // The dropdown starts empty (""), so min(1) is what triggers "Select a category".
  category_id: z.string().min(1, "Select a category"),

  priority: z.enum(PRIORITIES, { error: "Select a priority" }),

  // Not on the create form: the form's defaultValues set it to "Open".
  status: z.enum(STATUSES, { error: "Select a status" }),
});

// Hook this up with React Hook Form via zodResolver(ticketSchema).
// z.infer builds the TypeScript type from the schema, so the two can never drift apart.
export type TicketFormValues = z.infer<typeof ticketSchema>;

// Shared types for Northdesk. These mirror the database tables in
// supabase/migrations/20261118000000_init_northdesk.sql

export const STATUSES = ["Open", "In Progress", "Resolved", "Closed"] as const;
export const PRIORITIES = ["Low", "Medium", "High", "Urgent"] as const;

export type Status = (typeof STATUSES)[number];
export type Priority = (typeof PRIORITIES)[number];

export interface Category {
  id: string;
  name: string;
  created_at: string;
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  staff_name: string;
  category_id: string;
  priority: Priority;
  status: Status;
  created_at: string;
  updated_at: string;
}

// A ticket joined with its category name (for the list and detail pages)
export type TicketWithCategory = Ticket & {
  categories: Pick<Category, "name"> | null;
};

// The fields a staff member fills in on the create and edit forms
export type TicketInput = Pick<
  Ticket,
  "title" | "description" | "staff_name" | "category_id" | "priority" | "status"
>;

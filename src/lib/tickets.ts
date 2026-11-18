import { supabase } from "@/lib/supabase";
import type {
  Category,
  Ticket,
  TicketInput,
  TicketWithCategory,
} from "@/types/ticket";

// Data access for Northdesk. Each function talks to Supabase and either
// returns data or throws an Error that the page can show in a toast.
// Docs: https://supabase.com/docs/reference/javascript/select

// Keep the client import referenced until the functions are written.
void supabase;

export interface TicketFilters {
  search?: string;
  status?: string;
  priority?: string;
  categoryId?: string;
}

// READ: all tickets, newest first, joined with the category name.
// Hint: select("*, categories(name)") and apply the filters you need.
export async function getTickets(
  filters: TicketFilters = {}
): Promise<TicketWithCategory[]> {
  void filters;
  throw new Error("TODO: implement getTickets");
}

// READ: one ticket by id, with its category name.
export async function getTicket(id: string): Promise<TicketWithCategory> {
  void id;
  throw new Error("TODO: implement getTicket");
}

// READ: the category list for the dropdowns and filter.
export async function getCategories(): Promise<Category[]> {
  throw new Error("TODO: implement getCategories");
}

// CREATE: insert a ticket and return the saved row.
export async function createTicket(input: TicketInput): Promise<Ticket> {
  void input;
  throw new Error("TODO: implement createTicket");
}

// UPDATE: change a ticket by id and return the saved row.
// updated_at is set by a database trigger, so you do not send it.
export async function updateTicket(
  id: string,
  input: TicketInput
): Promise<Ticket> {
  void id;
  void input;
  throw new Error("TODO: implement updateTicket");
}

// DELETE: remove a ticket by id.
export async function deleteTicket(id: string): Promise<void> {
  void id;
  throw new Error("TODO: implement deleteTicket");
}

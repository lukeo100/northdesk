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
  let query = supabase
    .from("tickets")
    .select("*, categories(name)")
    .order("created_at", { ascending: false });

  if (filters.search) query = query.ilike("title", `%${filters.search}%`);
  if (filters.status) query = query.eq("status", filters.status);
  if (filters.priority) query = query.eq("priority", filters.priority);
  if (filters.categoryId) query = query.eq("category_id", filters.categoryId);

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }
  return data as TicketWithCategory[];
}

// READ: one ticket by id, with its category name.
export async function getTicket(id: string): Promise<TicketWithCategory> {
  void id;
  const { data, error } = await supabase
    .from("tickets")
    .select("*, categories(name)")
    .eq("id", id)
    .single();
    
  if (error) {
    throw new Error(error.message);
  }
  return data as TicketWithCategory;
}

// READ: the category list for the dropdowns and filter.
export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("name", { ascending: true });
    
  if (error) {
    throw new Error(error.message);
  }
  return data as Category[];
}

// CREATE: insert a ticket and return the saved row.
export async function createTicket(input: TicketInput): Promise<Ticket> {
  void input;
  const { data, error } = await supabase
    .from("tickets")
    .insert(input)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }
  return data as Ticket;
}

// UPDATE: change a ticket by id and return the saved row.
// updated_at is set by a database trigger, so you do not send it.
export async function updateTicket(
  id: string,
  input: TicketInput
): Promise<Ticket> {
  void id;
  void input;
  const { data, error } = await supabase
    .from("tickets")
    .update(input)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }
  return data as Ticket;
}

// DELETE: remove a ticket by id.
export async function deleteTicket(id: string): Promise<void> {
  void id;
  const { error } = await supabase
    .from("tickets")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}

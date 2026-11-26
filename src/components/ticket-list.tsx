"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { TicketFilters } from "@/components/ticket-filters";
import { TicketTable, TicketTableSkeleton } from "@/components/ticket-table";
import { getCategories, getTickets } from "@/lib/tickets";
import type { TicketFilters as TicketFiltersType } from "@/lib/tickets";
import type { Category, TicketWithCategory } from "@/types/ticket";

// Owns the filters and fetches tickets in the browser, so the page shell
// shows instantly and the skeleton appears while data loads.
export function TicketList() {
  const [filters, setFilters] = useState<TicketFiltersType>({});
  const [tickets, setTickets] = useState<TicketWithCategory[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Categories load once.
  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch((e: Error) => toast.error(e.message));
  }, []);

  // Tickets reload whenever a filter changes.
  useEffect(() => {
    let cancelled = false; // ignore out-of-date responses
    getTickets(filters)
      .then((data) => {
        if (!cancelled) setTickets(data);
      })
      .catch((e: Error) => toast.error(e.message))
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [filters]);

  // Show the skeleton as soon as a filter changes.
  function handleChange(next: TicketFiltersType) {
    setLoading(true);
    setFilters(next);
  }

  return (
    <>
      <TicketFilters categories={categories} filters={filters} onChange={handleChange} />
      {loading ? <TicketTableSkeleton /> : (
        <TicketTable
          tickets={tickets}
          // Remove the deleted row locally, no need to re-fetch.
          onDeleted={(id) => setTickets((prev) => prev.filter((t) => t.id !== id))}
        />
      )}
    </>
  );
}

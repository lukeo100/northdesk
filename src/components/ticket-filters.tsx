"use client";

import { RiSearchLine } from "@remixicon/react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PRIORITIES, STATUSES } from "@/types/ticket";
import type { TicketFilters as TicketFiltersType } from "@/lib/tickets";
import type { Category } from "@/types/ticket";

type Item = { label: string; value: string | null };

const statusItems: Item[] = [
  { label: "All statuses", value: null },
  ...STATUSES.map((s) => ({ label: s, value: s })),
];

const priorityItems: Item[] = [
  { label: "All priorities", value: null },
  ...PRIORITIES.map((p) => ({ label: p, value: p })),
];

function FilterSelect({
  items,
  value,
  onValueChange,
  label,
}: {
  items: Item[];
  value: string | null;
  onValueChange: (value: string | null) => void;
  label: string;
}) {
  return (
    <Select items={items} value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-full sm:w-44" aria-label={label}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {items.map((item) => (
            <SelectItem key={item.label} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

// Search and filter bar (wireframe 1). The parent owns the filter values.
export function TicketFilters({
  categories,
  filters,
  onChange,
}: {
  categories: Category[];
  filters: TicketFiltersType;
  onChange: (filters: TicketFiltersType) => void;
}) {
  const categoryItems: Item[] = [
    { label: "All categories", value: null },
    ...categories.map((c) => ({ label: c.name, value: c.id })),
  ];

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <RiSearchLine
          className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <Input
          type="search"
          placeholder="Search tickets"
          aria-label="Search tickets"
          className="pl-8"
          value={filters.search ?? ""}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
        />
      </div>
      <FilterSelect
        items={statusItems}
        value={filters.status ?? null}
        onValueChange={(v) => onChange({ ...filters, status: v ?? undefined })}
        label="Filter by status"
      />
      <FilterSelect
        items={priorityItems}
        value={filters.priority ?? null}
        onValueChange={(v) => onChange({ ...filters, priority: v ?? undefined })}
        label="Filter by priority"
      />
      <FilterSelect
        items={categoryItems}
        value={filters.categoryId ?? null}
        onValueChange={(v) => onChange({ ...filters, categoryId: v ?? undefined })}
        label="Filter by category"
      />
    </div>
  );
}

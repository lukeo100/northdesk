"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { createTicket, getCategories, getTicket, updateTicket } from "@/lib/tickets";
import { LIMITS, ticketSchema } from "@/lib/validation";
import type { TicketFormValues } from "@/lib/validation";
import { PRIORITIES, STATUSES } from "@/types/ticket";
import type { Category } from "@/types/ticket";

type Item = { label: string; value: string | null };

const priorityItems: Item[] = PRIORITIES.map((p) => ({ label: p, value: p }));
const statusItems: Item[] = STATUSES.map((s) => ({ label: s, value: s }));

// Small helper that shows a field's validation message under it.
function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="text-sm text-destructive">
      {message}
    </p>
  );
}

interface TicketFormProps {
  mode: "create" | "edit";
}

// Shared create and edit form (wireframes 3 and 4). Status only appears in edit mode.
export function TicketForm({ mode }: TicketFormProps) {
  const router = useRouter();
  // In edit mode the URL is /tickets/[id]/edit, so the ticket id comes from the URL.
  // On /tickets/new there is no id, so ticketId is undefined.
  const { id: ticketId } = useParams<{ id?: string }>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  // 1. React Hook Form holds the values and errors. The Zod schema is the rulebook.
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TicketFormValues>({
    resolver: zodResolver(ticketSchema),
    defaultValues: {
      title: "",
      description: "",
      staff_name: "",
      category_id: "",
      priority: "Medium",
      status: "Open", // not shown on the create form, new tickets always start as Open
    },
  });

  // 2. Load the category list (and the ticket when editing), then pre-fill the form.
  useEffect(() => {
    let cancelled = false; // ignore the result if the page was left before it arrived
    async function load() {
      try {
        const [cats, ticket] = await Promise.all([
          getCategories(),
          ticketId ? getTicket(ticketId) : null,
        ]);
        if (cancelled) return;
        setCategories(cats);
        if (ticket) {
          reset({
            title: ticket.title,
            description: ticket.description,
            staff_name: ticket.staff_name,
            category_id: ticket.category_id,
            priority: ticket.priority,
            status: ticket.status,
          });
        }
      } catch (e) {
        if (!cancelled) setLoadError(e instanceof Error ? e.message : "Could not load the form");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [ticketId, reset]);

  // 3. Only runs when the Zod schema passes. "values" is already trimmed and typed.
  async function onSubmit(values: TicketFormValues) {
    try {
      if (mode === "edit" && ticketId) {
        await updateTicket(ticketId, values);
        toast.success("Ticket updated");
        router.push(`/tickets/${ticketId}`);
      } else {
        await createTicket(values);
        toast.success("Ticket created");
        router.push("/");
      }
    } catch (e) {
      // Keep what the user typed so they can try again.
      toast.error(e instanceof Error ? e.message : "Something went wrong");
    }
  }

  if (loadError) {
    return (
      <p role="alert" className="text-sm text-destructive">
        {loadError}
      </p>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col gap-6" aria-busy="true" aria-label="Loading form">
        <Skeleton className="h-9 w-full" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-9 w-full" />
        <Skeleton className="h-9 w-full" />
      </div>
    );
  }

  const categoryItems: Item[] = [
    { label: "Select a category", value: null },
    ...categories.map((c) => ({ label: c.name, value: c.id })),
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6" noValidate>
      <div className="flex flex-col gap-2">
        <Label htmlFor="title">Title</Label>
        {/* register() connects a plain input to the form: it supplies name, onChange, onBlur and ref */}
        <Input
          id="title"
          placeholder="Short summary of the problem"
          maxLength={LIMITS.title.max}
          aria-invalid={!!errors.title}
          {...register("title")}
        />
        <FieldError message={errors.title?.message} />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          rows={5}
          placeholder="What happened, and what have you tried?"
          maxLength={LIMITS.description.max}
          aria-invalid={!!errors.description}
          {...register("description")}
        />
        <FieldError message={errors.description?.message} />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="staff_name">Staff name</Label>
        <Input
          id="staff_name"
          placeholder="Who is raising this ticket?"
          maxLength={LIMITS.staffName.max}
          aria-invalid={!!errors.staff_name}
          {...register("staff_name")}
        />
        <FieldError message={errors.staff_name?.message} />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="category_id">Category</Label>
          {/* Selects are not plain inputs, so Controller passes value and onChange by hand */}
          <Controller
            control={control}
            name="category_id"
            render={({ field }) => (
              <Select
                items={categoryItems}
                value={field.value || null}
                onValueChange={(v) => field.onChange(v ?? "")}
              >
                <SelectTrigger id="category_id" className="w-full" aria-invalid={!!errors.category_id}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {categoryItems.map((item) => (
                      <SelectItem key={item.label} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          <FieldError message={errors.category_id?.message} />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="priority">Priority</Label>
          <Controller
            control={control}
            name="priority"
            render={({ field }) => (
              <Select items={priorityItems} value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="priority" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {priorityItems.map((item) => (
                      <SelectItem key={item.label} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          <FieldError message={errors.priority?.message} />
        </div>
      </div>

      {mode === "edit" && (
        <div className="flex flex-col gap-2 sm:max-w-xs">
          <Label htmlFor="status">Status</Label>
          <Controller
            control={control}
            name="status"
            render={({ field }) => (
              <Select items={statusItems} value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="status" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {statusItems.map((item) => (
                      <SelectItem key={item.label} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          <FieldError message={errors.status?.message} />
        </div>
      )}

      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          render={<Link href={mode === "edit" && ticketId ? `/tickets/${ticketId}` : "/"} />}
          nativeButton={false}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : mode === "edit" ? "Save changes" : "Create ticket"}
        </Button>
      </div>
    </form>
  );
}

import { createClient } from "@supabase/supabase-js";

// Browser-safe client. The URL and publishable key come from .env.local
// locally, and from the Vercel project settings when deployed.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "Missing Supabase environment variables. Copy .env.example to .env.local and fill it in."
  );
}

// All Northdesk tables live in the "northdesk" schema, not the default "public" one.
// The schema must also be listed under Exposed schemas in the Supabase Data API settings.
export const supabase = createClient(supabaseUrl, supabaseKey, {
  db: { schema: "northdesk" },
});

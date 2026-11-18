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

export const supabase = createClient(supabaseUrl, supabaseKey);

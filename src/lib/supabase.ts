import { createClient } from "@supabase/supabase-js";

/**
 * Public (publishable) credentials only. Never put a service-role key here.
 * Override with VITE_SUPABASE_URL / VITE_SUPABASE_PUBLISHABLE_KEY if needed.
 */
export const SUPABASE_URL =
  import.meta.env['VITE_SUPABASE_URL'] ?? "https://nnbxziumubraxyeqkadn.supabase.co";

export const SUPABASE_PUBLISHABLE_KEY =
  import.meta.env['VITE_SUPABASE_PUBLISHABLE_KEY'] ??
  "sb_publishable_NJa7gfPEeWIgxZTiAfmdxA_wEKxo846";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    storageKey: "mda-portfolio-auth",
  },
});

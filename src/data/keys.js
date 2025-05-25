import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client using Vite env variables
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

/**
 * Fetches the Anthropic API key stored in the "api_keys" table under id="anthropic".
 * Ensure that your Supabase RLS policy allows anonymous access or that this table is public.
 */
export async function fetchApiKey() {
  const { data, error } = await supabase
    .from('api_keys')
    .select('value')
    .eq('id', 'anthropic')
    .single();

  if (error) {
    console.error('Supabase key-load error:', error);
    throw new Error('Unable to load API key');
  }

  // If data is null or missing, provide a clear message
  if (!data || !data.value) {
    console.error('No key found for id "anthropic"');
    throw new Error('API key not found in database');
  }

  console.log('🔥 fetched Anthropic key:', data.value);
  return data.value;
}

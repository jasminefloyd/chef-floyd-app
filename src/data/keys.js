// src/services/keys.js
import { createClient } from '@supabase/supabase-js';

// ← this must be here, before you ever call supabase.from(...)
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

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
  if (!data?.value) {
    console.error('No key found for id "anthropic"');
    throw new Error('API key not found in database');
  }

  console.log('🔥 fetched Anthropic key:', data.value);
  return data.value;
}

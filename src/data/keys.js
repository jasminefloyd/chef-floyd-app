export async function fetchApiKey() {
  const { data, error } = await supabase
    .from('api_keys')
    .select('value')
    .eq('id', 'anthropic')
    .single();

  if (error) {
    console.error('Supabase key‐load error:', error);
    throw error;
  }
  console.log('🔥 fetched Anthropic key:', data.value);
  return data.value;
}

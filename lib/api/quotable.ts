export async function fetchRandomQuote() {
  const res = await fetch('https://api.quotable.io/random');
  if (!res.ok) throw new Error('Failed to fetch quote');
  return res.json() as Promise<{ content: string; author: string }>;
}

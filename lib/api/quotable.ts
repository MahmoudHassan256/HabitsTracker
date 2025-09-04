const motivationalQuotes = [
  "Don't watch the clock; do what it does. Keep going.",
  'Success is the sum of small efforts, repeated daily.',
  "Believe you can and you're halfway there.",
  'Small steps every day lead to big changes.',
  'Consistency is the key to mastery.',
];

export async function fetchRandomQuote(): Promise<{ content: string; author?: string }> {
  try {
    const res = await fetch('https://zenquotes.io/api/quotes/random');
    if (!res.ok) throw new Error('Failed to fetch quote');

    const data = (await res.json()) as { q: string; a: string }[];
    const quote = data[0];

    return { content: quote.q, author: quote.a };
  } catch (error) {
    console.error('Error fetching quote, using fallback:', error);

    const fallback = motivationalQuotes[new Date().getDate() % motivationalQuotes.length];

    return { content: fallback, author: 'Unknown' };
  }
}

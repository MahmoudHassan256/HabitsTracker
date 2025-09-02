import { listCompletionsForWeek } from '@features/habits/services/completions';
import { databases } from '@lib/appwrite';
import { env } from '@lib/env';

export async function topUsersThisWeek(startISO: string, endISO: string) {
  const comps = await listCompletionsForWeek(startISO, endISO);
  const counts = new Map<string, number>();

  return Array.from(counts.entries())
    .map(([user_id, count]) => ({ user_id, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
}

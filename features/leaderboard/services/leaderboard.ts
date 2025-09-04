import { listCompletionsForWeek } from '~/features/habits/services/completions';
import { databases } from '~/lib/appwrite';
import { env } from '~/lib/env';

const { databaseId, compsColId, usersColId } = env;

export async function getWeeklyLeaderboard() {
  try {
    // Calculate start and end of this week (Monday → Sunday)
    const now = new Date();
    const day = now.getDay(); // 0 = Sunday
    const diffToMonday = day === 0 ? -6 : 1 - day;
    const monday = new Date(now);
    monday.setDate(now.getDate() + diffToMonday);
    monday.setHours(0, 0, 0, 0);

    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    sunday.setHours(23, 59, 59, 999);

    // Fetch completions this week
    const completions = await listCompletionsForWeek(monday.toISOString(), sunday.toISOString());

    // Count completions per user
    const counts: Record<string, number> = {};
    completions.documents.forEach((c) => {
      counts[c.userId] = (counts[c.userId] || 0) + 1;
    });

    // Fetch all users
    const allUsers = await databases.listDocuments(databaseId, usersColId);

    // Map counts to users
    let usersWithCount = allUsers.documents
      .filter((u) => counts[u.$id])
      .map((u) => ({
        id: u.$id,
        name: u.name,
        completedCount: counts[u.$id] || 0,
      }));

    // Sort and take top 10
    usersWithCount.sort((a, b) => b.completedCount - a.completedCount);
    return usersWithCount.slice(0, 10);
  } catch (err) {
    console.error('Failed to fetch weekly leaderboard:', err);
    return [];
  }
}

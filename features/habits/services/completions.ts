import { ID, Query } from 'react-native-appwrite';
import { databases } from '@lib/appwrite';
import { env } from '@lib/env';

const { databaseId, compsColId } = env;

// Mark a habit as completed
export async function markCompleted(habitId: string, date = new Date()) {
  const iso = new Date(date).toISOString();
  return databases.createDocument(databaseId, compsColId, ID.unique(), {
    habit: habitId,
    completed_at: iso,
  });
}

// Check if a habit is completed today
export async function isHabitCompletedToday(habitId: string) {
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999);

  const completions = await listCompletionsForWeek(
    todayStart.toISOString(),
    todayEnd.toISOString()
  );

  return completions.documents.some((c) => c.habitId === habitId);
}

export async function listCompletionsForWeek(startISO: string, endISO: string) {
  return databases.listDocuments(databaseId, compsColId, [
    Query.greaterThanEqual('completed_at', startISO),
    Query.lessThanEqual('completed_at', endISO),
  ]);
}
// Delete a completion document
export async function deleteCompletion(completionId: string) {
  return databases.deleteDocument(databaseId, compsColId, completionId);
}

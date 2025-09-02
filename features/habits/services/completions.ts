import { ID, Query } from 'react-native-appwrite';
import { databases } from '@lib/appwrite';
import { env } from '@lib/env';

const { databaseId, compsColId } = env;

export async function markCompleted(habitId: string, date = new Date()) {
  const iso = new Date(date).toISOString();
  return databases.createDocument(databaseId, compsColId, ID.unique(), {
    habit_id: habitId,
    completed_at: iso,
  });
}

export async function listCompletionsForWeek(startISO: string, endISO: string) {
  return databases.listDocuments(databaseId, compsColId, [
    Query.greaterThanEqual('completed_at', startISO),
    Query.lessThan('completed_at', endISO),
  ]);
}

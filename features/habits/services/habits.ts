import { ID, Query } from 'react-native-appwrite';
import { databases } from '@lib/appwrite';
import { env } from '@lib/env';

const { databaseId, habitsColId, usersColId } = env;

export async function createHabit(userId: string, title: string) {
  return databases.createDocument(databaseId, habitsColId, ID.unique(), {
    user_id: userId,
    title,
    created_at: new Date().toISOString(),
  });
}

export async function listHabits(userId: string) {
  return databases.listDocuments(databaseId, habitsColId, [
    Query.equal('user_id', userId),
    Query.orderDesc('created_at'),
  ]);
}

export async function updateHabit(id: string, title: string) {
  return databases.updateDocument(databaseId, habitsColId, id, { title });
}

export async function deleteHabit(id: string) {
  return databases.deleteDocument(databaseId, habitsColId, id);
}

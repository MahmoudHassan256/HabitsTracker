import { ID, Query } from 'react-native-appwrite';
import { databases } from '@lib/appwrite';
import { env } from '@lib/env';
import { Habit } from '~/lib/types';
import { getCurrentUser } from '~/features/auth/services/auth';

const { databaseId, habitsColId } = env;

export async function createHabit(userId: string, title: string) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new Error('User not authenticated');
  }

  return await databases.createDocument({
    databaseId: databaseId,
    collectionId: habitsColId,
    documentId: ID.unique(),
    data: {
      title: title,
      user: currentUser.$id,
    },
  });
}

export async function listHabits() {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new Error('User not authenticated');
  }

  const response = await databases.listDocuments({
    databaseId,
    collectionId: habitsColId,
    queries: [Query.equal('user', currentUser.$id), Query.orderDesc('$createdAt')],
  });
  const habits: Habit[] = response.documents.map((doc) => ({
    $id: doc.$id,
    user_id: doc.user_id,
    title: doc.title,
    $createdAt: doc.$createdAt,
  }));
  return habits
}

export async function listAllHabits() {
  const response = await databases.listDocuments({
    databaseId: databaseId,
    collectionId: habitsColId,
  });
  const habits: Habit[] = response.documents.map((doc) => ({
    $id: doc.$id,
    user_id: doc.user_id,
    title: doc.title,
    $createdAt: doc.$createdAt,
  }));

  return habits;
}

export async function updateHabit(id: string, title: string) {
  return databases.updateDocument({
    databaseId,
    collectionId: habitsColId,
    documentId: id,
    data: { title },
  });
}

export async function deleteHabit(id: string) {
  return databases.deleteDocument({
    databaseId,
    collectionId: habitsColId,
    documentId: id,
  });
}

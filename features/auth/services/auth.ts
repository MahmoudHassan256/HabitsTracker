import { account, databases } from '@lib/appwrite';
import { ID } from 'react-native-appwrite';
import { env } from '~/lib/env';
import { User } from '~/lib/types';

const { databaseId, usersColId } = env;

export async function login(email: string, password: string) {
  return account.createEmailPasswordSession({ email, password });
}

export async function register(name: string, email: string, password: string) {
  const user = await account.create({ userId: ID.unique(), email, password, name });
  await databases.createDocument({
    databaseId: databaseId,
    collectionId: usersColId,
    documentId: user.$id,
    data: {
      name: name,
      email: email,
    },
  });
  await account.createEmailPasswordSession({ email, password });
  return user;
}

export async function logout() {
  return account.deleteSession({ sessionId: 'current' });
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    return (await account.get()) as User;
  } catch {
    return null;
  }
}

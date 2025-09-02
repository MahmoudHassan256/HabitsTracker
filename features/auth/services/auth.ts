import { account } from '@lib/appwrite';

export async function register(name: string, email: string, password: string) {
  const user = await account.create('unique()', email, password, name);
  await account.createEmailPasswordSession(email, password);
  return user;
}

export async function login(email: string, password: string) {
  return account.createEmailPasswordSession(email, password);
}

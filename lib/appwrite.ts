import { Client, Account, Databases, Avatars } from 'react-native-appwrite';
import { Platform } from 'react-native';
import { env } from '@lib/env';

const client = new Client().setEndpoint(env.endpoint).setProject(env.projectId);

switch (Platform.OS) {
  case 'ios':
    client.setPlatform(env.bundleId);
    break;
  case 'android':
    client.setPlatform(env.packageName);
    break;
}

export const account = new Account(client);
export const databases = new Databases(client);
export const avatars = new Avatars(client);

export { client };

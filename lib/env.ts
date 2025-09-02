export const env = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DB_ID!,
  packageName: process.env.EXPO_PUBLIC_APPWRITE_PACKAGE_NAME!,
  bundleId: process.env.EXPO_PUBLIC_APPWRITE_BUNDLE_ID!,
  usersColId: process.env.EXPO_PUBLIC_USERS_COLLECTION_ID!,
  habitsColId: process.env.EXPO_PUBLIC_HABITS_COLLECTION_ID!,
  compsColId: process.env.EXPO_PUBLIC_COMPLETIONS_COLLECTION_ID!,
} as const;

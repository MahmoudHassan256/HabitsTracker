// types.ts

/** User collection type */
export interface User {
  $id: string; // Appwrite document ID
  name: string;
  email: string;
  avatar_url?: string; // optional, user may not have an avatar
  $createdAt: string; // Appwrite createdAt timestamp
  $updatedAt: string; // Appwrite updatedAt timestamp
}

/** Habit collection type */
export interface Habit {
  $id: string;
  user_id: string;
  title: string;
  $createdAt: string;
}

/** HabitCompletion collection type */
export interface HabitCompletion {
  $id: string; // Appwrite document ID
  habit_id: string; // reference to Habit
  completed_at: string; // ISO datetime string
  $createdAt: string; // Appwrite timestamp
  $updatedAt: string;
}

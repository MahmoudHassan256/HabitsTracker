export interface User {
  $id: string;
  name: string;
  email: string;
  avatar_url?: string;
}
export interface Habit {
  $id: string;
  user_id: string;
  title: string;
  created_at: string;
}
export interface HabitCompletion {
  $id: string;
  habit_id: string;
  completed_at: string;
}

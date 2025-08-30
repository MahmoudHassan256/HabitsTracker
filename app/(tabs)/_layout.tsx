import { Redirect, Tabs } from 'expo-router';
import { Home, Trophy, User } from 'lucide-react-native';
import { useAuth } from '~/context/AuthContext';

export default function TabLayout() {
  const { session } = useAuth();
  if (!session) return <Redirect href={'/(auth)/auth'} />;

  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="leaderboard"
        options={{
          title: 'Leaderboard',
          tabBarIcon: ({ color, size }) => <Trophy color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}

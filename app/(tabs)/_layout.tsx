import { Tabs } from 'expo-router';
import { Home, Trophy, User, Settings, Plus } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { Center } from '~/components/ui/center';
import { Pressable } from '~/components/ui/pressable';
import { useUI } from '~/providers/UIProvider';

export default function TabLayout() {
  const router = useRouter();
  const { mode } = useUI();

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          backgroundColor:
            mode === 'dark'
              ? 'rgb(20, 20, 20)' // dark background
              : 'rgb(255, 255, 255)', // light background
          borderTopWidth: 0,
          elevation: 0,
        },
      }}>
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />

      <Tabs.Screen
        name="leaderboard"
        options={{
          tabBarIcon: ({ color, size }) => <Trophy color={color} size={size} />,
        }}
      />

      {/* Middle + Button */}
      <Tabs.Screen
        name="add-habit"
        options={{
          tabBarButton: () => (
            <Center>
              <Pressable
                className="bg-primary-500 w-16 h-16 rounded-full items-center justify-center -mt-8 shadow-md"
                onPress={() => router.push('/(tabs)/add-habit')}>
                <Plus color="white" size={28} />
              </Pressable>
            </Center>
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          tabBarIcon: ({ color, size }) => <Settings color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}

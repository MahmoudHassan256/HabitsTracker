import React, { useState } from 'react';
import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Box } from '~/components/ui/box';
import { Text } from '~/components/ui/text';
import { useUI } from '~/providers/UIProvider';

interface User {
  id: string;
  name: string;
  points: number;
}

export default function Leaderboard() {
  const { mode } = useUI();

  const [users] = useState<User[]>([
    { id: '1', name: 'Alice', points: 150 },
    { id: '2', name: 'Bob', points: 140 },
    { id: '3', name: 'Charlie', points: 130 },
    { id: '4', name: 'David', points: 120 },
    { id: '5', name: 'Eve', points: 110 },
    { id: '6', name: 'Frank', points: 100 },
    { id: '7', name: 'Grace', points: 90 },
    { id: '8', name: 'Hannah', points: 80 },
    { id: '9', name: 'Ivy', points: 70 },
    { id: '10', name: 'Jack', points: 60 },
  ]);

  const motivationalQuotes = [
    "Don't watch the clock; do what it does. Keep going.",
    'Success is the sum of small efforts, repeated daily.',
    "Believe you can and you're halfway there.",
    'Small steps every day lead to big changes.',
    'Consistency is the key to mastery.',
  ];

  // Pick a quote of the day
  const dailyQuote = motivationalQuotes[new Date().getDate() % motivationalQuotes.length];

  return (
    <SafeAreaView className="flex-1 bg-background-0 p-4">
      {/* Motivational Quote */}
      <Box
        className="
          bg-primary-50 dark:bg-primary-700
          rounded-xl p-4 mb-6 shadow-md
        ">
        <Text
          className="text-center text-lg font-semibold"
          style={{ color: mode === 'dark' ? 'rgb(255 255 255)' : 'rgb(0 0 0)' }}>
          "{dailyQuote}"
        </Text>
      </Box>

      {/* Leaderboard */}
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <Box
            className="
              flex-row justify-between items-center
              bg-background-50 dark:bg-background-900
              p-4 rounded-lg mb-3 shadow-sm
            ">
            <Text
              className="font-bold text-lg"
              style={{ color: mode === 'dark' ? 'rgb(255 255 255)' : 'rgb(0 0 0)' }}>
              #{index + 1} {item.name}
            </Text>
            <Text
              className="font-semibold text-base"
              style={{ color: mode === 'dark' ? 'rgb(0 160 255)' : 'rgb(0 120 215)' }}>
              {item.points} pts
            </Text>
          </Box>
        )}
      />
    </SafeAreaView>
  );
}

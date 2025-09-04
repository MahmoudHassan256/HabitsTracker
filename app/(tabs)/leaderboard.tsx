import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Box } from '~/components/ui/box';
import { Text } from '~/components/ui/text';
import { Skeleton } from '~/components/ui/skeleton';
import { Spinner } from '~/components/ui/spinner';
import { useUI } from '~/providers/UIProvider';
import { fetchRandomQuote } from '~/lib/api/quotable';
import { getWeeklyLeaderboard } from '~/features/leaderboard/services/leaderboard';

interface User {
  id: string;
  name: string;
  completedCount: number;
}

export default function Leaderboard() {
  const { mode } = useUI();
  const [loading, setLoading] = useState(true);
  const [topUsers, setTopUsers] = useState<User[]>([]);
  const [quote, setQuote] = useState<{ content: string; author?: string } | null>(null);

  // Fetch motivational quote
  useEffect(() => {
    const getQuote = async () => {
      const data = await fetchRandomQuote();
      setQuote(data);
    };
    getQuote();
  }, []);

  // Fetch leaderboard
  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      const users = await getWeeklyLeaderboard();
      setTopUsers(users);
      setLoading(false);
    };
    fetchLeaderboard();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-background-0 p-4">
      {/* Motivational Quote */}
      {quote && (
        <Box className="bg-primary-50 dark:bg-primary-700 p-4 rounded-xl mb-6 shadow-md flex items-center justify-center">
          <Text
            className={`text-center text-lg font-semibold ${
              mode === 'dark' ? 'text-white' : 'text-black'
            }`}>
            "{quote.content}"
          </Text>
          {quote.author && (
            <Text
              className={`text-center text-sm mt-2 ${
                mode === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
              – {quote.author}
            </Text>
          )}
        </Box>
      )}

      {/* Leaderboard */}
      {loading ? (
        <Box className="flex-1 justify-center items-center">
          <Spinner />
        </Box>
      ) : (
        <FlatList
          data={topUsers}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <Box className="flex-row justify-between items-center bg-background-50 dark:bg-background-900 p-4 rounded-lg mb-3 shadow-sm">
              <Text
                className={`font-bold text-lg ${mode === 'dark' ? 'text-white' : 'text-black'}`}>
                #{index + 1} {item.name}
              </Text>
              <Text
                className={`font-semibold text-base ${mode === 'dark' ? 'text-cyan-400' : 'text-blue-600'}`}>
                {item.completedCount} ✅
              </Text>
            </Box>
          )}
          ListEmptyComponent={
            <Box className="mt-8 items-center">
              <Skeleton className="w-64 h-6 mb-2 rounded-lg" />
              <Skeleton className="w-48 h-6 rounded-lg" />
            </Box>
          }
        />
      )}
    </SafeAreaView>
  );
}

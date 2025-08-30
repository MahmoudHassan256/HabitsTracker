import React, { useEffect, useState } from 'react';
import { FlatList, ActivityIndicator } from 'react-native';
import { YStack, XStack, Text, Card, Spinner } from 'tamagui';
import mockData from '../../assets/mockData.json';
import { User, Habit, HabitCompletion } from '~/lib/types';

type LeaderboardEntry = User & { completions: number };
type Quote = { quote: string; author: string };

const Leaderboard = () => {
  const { users, habits, habitCompletions } = mockData as {
    users: User[];
    habits: Habit[];
    habitCompletions: HabitCompletion[];
  };

  const [topUsers, setTopUsers] = useState<LeaderboardEntry[]>([]);
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loadingQuote, setLoadingQuote] = useState(true);

  // --- Calculate top 10 users this week ---
  useEffect(() => {
    const now = new Date();
    const day = now.getDay(); // Sunday = 0
    const diffToMonday = day === 0 ? -6 : 1 - day;
    const monday = new Date(now);
    monday.setHours(0, 0, 0, 0);
    monday.setDate(now.getDate() + diffToMonday);

    const completionsThisWeek = habitCompletions.filter((c) => {
      const completedDate = new Date(c.completed_at);
      return completedDate >= monday;
    });

    const userCompletionCount: Record<string, number> = {};
    completionsThisWeek.forEach((c) => {
      const habit = habits.find((h) => h.$id === c.habit_id);
      if (habit) {
        userCompletionCount[habit.user_id] = (userCompletionCount[habit.user_id] || 0) + 1;
      }
    });

    const leaderboardData: LeaderboardEntry[] = users
      .map((u) => ({ ...u, completions: userCompletionCount[u.$id] || 0 }))
      .sort((a, b) => b.completions - a.completions)
      .slice(0, 10);

    setTopUsers(leaderboardData);
  }, []);

  // --- Fetch daily quote with fallback ---
  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const res1 = await fetch('https://api.quotable.io/random');
        if (!res1.ok) throw new Error('Quotable API failed');
        const data1 = await res1.json();
        setQuote({ quote: data1.content, author: data1.author });
      } catch (err1) {
        console.warn('Quotable failed, trying ZenQuotes...', err1);
        try {
          const res2 = await fetch('https://zenquotes.io/api/random');
          if (!res2.ok) throw new Error('ZenQuotes API failed');
          const data2 = await res2.json();
          if (Array.isArray(data2) && data2.length > 0) {
            setQuote({ quote: data2[0].q, author: data2[0].a });
          }
        } catch (err2) {
          console.log('Both quote APIs failed:', err2);
          setQuote({ quote: 'Keep pushing forward!', author: 'Anonymous' });
        }
      } finally {
        setLoadingQuote(false);
      }
    };
    fetchQuote();
  }, []);

  return (
    <YStack flex={1} padding="$4" backgroundColor="$background">
      <Text fontSize="$7" fontWeight="800" marginBottom="$4" textAlign="center">
        🏆 Top 10 This Week
      </Text>

      <FlatList
        data={topUsers}
        keyExtractor={(item) => item.$id}
        renderItem={({ item, index }) => (
          <Card padding="$3" marginBottom="$2" borderRadius="$3" backgroundColor="$gray2">
            <XStack justifyContent="space-between" alignItems="center">
              <Text fontWeight="700">{index + 1}.</Text>
              <Text fontSize="$5" flex={1} marginLeft="$2">
                {item.name}
              </Text>
              <Text fontSize="$5" fontWeight="600">
                {item.completions} ✅
              </Text>
            </XStack>
          </Card>
        )}
        ListFooterComponent={
          <YStack
            marginTop="$4"
            alignItems="center"
            padding="$4"
            borderTopWidth={1}
            borderTopColor="$borderColor">
            {loadingQuote ? (
              <Spinner />
            ) : quote ? (
              <>
                <Text fontSize="$5" fontStyle="italic" textAlign="center">
                  "{quote.quote}"
                </Text>
                <Text fontSize="$4" fontWeight="700" marginTop="$2" textAlign="center">
                  — {quote.author}
                </Text>
              </>
            ) : (
              <Text fontSize="$5">Couldn’t load today’s quote.</Text>
            )}
          </YStack>
        }
      />
    </YStack>
  );
};

export default Leaderboard;

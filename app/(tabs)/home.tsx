import React, { useCallback, useState } from 'react';
import { FlatList, TextInput, Alert } from 'react-native';
import { Box } from '~/components/ui/box';
import { Text } from '~/components/ui/text';
import { Pressable } from '~/components/ui/pressable';
import { SafeAreaView } from 'react-native-safe-area-context';
import { listHabits, updateHabit, deleteHabit } from '~/features/habits/services/habits';
import {
  markCompleted,
  listCompletionsForWeek,
  deleteCompletion,
} from '~/features/habits/services/completions';
import { Habit } from '~/lib/types';
import { useAuth } from '~/providers/AuthProvider';
import { useFocusEffect } from 'expo-router';
import { Switch } from '~/components/ui/switch'; // Gluestack switch

export default function Home() {
  const { user } = useAuth();
  const [habits, setHabits] = useState<
    (Habit & { isCompletedToday: boolean; completionId?: string })[]
  >([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const formatDate = (isoDate: string) => new Date(isoDate).toLocaleDateString();

  // Fetch habits and completions
  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        if (!user) return;
        try {
          const habitsData = await listHabits();

          const todayStart = new Date();
          todayStart.setHours(0, 0, 0, 0);
          const todayEnd = new Date();
          todayEnd.setHours(23, 59, 59, 999);

          const completions = await listCompletionsForWeek(
            todayStart.toISOString(),
            todayEnd.toISOString()
          );

          const habitsWithCompletion = habitsData.map((h) => {
            const completedDoc = completions.documents.find((c) => c.habit === h.$id);
            return {
              ...h,
              isCompletedToday: !!completedDoc,
              completionId: completedDoc?.$id,
            };
          });

          setHabits(habitsWithCompletion);
        } catch (err) {
          console.error('Failed to fetch habits or completions:', err);
        }
      };

      fetchData();
    }, [user])
  );

  const handleEdit = (id: string, title: string) => {
    setEditingId(id);
    setEditingTitle(title);
  };

  const handleSave = async (id: string) => {
    setIsUpdating(true);
    try {
      await updateHabit(id, editingTitle);
      setHabits((prev) => prev.map((h) => (h.$id === id ? { ...h, title: editingTitle } : h)));
      setEditingId(null);
      setEditingTitle('');
    } catch (error) {
      console.error('Failed to update habit:', error);
      Alert.alert('Error', 'Failed to update habit. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditingTitle('');
  };

  const handleDelete = (id: string) => {
    Alert.alert('Delete Habit', 'Are you sure you want to delete this habit?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => confirmDelete(id) },
    ]);
  };

  const confirmDelete = async (id: string) => {
    setIsDeleting(id);
    try {
      await deleteHabit(id);
      setHabits((prev) => prev.filter((h) => h.$id !== id));
    } catch (error) {
      console.error('Failed to delete habit:', error);
      Alert.alert('Error', 'Failed to delete habit. Please try again.');
    } finally {
      setIsDeleting(null);
    }
  };

  const handleToggleCompletion = async (habitId: string, completionId?: string) => {
    try {
      if (completionId) {
        await deleteCompletion(completionId);
        setHabits((prev) =>
          prev.map((h) =>
            h.$id === habitId ? { ...h, isCompletedToday: false, completionId: undefined } : h
          )
        );
      } else {
        const newDoc = await markCompleted(habitId);
        setHabits((prev) =>
          prev.map((h) =>
            h.$id === habitId ? { ...h, isCompletedToday: true, completionId: newDoc.$id } : h
          )
        );
      }
    } catch (err) {
      console.error('Failed to toggle completion:', err);
      Alert.alert('Error', 'Could not toggle completion. Please try again.');
    }
  };

  if (!user) {
    return (
      <SafeAreaView className="flex-1 bg-background-0 p-4">
        <Text className="text-center text-lg">Please log in to view your habits.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background-0 p-4">
      <Text className="text-2xl font-bold mb-4">My Habits</Text>
      <FlatList
        data={habits}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <Box className="bg-primary-500 rounded-lg p-5 mb-3">
            <Box className="flex-row items-center justify-between">
              <Text className="text-base font-medium">{item.title}</Text>
              <Switch
                value={item.isCompletedToday}
                onToggle={() => handleToggleCompletion(item.$id, item.completionId)}
              />
            </Box>

            {editingId === item.$id ? (
              <TextInput
                value={editingTitle}
                onChangeText={setEditingTitle}
                className="border border-gray-300 rounded-lg p-2 mt-2 bg-white"
                autoFocus
                placeholder="Enter habit title"
              />
            ) : null}

            <Box className="flex-row mt-2">
              {editingId === item.$id ? (
                <>
                  <Pressable
                    className="mr-2"
                    onPress={() => handleSave(item.$id)}
                    disabled={isUpdating}>
                    <Text style={{ color: isUpdating ? 'gray' : 'green' }}>Save</Text>
                  </Pressable>
                  <Pressable onPress={handleCancel}>
                    <Text style={{ color: 'red' }}>Cancel</Text>
                  </Pressable>
                </>
              ) : (
                <>
                  <Pressable className="mr-2" onPress={() => handleEdit(item.$id, item.title)}>
                    <Text style={{ color: 'black' }}>Edit</Text>
                  </Pressable>
                  <Pressable
                    onPress={() => handleDelete(item.$id)}
                    disabled={isDeleting === item.$id}>
                    <Text style={{ color: isDeleting === item.$id ? 'gray' : 'red' }}>Delete</Text>
                  </Pressable>
                </>
              )}
            </Box>
          </Box>
        )}
        ListEmptyComponent={
          <Text className="text-center text-gray-500 mt-8">
            No habits yet. Create your first habit!
          </Text>
        }
      />
    </SafeAreaView>
  );
}

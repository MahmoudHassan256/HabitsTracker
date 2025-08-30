import React, { useState } from 'react';
import { FlatList, TextInput, TouchableOpacity } from 'react-native';
import { YStack, XStack, Text, Button, Input, Card } from 'tamagui';
import mockData from '../../assets/mockData.json';
import { Habit, HabitCompletion } from '~/lib/types';

const Home = () => {
  const [user] = useState(mockData.users[0]);
  const [habits, setHabits] = useState(mockData.habits.filter((h) => h.user_id === user.$id));
  const [habitCompletions, setHabitCompletions] = useState(mockData.habitCompletions);
  const [newHabit, setNewHabit] = useState('');
  const [editingHabitId, setEditingHabitId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState('');

  const handleAddHabit = () => {
    if (!newHabit.trim()) return;
    const habit: Habit = {
      $id: `h${Date.now()}`,
      user_id: user.$id,
      title: newHabit,
      created_at: new Date().toISOString(),
    };
    setHabits([habit, ...habits]);
    setNewHabit('');
  };

  const handleDeleteHabit = (habitId: string) => {
    setHabits(habits.filter((h) => h.$id !== habitId));
    setHabitCompletions(habitCompletions.filter((c) => c.habit_id !== habitId));
  };

  const toggleCompletion = (habitId: string) => {
    const existing = habitCompletions.find((c) => c.habit_id === habitId);
    if (existing) {
      setHabitCompletions(habitCompletions.filter((c) => c.habit_id !== habitId));
    } else {
      setHabitCompletions([
        ...habitCompletions,
        { $id: `c${Date.now()}`, habit_id: habitId, completed_at: new Date().toISOString() },
      ]);
    }
  };

  const isCompleted = (habitId: string) => habitCompletions.some((c) => c.habit_id === habitId);

  const saveEdit = (habitId: string) => {
    setHabits(habits.map((h) => (h.$id === habitId ? { ...h, title: editingText } : h)));
    setEditingHabitId(null);
    setEditingText('');
  };

  return (
    <YStack flex={1} padding={24} backgroundColor="$background">
      <Text fontSize={20} fontWeight="800" marginBottom={16}>
        Habits of {user.name}
      </Text>

      {/* Add new habit */}
      <XStack space={8} marginBottom={16}>
        <Input
          flex={1}
          value={newHabit}
          onChangeText={setNewHabit}
          placeholder="New habit..."
          size="$4"
        />
        <Button onPress={handleAddHabit} backgroundColor="$green10">
          Add
        </Button>
      </XStack>

      <FlatList
        data={habits}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => {
          const completed = isCompleted(item.$id);
          const isEditing = editingHabitId === item.$id;

          return (
            <Card borderRadius="$4" padding="$3" marginBottom="$3" backgroundColor="$gray2">
              {isEditing ? (
                <Input
                  value={editingText}
                  onChangeText={setEditingText}
                  onSubmitEditing={() => saveEdit(item.$id)}
                  autoFocus
                  size="$4"
                />
              ) : (
                <Text fontSize={16} fontWeight="600" marginBottom={4}>
                  {item.title}
                </Text>
              )}

              {/* Toggle completion */}
              <TouchableOpacity onPress={() => toggleCompletion(item.$id)}>
                <Text color={completed ? '$green10' : '$red10'} fontWeight="700" marginBottom={4}>
                  {completed ? 'Completed ✅' : 'Not Completed ❌'}
                </Text>
              </TouchableOpacity>

              <XStack justifyContent="flex-end" space={8}>
                {!isEditing && (
                  <Button
                    size="$2"
                    onPress={() => {
                      setEditingHabitId(item.$id);
                      setEditingText(item.title);
                    }}>
                    Edit
                  </Button>
                )}
                <Button
                  size="$2"
                  backgroundColor="$red10"
                  onPress={() => handleDeleteHabit(item.$id)}>
                  Delete
                </Button>
              </XStack>
            </Card>
          );
        }}
      />
    </YStack>
  );
};

export default Home;

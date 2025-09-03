import React, { useState } from 'react';
import { FlatList, TextInput } from 'react-native';
import { Box } from '~/components/ui/box';
import { Text } from '~/components/ui/text';
import { Pressable } from '~/components/ui/pressable';
import { useUI } from '~/providers/UIProvider';
import { Edit2, Trash2, Check, X } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Habit {
  id: string;
  user_id: string;
  title: string;
  created_at: string;
}

export default function Home() {
  const { mode } = useUI();
  const [habits, setHabits] = useState<Habit[]>([
    { id: '1', user_id: 'user_123', title: 'Drink Water', created_at: '2025-09-03T10:00:00Z' },
    { id: '2', user_id: 'user_123', title: 'Morning Walk', created_at: '2025-09-02T08:30:00Z' },
  ]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState('');

  const handleEdit = (id: string, title: string) => {
    setEditingId(id);
    setEditingTitle(title);
  };

  const handleSave = (id: string) => {
    setHabits((prev) =>
      prev.map((habit) => (habit.id === id ? { ...habit, title: editingTitle } : habit))
    );
    setEditingId(null);
    setEditingTitle('');
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditingTitle('');
  };

  const handleDelete = (id: string) => {
    setHabits((prev) => prev.filter((habit) => habit.id !== id));
  };

  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString();
  };

  return (
    <SafeAreaView className="flex-1 bg-background-0 p-4">
      <Text
        className="text-2xl font-bold mb-4"
        style={{ color: mode === 'dark' ? 'rgb(255 255 255)' : 'rgb(0 0 0)' }}>
        My Habits
      </Text>

      <FlatList
        data={habits}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Box
            className="
              bg-primary-500
              rounded-lg p-5 mb-3 flex-row items-center justify-between 
            ">
            <Box className="flex-1">
              {editingId === item.id ? (
                <TextInput
                  value={editingTitle}
                  onChangeText={setEditingTitle}
                  className="
                    border 
                    rounded-lg p-2 mb-2
                  "
                  autoFocus
                />
              ) : (
                <>
                  <Text className="text-base font-medium mb-1 text-typography-950">{item.title}</Text>
                  <Text className="text-sm text-typography-800">
                    Created: {formatDate(item.created_at)}
                  </Text>
                </>
              )}
            </Box>

            <Box className="flex-row ml-4">
              {editingId === item.id ? (
                <>
                  <Pressable className="ml-2" onPress={() => handleSave(item.id)}>
                    <Check size={22} />
                  </Pressable>
                  <Pressable className="ml-2" onPress={handleCancel}>
                    <X size={22} color={'red'} />
                  </Pressable>
                </>
              ) : (
                <>
                  {/* Edit button */}
                  <Pressable className="ml-2" onPress={() => handleEdit(item.id, item.title)}>
                    <Edit2 size={20} />
                  </Pressable>

                  {/* Delete button */}
                  <Pressable className="ml-2" onPress={() => handleDelete(item.id)}>
                    <Trash2 size={20} color={'red'} />
                  </Pressable>
                </>
              )}
            </Box>
          </Box>
        )}
      />
    </SafeAreaView>
  );
}

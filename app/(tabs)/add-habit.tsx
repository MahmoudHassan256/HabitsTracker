import { useState } from 'react';
import { TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { Center } from '~/components/ui/center';
import { Box } from '~/components/ui/box';
import { Pressable } from '~/components/ui/pressable';
import { Text } from '~/components/ui/text';
import { Button } from '~/components/ui/button';
import { useUI } from '~/providers/UIProvider';

export default function AddHabitModal() {
  const { mode } = useUI();
  const router = useRouter();
  const [habitTitle, setTitle] = useState('');

  const handleAddHabit = () => {
    if (!habitTitle.trim()) return;
    console.log('Habit added:', habitTitle);
    setTitle('');
    router.back();
  };

  return (
    <Center className="flex-1 bg-black/50 p-4">
      <Box
        className="
          w-full max-w-md p-6 rounded-xl shadow-md
          bg-background-0 dark:bg-background-0
        ">
        {/* Header */}
        <Box className="flex-row items-center mb-4">
          <Pressable onPress={() => router.back()} className="p-2 mr-2">
            <ArrowLeft size={24} color={mode === 'dark' ? 'rgb(255 255 255)' : 'rgb(0 0 0)'} />
          </Pressable>
          <Text
            className="text-lg font-bold"
            style={{ color: mode === 'dark' ? 'rgb(255 255 255)' : 'rgb(0 0 0)' }}>
            Add Habit
          </Text>
        </Box>

        {/* Habit Title Input */}
        <TextInput
          value={habitTitle}
          onChangeText={setTitle}
          placeholder="Habit title"
          placeholderTextColor={mode === 'dark' ? 'rgb(180 180 180)' : 'rgb(120 120 120)'}
          className="
            border border-outline-300 dark:border-outline-700
            rounded-lg p-3 mb-6 text-base
            bg-background-50 dark:bg-background-900
            text-typography-0 dark:text-typography-0
          "
        />

        {/* Add Button */}
        <Button onPress={handleAddHabit} className="bg-primary-500 rounded-lg ">
          <Text className="text-white text-center font-semibold">Add</Text>
        </Button>
      </Box>
    </Center>
  );
}

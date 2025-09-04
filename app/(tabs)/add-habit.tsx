import { useState } from 'react';
import { TextInput, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { Center } from '~/components/ui/center';
import { Box } from '~/components/ui/box';
import { Pressable } from '~/components/ui/pressable';
import { Text } from '~/components/ui/text';
import { Button } from '~/components/ui/button';
import { useAuth } from '~/providers/AuthProvider';
import { createHabit } from '~/features/habits/services/habits';

export default function AddHabitModal() {
  const router = useRouter();
  const { user } = useAuth(); // guaranteed to be non-null
  const [habitTitle, setTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAddHabit = async () => {
    if (!habitTitle.trim()) return;

    setIsLoading(true);
    try {      
      const habit = await createHabit(user.$id, habitTitle.trim());
      setTitle('');
      router.back();
    } catch (err: any) {
      console.log('Register failed:', err);
      Alert.alert('Error', 'Failed to add habit. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Center className="flex-1 bg-black/50 p-4">
      <Box className="w-full max-w-md p-6 rounded-xl shadow-md bg-background-0">
        {/* Header */}
        <Box className="flex-row items-center mb-4">
          <Pressable onPress={() => router.back()} className="p-2 mr-2">
            <ArrowLeft size={24} color="black" />
          </Pressable>
          <Text className="text-lg font-bold">Add Habit</Text>
        </Box>

        {/* Habit Title Input */}
        <TextInput
          value={habitTitle}
          onChangeText={setTitle}
          placeholder="Habit title"
          placeholderTextColor="gray"
          className="border border-outline-300 rounded-lg p-3 mb-6 text-base bg-background-50 text-black"
        />

        {/* Add Button */}
        <Button
          onPress={handleAddHabit}
          className="bg-primary-500 rounded-lg"
          isDisabled={isLoading}>
          <Text className="text-white text-center font-semibold">
            {isLoading ? 'Adding...' : 'Add'}
          </Text>
        </Button>
      </Box>
    </Center>
  );
}

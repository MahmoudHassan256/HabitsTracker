// app/(tabs)/profile.tsx
import React from 'react';
import { Alert } from 'react-native';
import { Box } from '~/components/ui/box';
import { Text } from '~/components/ui/text';
import { Heading } from '~/components/ui/heading';
import { Button, ButtonText } from '~/components/ui/button';
import { VStack } from '~/components/ui/vstack';
import { HStack } from '~/components/ui/hstack';
import { Image } from '~/components/ui/image';
import { useRouter } from 'expo-router';

type User = {
  name: string;
  email: string;
  avatar_url?: string;
};

const mockUser: User = {
  name: 'Mahmoud Hassan',
  email: 'mahmoud@example.com',
  avatar_url: 'https://i.pravatar.cc/150?img=12',
};

export default function Profile() {
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', style: 'destructive', onPress: () => router.replace('/(auth)/login') },
    ]);
  };

  return (
    <Box className="flex-1 bg-background-0 p-4 justify-center">
      <VStack space="6" className="items-center mt-10">
        {/* Avatar */}
        <Box className="rounded-full overflow-hidden w-24 h-24 mb-4">
          <Image source={{ uri: mockUser.avatar_url }} className="w-24 h-24 rounded-full" alt="" />
        </Box>

        {/* Name & Email */}
        <Heading size="2xl" className="text-primary-700">
          {mockUser.name}
        </Heading>
        <Text size="md" className="text-typography-600">
          {mockUser.email}
        </Text>

        {/* Logout Button */}
        <Button
          size="lg"
          action="danger"
          onPress={handleLogout}
          className="mt-10 w-full max-w-md bg-primary-500">
          <ButtonText>Logout</ButtonText>
        </Button>
      </VStack>
    </Box>
  );
}

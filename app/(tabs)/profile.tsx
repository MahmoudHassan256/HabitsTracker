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
import { useAuth } from '~/providers/AuthProvider';
import { logout } from '~/features/auth/services/auth';
import { Avatar, AvatarBadge, AvatarFallbackText, AvatarImage } from '~/components/ui/avatar';

export default function Profile() {
  const router = useRouter();
  const { user, refresh } = useAuth();

  const initials = user.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
    : '?';

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          try {
            await logout();
            await refresh();
            router.replace('/(auth)/login');
          } catch (err: any) {
            console.log('Logout failed:', err);
            Alert.alert('Error', 'Failed to logout. Please try again.');
          }
        },
      },
    ]);
  };

  return (
    <Box className="flex-1 bg-background-0 p-4 justify-center">
      <VStack space="6" className="items-center mt-10">
        <Avatar size="md" className="rounded-full">
          <AvatarFallbackText>{initials}</AvatarFallbackText>

          {/* User avatar image */}
          {user.avatar_url && (
            <AvatarImage
              source={{
                uri: user.avatar_url,
              }}
            />
          )}

          {/* Optional badge */}
          <AvatarBadge />
        </Avatar>

        {/* Name & Email */}
        <Heading size="2xl" className="text-primary-700">
          {user.name}
        </Heading>
        <Text size="md" className="text-typography-600">
          {user.email}
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

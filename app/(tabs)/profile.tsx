import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { YStack, XStack, Text, Button } from 'tamagui';
import mockData from '../../assets/mockData.json';
import { User } from '~/lib/types';
import { useAuth } from '~/context/AuthContext';

const Profile = () => {
  const { signout, user } = useAuth();
  const handleLogout = () => {
    signout();
    console.log('Logout clicked');
  };

  return (
    <YStack flex={1} padding="$4" alignItems="center" backgroundColor="$background">
      {user.avatar_url && (
        <Image
          source={{ uri: user.avatar_url }}
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            marginBottom: 16,
          }}
        />
      )}
      <Text fontSize="$7" fontWeight="800" marginBottom="$2">
        {user.name}
      </Text>
      <Text fontSize="$5" color="$gray10" marginBottom="$6">
        {user.email}
      </Text>

      <Button
        backgroundColor="$red10"
        paddingHorizontal="$5"
        paddingVertical="$3"
        borderRadius="$3"
        onPress={handleLogout}>
        <Text color="$white" fontWeight="700" fontSize="$5">
          Logout
        </Text>
      </Button>
    </YStack>
  );
};

export default Profile;

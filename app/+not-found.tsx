// app/(tabs)/not-found.tsx
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Box } from '~/components/ui/box';
import { VStack } from '~/components/ui/vstack';
import { Text } from '~/components/ui/text';
import { Button, ButtonText } from '~/components/ui/button';
import { useRouter } from 'expo-router';

const NotFoundScreen = () => {
  const router = useRouter();

  const handleGoHome = () => router.replace('/(tabs)/home');
  const handleGoBack = () => router.back();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Box className="flex-1 bg-background-0 p-6 justify-center items-center">
        <VStack space="6" className="items-center">
          {/* 404 Code */}
          <Text size="9xl" className="text-primary-600 font-bold">
            404
          </Text>

          {/* Message */}
          <VStack space="2" className="items-center">
            <Text size="2xl" className="font-bold text-typography-800 text-center">
              Page Not Found
            </Text>
            <Text size="md" className="text-center text-typography-600 max-w-xs">
              Sorry, we couldn’t find the page you’re looking for.
            </Text>
          </VStack>

          {/* Action Buttons */}
          <VStack space="3" className="w-full max-w-xs mt-4">
            <Button size="lg" variant="solid" action="primary" onPress={handleGoHome}>
              <ButtonText>🏠 Go Home</ButtonText>
            </Button>
            <Button size="lg" variant="outline" action="secondary" onPress={handleGoBack}>
              <ButtonText>← Go Back</ButtonText>
            </Button>
          </VStack>
        </VStack>
      </Box>
    </SafeAreaView>
  );
};

export default NotFoundScreen;

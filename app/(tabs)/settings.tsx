// app/(tabs)/settings.tsx
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Box } from '~/components/ui/box';
import { VStack } from '~/components/ui/vstack';
import { Heading } from '~/components/ui/heading';
import { Text } from '~/components/ui/text';
import { Button, ButtonText } from '~/components/ui/button';
import { useUI } from '@providers/UIProvider';
import { HStack } from '~/components/ui/hstack';

const Settings = () => {
  const { mode, toggleTheme } = useUI();

  return (
    <SafeAreaView className="flex-1 bg-background-0 p-6 justify-center">
      <VStack space="8">
        <Heading size="2xl" className="text-primary-700 text-center">
          Settings
        </Heading>

        {/* Theme Toggle Card */}
        <Box className="bg-background-100 rounded-xl p-6 shadow-lg border border-background-200">
          <VStack space="4" className="items-center">
            <Text size="lg" className="text-typography-700 text-center">
              Theme Mode
            </Text>
            <Button
              size="lg"
              variant="solid"
              action="primary"
              onPress={toggleTheme}
              className="rounded-full px-6  shadow-md">
              <ButtonText className="text-white text-center text-lg">
                {mode === 'light' ? 'Switch to Dark Mode 🌙' : 'Switch to Light Mode ☀️'}
              </ButtonText>
            </Button>
          </VStack>
        </Box>

        {/* Coming Soon Section */}
        <Box className="mt-4 p-6 bg-background-100 rounded-xl border border-background-200 shadow-md">
          <HStack space="3" className="items-center">
            <Text size="2xl">🚀</Text>
            <Text size="md" className="text-typography-600 flex-1">
              More features coming soon! Stay tuned for updates.
            </Text>
          </HStack>
        </Box>
      </VStack>
    </SafeAreaView>
  );
};

export default Settings;

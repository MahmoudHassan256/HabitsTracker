import React from 'react';
import { Slot, Stack } from 'expo-router';
import { AuthProvider } from '@providers/AuthProvider';
import { UIProvider, useUI } from '@providers/UIProvider';

import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import '@/global.css';
import { Pressable } from '~/components/ui/pressable';
import { Text } from '~/components/ui/text';
import { Box } from '~/components/ui/box';

function FloatingThemeButton() {
  const { mode, toggleTheme } = useUI();

  return (
    <Box
      className="absolute bottom-8 right-8 rounded-full bg-primary-600 p-4 shadow-lg"
      style={{ elevation: 10 }} // for Android shadow
    >
      <Pressable onPress={toggleTheme}>
        <Text size="xl" className="text-white">
          {mode === 'light' ? '🌙' : '☀️'}
        </Text>
      </Pressable>
    </Box>
  );
}

export default function RootLayout() {
  return (
    <UIProvider>
      <AuthProvider>
        <Slot />
        <FloatingThemeButton />
      </AuthProvider>
    </UIProvider>
  );
}

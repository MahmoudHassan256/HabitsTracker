import React from 'react';
import { Slot, Stack } from 'expo-router';
import { AuthProvider } from '@providers/AuthProvider';
import { UIProvider, useUI } from '@providers/UIProvider';

import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import '@/global.css';
import { Pressable } from '~/components/ui/pressable';
import { Text } from '~/components/ui/text';
import { Box } from '~/components/ui/box';

export default function RootLayout() {
  return (
    <UIProvider>
      <AuthProvider>
        <Slot />
      </AuthProvider>
    </UIProvider>
  );
}

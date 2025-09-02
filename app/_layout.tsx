import React from 'react';
import { Slot, Stack } from 'expo-router';
import { AuthProvider } from '@providers/AuthProvider';
import { UIProvider } from '@providers/UIProvider';

export default function RootLayout() {
  return (
    <UIProvider>
      <AuthProvider>
        <Slot />
      </AuthProvider>
    </UIProvider>
  );
}

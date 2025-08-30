import React from 'react';
import { TamaguiProvider } from 'tamagui';
import { Slot, Stack } from 'expo-router';
import config from '../tamagui.config';
import { AuthProvider } from '../context/AuthContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <TamaguiProvider config={config}>
        <Slot screenOptions={{ headerShown: false }} />
      </TamaguiProvider>
    </AuthProvider>
  );
}

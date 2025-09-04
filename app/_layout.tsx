import { Slot } from 'expo-router';
import { AuthProvider, useAuth } from '@providers/AuthProvider';
import { UIProvider } from '@providers/UIProvider';
import '@/global.css';

export default function RootLayout() {
  return (
    <UIProvider>
      <AuthProvider>
        <Slot />
      </AuthProvider>
    </UIProvider>
  );
}

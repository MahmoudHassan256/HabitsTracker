import React, { useEffect } from 'react';
import { Stack, useRouter } from 'expo-router';
import { useAuth } from '~/providers/AuthProvider';
import LoadingScreen from '~/components/LoadingScreen';

export default function AuthLayout() {
  const { user, loading } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!loading && user) {
      router.replace('/(tabs)/home');
    }
  }, [user, loading]);
  if (loading) return <LoadingScreen />;
  return <Stack screenOptions={{ headerShown: false }} />;
}

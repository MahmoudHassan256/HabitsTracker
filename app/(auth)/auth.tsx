import { Redirect } from 'expo-router';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { YStack, Text, Input, Button, Separator } from 'tamagui';
import { useAuth } from '~/context/AuthContext';
import { account } from '~/lib/appwrite';

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { session, signin, register } = useAuth();

  if (session) return <Redirect href={'/(tabs)/home'} />;

  const handleSubmit = async () => {
    if (!email || !password || (isSignUp && !name)) {
      Alert.alert('Missing Fields', 'Please fill out all fields.');
      return;
    }

    try {
      if (isSignUp) {
        await account.create('unique()', email, password, name);
        await register({ name, email, password });
        Alert.alert('Success', 'Account created and signed in!');
      } else {
        await signin({ email, password });
        Alert.alert('Welcome Back', 'You have signed in successfully!');
      }
    } catch (error: any) {
      console.log('Auth error:', error);
      Alert.alert('Authentication Error', error?.message || 'Something went wrong');
    }
  };
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <YStack flex={1} justifyContent="center" padding="$4" backgroundColor="$background">
        <Text fontSize="$8" fontWeight="800" marginBottom="$5" textAlign="center">
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </Text>

        {isSignUp && (
          <Input
            placeholder="Name"
            value={name}
            onChangeText={setName}
            marginBottom="$3"
            borderRadius="$3"
          />
        )}

        <Input
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          marginBottom="$3"
          borderRadius="$3"
        />
        <Input
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          marginBottom="$4"
          borderRadius="$3"
        />

        <Button onPress={handleSubmit} borderRadius="$3">
          <Text color="$white" fontWeight="700" fontSize="$5">
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </Text>
        </Button>

        <Separator marginVertical="$4" />

        <Button onPress={() => setIsSignUp(!isSignUp)} backgroundColor="transparent" elevation={0}>
          <Text color="$blue10" fontSize="$5" textAlign="center">
            {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
          </Text>
        </Button>
      </YStack>
    </KeyboardAvoidingView>
  );
};

export default Auth;

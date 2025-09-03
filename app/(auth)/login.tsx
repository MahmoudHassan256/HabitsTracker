import React, { useEffect, useState } from 'react';
import { Platform, KeyboardAvoidingView, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Box } from '~/components/ui/box';
import { Card } from '~/components/ui/card';
import { Heading } from '~/components/ui/heading';
import { Text } from '~/components/ui/text';
import { Input, InputField } from '~/components/ui/input';
import { Button, ButtonText } from '~/components/ui/button';
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  FormControlError,
  FormControlErrorText,
} from '~/components/ui/form-control';
import { Divider } from '~/components/ui/divider';
import { Pressable } from '~/components/ui/pressable';
import { Link, LinkText } from '~/components/ui/link';
import { VStack } from '~/components/ui/vstack';
import { HStack } from '~/components/ui/hstack';
import { useRouter } from 'expo-router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/(tabs)/home');
    }, 2000);

    return () => clearTimeout(timer); // cleanup
  }, []);

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const navigateToRegister = () => {
    router.replace('/(auth)/register');
  };

  const handleLogin = async () => {
    setIsLoading(true);

    setEmailError('');
    setPasswordError('');
    let isValid = true;

    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email');
      isValid = false;
    }

    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    }

    if (!isValid) return;

    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log('Logging In:', { email, password });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }} className="bg-background-0">
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Box className="flex-1 justify-center p-6 bg-background-0">
            <VStack className="items-center space-6">
              {/* Header */}
              <Box className="items-center mb-8">
                <Heading size="3xl" className="text-primary-600 text-center">
                  Welcome Back
                </Heading>
                <Text size="md" className="text-primary-600 text-center">
                  Sign in to your account
                </Text>
              </Box>

              {/* Login Card */}
              <Card size="lg" variant="elevated" className="w-full max-w-md">
                <VStack className="space-4 px-6 gap-6">
                  {/* Email */}
                  <FormControl isInvalid={!!emailError}>
                    <FormControlLabel>
                      <FormControlLabelText>Email</FormControlLabelText>
                    </FormControlLabel>
                    <Input variant="outline" size="lg">
                      <InputField
                        placeholder="Enter your email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        returnKeyType="next"
                      />
                    </Input>
                    <FormControlError>
                      <FormControlErrorText>{emailError}</FormControlErrorText>
                    </FormControlError>
                  </FormControl>

                  {/* Password */}
                  <FormControl isInvalid={!!passwordError}>
                    <FormControlLabel>
                      <FormControlLabelText>Password</FormControlLabelText>
                    </FormControlLabel>
                    <Input variant="outline" size="lg">
                      <InputField
                        placeholder="Enter your password"
                        value={password}
                        secureTextEntry
                        onChangeText={setPassword}
                        returnKeyType="done"
                        onSubmitEditing={handleLogin}
                      />
                    </Input>
                    <FormControlError>
                      <FormControlErrorText>{passwordError}</FormControlErrorText>
                    </FormControlError>
                  </FormControl>

                  <Divider className="flex-1" />

                  {/* Login Button */}
                  <Button
                    size="lg"
                    variant="solid"
                    action="primary"
                    isDisabled={isLoading}
                    onPress={handleLogin}>
                    <ButtonText>{isLoading ? 'Signing In...' : 'Sign In'}</ButtonText>
                  </Button>
                </VStack>
              </Card>

              {/* Sign Up */}
              <HStack space="2" className="mt-6 justify-center">
                <Text size="sm" className="text-primary-700">
                  Don't have an account?
                </Text>
                <Pressable>
                  <Link onPress={navigateToRegister}>
                    <LinkText size="sm" className="text-primary-700 font-medium">
                      Sign Up
                    </LinkText>
                  </Link>
                </Pressable>
              </HStack>
            </VStack>
          </Box>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

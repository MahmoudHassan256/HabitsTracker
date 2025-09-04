import React, { useState } from 'react';
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
import { Link, LinkText } from '~/components/ui/link';
import { VStack } from '~/components/ui/vstack';
import { HStack } from '~/components/ui/hstack';
import { useRouter } from 'expo-router';
import { register } from '~/features/auth/services/auth';
import { useAuth } from '~/providers/AuthProvider';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { refresh } = useAuth();

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const navigateToLogin = () => router.replace('/(auth)/login');

  const handleRegister = async () => {
    setNameError('');
    setEmailError('');
    setPasswordError('');

    let isValid = true;
    if (!name) {
      setNameError('Name is required');
      isValid = false;
    }
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
    } else if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      isValid = false;
    }

    if (!isValid) return;

    setIsLoading(true);
    try {
      await register(name, email, password);
      await refresh();
      router.replace('/(tabs)/home');
    } catch (err: any) {
      console.log('Register failed:', err);
      setPasswordError(err.message || 'Something went wrong, please try again');
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
                  Create Account
                </Heading>
                <Text size="md" className="text-typography-600 text-center">
                  Sign up to get started
                </Text>
              </Box>

              {/* Register Card */}
              <Card size="lg" variant="elevated" className="w-full max-w-md">
                <VStack className="space-4 px-6 gap-6">
                  {/* Name */}
                  <FormControl isInvalid={!!nameError}>
                    <FormControlLabel>
                      <FormControlLabelText>Name</FormControlLabelText>
                    </FormControlLabel>
                    <Input variant="outline" size="lg">
                      <InputField
                        placeholder="Enter your name"
                        value={name}
                        onChangeText={setName}
                        returnKeyType="next"
                      />
                    </Input>
                    <FormControlError>
                      <FormControlErrorText>{nameError}</FormControlErrorText>
                    </FormControlError>
                  </FormControl>

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
                        onSubmitEditing={handleRegister}
                      />
                    </Input>
                    <FormControlError>
                      <FormControlErrorText>{passwordError}</FormControlErrorText>
                    </FormControlError>
                  </FormControl>

                  <Divider className="flex-1" />

                  {/* Register Button */}
                  <Button
                    size="lg"
                    variant="solid"
                    action="primary"
                    isDisabled={isLoading}
                    onPress={handleRegister}>
                    <ButtonText>{isLoading ? 'Signing Up...' : 'Sign Up'}</ButtonText>
                  </Button>
                </VStack>
              </Card>

              {/* Navigate to Login */}
              <HStack space="2" className="mt-6 justify-center">
                <Text size="sm" className="text-primary-700">
                  Already have an account?
                </Text>
                <Link onPress={navigateToLogin}>
                  <LinkText size="sm" className="text-primary-700 font-medium">
                    Sign In
                  </LinkText>
                </Link>
              </HStack>
            </VStack>
          </Box>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

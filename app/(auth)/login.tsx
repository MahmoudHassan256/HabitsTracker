import React, { useState } from 'react';
import { Text, View } from 'react-native';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Logging in with:', email, password);
  };

  return (
    <View>
      <Text>Tamagui can optimize this to div + span or View + Text on React Native.</Text>
    </View>
  );
}

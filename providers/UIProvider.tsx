import React from 'react';
import { View } from 'react-native';

export function UIProvider({ children }: { children: React.ReactNode }) {
  return <View>{children}</View>;
}

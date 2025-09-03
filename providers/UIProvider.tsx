import React, { createContext, useContext, useState } from 'react';
import { GluestackUIProvider, ModeType } from '@components/ui/gluestack-ui-provider';

type UIContextType = {
  mode: 'light' | 'dark';
  toggleTheme: () => void;
};

const UIContext = createContext<UIContextType>({
  mode: 'light',
  toggleTheme: () => {},
});

export const useUI = () => useContext(UIContext);

export function UIProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => setMode((prev) => (prev === 'light' ? 'dark' : 'light'));

  return (
    <UIContext.Provider value={{ mode, toggleTheme }}>
      <GluestackUIProvider mode={mode}>{children}</GluestackUIProvider>
    </UIContext.Provider>
  );
}

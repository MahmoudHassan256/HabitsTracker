import React from 'react';
import { Box } from './ui/box';
import { Spinner } from './ui/spinner';
import { Text } from './ui/text';

export default function LoadingScreen() {
  return (
    <Box className="flex-1 justify-center items-center bg-background-0">
      <Spinner />
      <Text>Loading...</Text>
    </Box>
  );
}

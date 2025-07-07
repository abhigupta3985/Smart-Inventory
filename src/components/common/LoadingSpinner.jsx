// Loading spinner component
import React from 'react';
import { Spinner, Center, Text, VStack } from '@chakra-ui/react';

const LoadingSpinner = ({ text = 'Loading...' }) => {
  return (
    <Center h="200px">
      <VStack>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
        <Text color="gray.500">{text}</Text>
      </VStack>
    </Center>
  );
};

export default LoadingSpinner;
// Login page footer component
import React from 'react';
import {
  Box,
  Container,
  Text,
  HStack,
  Link,
  useColorModeValue
} from '@chakra-ui/react';

const LoginFooter = () => {
  const bg = useColorModeValue('gray.50', 'gray.900');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.400');

  return (
    <Box bg={bg} borderTop="1px" borderColor={borderColor} py="4">
      <Container maxW="container.xl">
        <HStack
          justify="space-between"
          align="center"
          direction={{ base: 'column', md: 'row' }}
          spacing="4"
        >
          <Text fontSize="sm" color={textColor}>
            © {new Date().getFullYear()} SmartInventory. All rights reserved.
          </Text>
          
          <HStack spacing="6">
            <Link
              href="#privacy"
              fontSize="sm"
              color={textColor}
              _hover={{ color: 'blue.500' }}
            >
              Privacy Policy
            </Link>
            <Link
              href="#terms"
              fontSize="sm"
              color={textColor}
              _hover={{ color: 'blue.500' }}
            >
              Terms of Service
            </Link>
            <Link
              href="#help"
              fontSize="sm"
              color={textColor}
              _hover={{ color: 'blue.500' }}
            >
              Help Center
            </Link>
          </HStack>
        </HStack>
      </Container>
    </Box>
  );
};

export default LoginFooter;
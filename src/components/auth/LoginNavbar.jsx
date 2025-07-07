// Login page navbar component
import React from 'react';
import {
  Box,
  Flex,
  Text,
  IconButton,
  useColorMode,
  useColorModeValue,
  Container,
  Button,
  HStack
} from '@chakra-ui/react';
import { FiSun, FiMoon, FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const LoginNavbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();
  
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box
      bg={bg}
      borderBottom="1px"
      borderColor={borderColor}
      position="sticky"
      top="0"
      zIndex="1000"
    >
      <Container maxW="container.xl">
        <Flex h="16" alignItems="center" justifyContent="space-between">
          {/* Logo */}
          <Text
            fontSize="xl"
            fontWeight="bold"
            color="blue.500"
            cursor="pointer"
            onClick={() => navigate('/')}
          >
            SmartInventory
          </Text>

          {/* Right side buttons */}
          <HStack spacing="2">
            <Button
              variant="ghost"
              leftIcon={<FiArrowLeft />}
              onClick={() => navigate('/')}
              size="sm"
            >
              Back to Home
            </Button>
            
            <IconButton
              size="md"
              variant="ghost"
              aria-label="Toggle color mode"
              icon={colorMode === 'light' ? <FiMoon /> : <FiSun />}
              onClick={toggleColorMode}
            />
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default LoginNavbar;
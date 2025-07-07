// Login page illustration component
import React from 'react';
import {
  Box,
  VStack,
  Heading,
  Text,
  useColorModeValue,
  Icon,
  SimpleGrid,
  HStack
} from '@chakra-ui/react';
import { FiPackage, FiBarChart, FiUsers, FiShield, FiTrendingUp, FiCheckCircle } from 'react-icons/fi';

const LoginIllustration = () => {
  const bgGradient = useColorModeValue(
    'linear(to-br, blue.50, blue.100)',
    'linear(to-br, blue.900, blue.800)'
  );
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const iconBg = useColorModeValue('white', 'gray.700');

  const features = [
    { icon: FiPackage, label: 'Smart Inventory' },
    { icon: FiBarChart, label: 'Analytics' },
    { icon: FiUsers, label: 'Team Collaboration' },
    { icon: FiShield, label: 'Secure & Reliable' }
  ];

  const stats = [
    { value: '10K+', label: 'Items Tracked' },
    { value: '99.9%', label: 'Uptime' },
    { value: '500+', label: 'Happy Users' }
  ];

  return (
    <Box
      bgGradient={bgGradient}
      h="full"
      p="8"
      display="flex"
      alignItems="center"
      justifyContent="center"
      position="relative"
      overflow="hidden"
    >
      {/* Background Pattern */}
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        opacity={0.1}
        bgImage="radial-gradient(circle at 25px 25px, blue.500 2px, transparent 0)"
        bgSize="50px 50px"
      />

      <VStack spacing="8" maxW="md" textAlign="center" position="relative" zIndex="1">
        {/* Logo and Welcome */}
        <VStack spacing="4">
          <Box
            p="4"
            bg="blue.500"
            borderRadius="xl"
            boxShadow="xl"
            transform="rotate(-5deg)"
            _hover={{ transform: 'rotate(0deg)' }}
            transition="transform 0.3s ease"
          >
            <Icon as={FiPackage} boxSize="8" color="white" />
          </Box>
          
          <VStack spacing="2">
            <Heading size="xl" color="blue.600">
              Welcome Back!
            </Heading>
            <Text fontSize="lg" color={textColor} maxW="sm">
              Your smart way to manage inventory efficiently. 
              Track, analyze, and optimize your stock with ease.
            </Text>
          </VStack>
        </VStack>

        {/* Feature Icons */}
        <SimpleGrid columns={2} spacing="4" w="full">
          {features.map((feature, index) => (
            <VStack
              key={index}
              p="4"
              bg={iconBg}
              borderRadius="lg"
              boxShadow="md"
              spacing="2"
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'lg'
              }}
              transition="all 0.2s"
            >
              <Icon as={feature.icon} boxSize="6" color="blue.500" />
              <Text fontSize="sm" fontWeight="medium">
                {feature.label}
              </Text>
            </VStack>
          ))}
        </SimpleGrid>

        {/* Stats */}
        <HStack spacing="8" justify="center">
          {stats.map((stat, index) => (
            <VStack key={index} spacing="1">
              <Text fontSize="2xl" fontWeight="bold" color="blue.600">
                {stat.value}
              </Text>
              <Text fontSize="xs" color={textColor}>
                {stat.label}
              </Text>
            </VStack>
          ))}
        </HStack>

        {/* Trust Indicators */}
        <VStack spacing="3">
          <HStack spacing="2" color="green.500">
            <Icon as={FiCheckCircle} />
            <Text fontSize="sm" color={textColor}>
              Trusted by 500+ businesses worldwide
            </Text>
          </HStack>
          <HStack spacing="2" color="green.500">
            <Icon as={FiShield} />
            <Text fontSize="sm" color={textColor}>
              Enterprise-grade security & privacy
            </Text>
          </HStack>
          <HStack spacing="2" color="green.500">
            <Icon as={FiTrendingUp} />
            <Text fontSize="sm" color={textColor}>
              Boost efficiency by up to 40%
            </Text>
          </HStack>
        </VStack>
      </VStack>
    </Box>
  );
};

export default LoginIllustration;
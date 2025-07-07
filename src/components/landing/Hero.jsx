// Hero section component for landing page
import React from 'react';
import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Container,
  useColorModeValue,
  Image,
  SimpleGrid,
  Icon
} from '@chakra-ui/react';
import { FiArrowRight, FiPackage, FiBarChart, FiAlertTriangle, FiUsers } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();
  const bgGradient = useColorModeValue(
    'linear(to-r, blue.400, blue.600)',
    'linear(to-r, blue.600, blue.800)'
  );
  const textColor = useColorModeValue('gray.600', 'gray.300');

  const features = [
    {
      icon: FiPackage,
      title: 'Smart Inventory',
      description: 'Complete CRUD operations with advanced search and categorization'
    },
    {
      icon: FiAlertTriangle,
      title: 'Stock Alerts',
      description: 'Real-time notifications for low stock and expiry warnings'
    },
    {
      icon: FiBarChart,
      title: 'Analytics & Reports',
      description: 'Visual charts and insights for better decision making'
    },
    {
      icon: FiUsers,
      title: 'Team Collaboration',
      description: 'Role-based access and task assignment for your team'
    }
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        bgGradient={bgGradient}
        color="white"
        py={{ base: 20, md: 28 }}
        position="relative"
        overflow="hidden"
      >
        <Container maxW="container.xl">
          <VStack spacing="8" textAlign="center">
            <Heading
              fontSize={{ base: '4xl', md: '6xl' }}
              fontWeight="bold"
              lineHeight="shorter"
            >
              Smart Inventory
              <Text as="span" color="blue.200" display="block">
                Management System
              </Text>
            </Heading>
            
            <Text
              fontSize={{ base: 'lg', md: 'xl' }}
              maxW="2xl"
              opacity={0.9}
            >
              Streamline your inventory operations with real-time tracking, 
              automated alerts, and powerful analytics. Perfect for businesses 
              of all sizes.
            </Text>

            <HStack spacing="4">
              <Button
                size="lg"
                colorScheme="white"
                variant="solid"
                color="blue.600"
                rightIcon={<FiArrowRight />}
                onClick={() => navigate('/login')}
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: 'xl'
                }}
                transition="all 0.2s"
              >
                Get Started
              </Button>
              <Button
                size="lg"
                variant="outline"
                color="white"
                borderColor="white"
                _hover={{
                  bg: 'whiteAlpha.200'
                }}
              >
                Learn More
              </Button>
            </HStack>
          </VStack>
        </Container>
      </Box>

      {/* Features Section */}
      <Box py={{ base: 16, md: 20 }}>
        <Container maxW="container.xl">
          <VStack spacing="12">
            <VStack spacing="4" textAlign="center">
              <Heading size="xl">
                Everything you need to manage inventory
              </Heading>
              <Text fontSize="lg" color={textColor} maxW="2xl">
                From basic stock tracking to advanced analytics, SmartInventory 
                provides all the tools your business needs to stay organized and efficient.
              </Text>
            </VStack>

            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing="8">
              {features.map((feature, index) => (
                <VStack
                  key={index}
                  spacing="4"
                  p="6"
                  bg={useColorModeValue('white', 'gray.800')}
                  borderRadius="lg"
                  boxShadow="md"
                  textAlign="center"
                  _hover={{
                    transform: 'translateY(-4px)',
                    boxShadow: 'xl'
                  }}
                  transition="all 0.2s"
                >
                  <Icon
                    as={feature.icon}
                    boxSize="12"
                    color="blue.500"
                  />
                  <Heading size="md">{feature.title}</Heading>
                  <Text color={textColor} fontSize="sm">
                    {feature.description}
                  </Text>
                </VStack>
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        bg={useColorModeValue('gray.50', 'gray.900')}
        py={{ base: 16, md: 20 }}
      >
        <Container maxW="container.xl">
          <VStack spacing="8" textAlign="center">
            <VStack spacing="4">
              <Heading size="xl">
                Ready to transform your inventory management?
              </Heading>
              <Text fontSize="lg" color={textColor}>
                Join thousands of businesses already using SmartInventory
              </Text>
            </VStack>
            
            <Button
              size="lg"
              colorScheme="blue"
              rightIcon={<FiArrowRight />}
              onClick={() => navigate('/login')}
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'xl'
              }}
              transition="all 0.2s"
            >
              Start Your Free Trial
            </Button>
          </VStack>
        </Container>
      </Box>
    </Box>
  );
};

export default Hero;
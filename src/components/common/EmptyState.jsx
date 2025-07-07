// Creative empty state component
import React from 'react';
import {
  Box,
  VStack,
  Text,
  Button,
  Icon,
  useColorModeValue,
  Heading,
  Circle,
  HStack
} from '@chakra-ui/react';
import { FiPackage, FiPlus, FiZap } from 'react-icons/fi';

const EmptyState = ({ 
  icon = FiPackage,
  title = "No items found",
  description = "Get started by adding your first item",
  actionLabel = "Add Item",
  onAction,
  showAction = true,
  emoji = "📦"
}) => {
  const bgColor = useColorModeValue('gray.50', 'gray.700');
  const iconColor = useColorModeValue('gray.400', 'gray.500');

  return (
    <Box
      textAlign="center"
      py="20"
      px="8"
      bgGradient={useColorModeValue(
        'linear(135deg, gray.50, blue.50, purple.50)',
        'linear(135deg, gray.800, blue.900, purple.900)'
      )}
      borderRadius="3xl"
      border="3px dashed"
      borderColor="gray.300"
      _dark={{ borderColor: 'gray.600' }}
      position="relative"
      overflow="hidden"
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        bgImage: 'radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
      }}
    >
      <VStack spacing="8" position="relative" zIndex={1}>
        {/* Animated Icon */}
        <Box
          position="relative"
          _hover={{
            transform: 'scale(1.1) rotate(5deg)',
          }}
          transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
        >
          <Circle
            size="32"
            bgGradient="linear(135deg, brand.400, purple.500)"
            color="white"
            boxShadow="2xl"
            position="relative"
            _before={{
              content: '""',
              position: 'absolute',
              top: '-4px',
              left: '-4px',
              right: '-4px',
              bottom: '-4px',
              borderRadius: 'full',
              bgGradient: 'linear(135deg, brand.400, purple.500)',
              opacity: 0.3,
              animation: 'pulse 2s infinite',
            }}
          >
            <VStack spacing="1">
              <Text fontSize="4xl">{emoji}</Text>
              <Icon as={icon} boxSize="8" />
            </VStack>
          </Circle>
        </Box>
        
        <VStack spacing="3">
          <Heading size="xl" bgGradient="linear(135deg, gray.700, gray.900)" bgClip="text">
            {title}
          </Heading>
          <Text color="gray.500" maxW="md" fontSize="lg">
            {description}
          </Text>
        </VStack>

        {showAction && onAction && (
          <VStack spacing="4">
            <Button
              leftIcon={<FiPlus />}
              size="lg"
              bgGradient="linear(135deg, brand.500, purple.500)"
              color="white"
              onClick={onAction}
              borderRadius="xl"
              boxShadow="xl"
              px="8"
              py="6"
              h="auto"
              _hover={{
                transform: 'translateY(-3px) scale(1.05)',
                boxShadow: '2xl',
                bgGradient: 'linear(135deg, brand.600, purple.600)',
              }}
              transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
            >
              <VStack spacing="1">
                <HStack spacing="2">
                  <Icon as={FiZap} />
                  <Text fontWeight="bold">{actionLabel}</Text>
                </HStack>
                <Text fontSize="xs" opacity={0.8}>Let's get started!</Text>
              </VStack>
            </Button>
            
            <Text fontSize="sm" color="gray.500" fontStyle="italic">
              ✨ Your inventory journey begins here
            </Text>
          </VStack>
        )}
      </VStack>

      {/* Add CSS for pulse animation */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.1;
            transform: scale(1.05);
          }
        }
      `}</style>
    </Box>
  );
};

export default EmptyState;
// Creative inventory page
import React from 'react';
import {
  Box,
  Heading,
  VStack,
  HStack,
  Text,
  Icon
} from '@chakra-ui/react';
import { FiPackage } from 'react-icons/fi';
import { useInventory } from '../hooks/useInventory';
import InventorySearch from '../components/inventory/InventorySearch';
import InventoryList from '../components/inventory/InventoryList';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Inventory = () => {
  const { loading } = useInventory();

  if (loading) {
    return <LoadingSpinner text="Loading your awesome inventory..." />;
  }

  return (
    <Box>
      <VStack spacing="8" align="stretch">
        {/* Creative Header */}
        <Box
          bgGradient="linear(135deg, emerald.500, teal.500)"
          borderRadius="3xl"
          p="8"
          color="white"
          position="relative"
          overflow="hidden"
          _before={{
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bgImage: 'radial-gradient(circle at 75% 25%, rgba(255,255,255,0.2) 0%, transparent 50%)',
          }}
        >
          <HStack spacing="4" position="relative" zIndex={1}>
            <Text fontSize="4xl">📦</Text>
            <VStack align="start" spacing="1">
              <Heading 
                size="2xl" 
                fontWeight="black"
                textShadow="2px 2px 4px rgba(0,0,0,0.3)"
              >
                Inventory Management
              </Heading>
              <Text fontSize="lg" opacity={0.9}>
                Manage your stock like a pro! ✨
              </Text>
            </VStack>
          </HStack>
        </Box>
        
        <InventorySearch />
        
        <InventoryList />
      </VStack>
    </Box>
  );
};

export default Inventory;
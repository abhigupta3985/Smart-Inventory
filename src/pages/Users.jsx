// Users management page
import React from 'react';
import {
  Box,
  Heading,
  VStack,
  Text,
  HStack
} from '@chakra-ui/react';
import EmptyState from '../components/common/EmptyState';
import { FiUsers } from 'react-icons/fi';

const Users = () => {
  return (
    <Box>
      <VStack spacing="8" align="stretch">
        {/* Creative Header */}
        <Box
          bgGradient="linear(135deg, teal.500, emerald.500)"
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
            <Text fontSize="4xl">👥</Text>
            <VStack align="start" spacing="1">
              <Heading 
                size="2xl" 
                fontWeight="black"
                textShadow="2px 2px 4px rgba(0,0,0,0.3)"
              >
                User Management
              </Heading>
              <Text fontSize="lg" opacity={0.9}>
                Manage team members and permissions! 🔐
              </Text>
            </VStack>
          </HStack>
        </Box>
        
        <EmptyState
          icon={FiUsers}
          title="User Management Coming Soon"
          description="This feature will allow you to manage team members, roles, and permissions"
          emoji="👥"
          showAction={false}
        />
      </VStack>
    </Box>
  );
};

export default Users;
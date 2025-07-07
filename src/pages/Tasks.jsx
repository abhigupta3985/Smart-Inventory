// Creative tasks page
import React from 'react';
import {
  Box,
  Heading,
  VStack,
  Text,
  SimpleGrid,
  Card,
  CardBody,
  Badge,
  HStack,
  Button,
  useColorModeValue,
  Icon
} from '@chakra-ui/react';
import { FiCheck, FiClock, FiUser, FiZap, FiClipboard } from 'react-icons/fi';
import { useSelector, useDispatch } from 'react-redux';
import { updateTaskStatus } from '../store/tasksSlice';
import { formatDate } from '../utils/helpers';
import EmptyState from '../components/common/EmptyState';

const Tasks = () => {
  const dispatch = useDispatch();
  const { tasks } = useSelector(state => state.tasks);
  const { user } = useSelector(state => state.auth);

  const handleTaskStatusUpdate = (taskId, newStatus) => {
    dispatch(updateTaskStatus({ id: taskId, status: newStatus }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'yellow';
      case 'in_progress':
        return 'blue';
      case 'completed':
        return 'emerald';
      default:
        return 'gray';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return FiClock;
      case 'in_progress':
        return FiUser;
      case 'completed':
        return FiCheck;
      default:
        return FiClock;
    }
  };

  const getStatusEmoji = (status) => {
    switch (status) {
      case 'pending':
        return '⏳';
      case 'in_progress':
        return '🔄';
      case 'completed':
        return '✅';
      default:
        return '⏳';
    }
  };

  return (
    <Box>
      <VStack spacing="8" align="stretch">
        {/* Creative Header */}
        <Box
          bgGradient="linear(135deg, purple.500, indigo.500)"
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
            <Text fontSize="4xl">📋</Text>
            <VStack align="start" spacing="1">
              <Heading 
                size="2xl" 
                fontWeight="black"
                textShadow="2px 2px 4px rgba(0,0,0,0.3)"
              >
                Tasks & Assignments
              </Heading>
              <Text fontSize="lg" opacity={0.9}>
                Get things done efficiently! ⚡
              </Text>
            </VStack>
          </HStack>
        </Box>
        
        {!tasks || tasks.length === 0 ? (
          <EmptyState
            icon={FiClipboard}
            title="No tasks assigned yet"
            description="Tasks will appear here when they're assigned to you"
            actionLabel="Refresh Tasks"
            emoji="📋"
            showAction={false}
          />
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing="6">
            {tasks.map((task, index) => {
              const StatusIcon = getStatusIcon(task.status);
              const statusColor = getStatusColor(task.status);
              
              return (
                <Card
                  key={task.id}
                  variant="elevated"
                  _hover={{
                    transform: 'translateY(-4px) scale(1.02)',
                    boxShadow: '2xl',
                  }}
                  transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    animation: 'slideInUp 0.6s ease-out forwards',
                  }}
                >
                  <CardBody>
                    <VStack spacing="4" align="stretch">
                      <HStack justify="space-between">
                        <Badge
                          colorScheme={statusColor}
                          variant="subtle"
                          px="3"
                          py="1"
                          borderRadius="full"
                          fontWeight="bold"
                          border="2px solid"
                          borderColor={`${statusColor}.200`}
                        >
                          <HStack spacing="2">
                            <Text>{getStatusEmoji(task.status)}</Text>
                            <Text textTransform="capitalize">{task.status.replace('_', ' ')}</Text>
                          </HStack>
                        </Badge>
                        <Badge
                          variant="outline"
                          colorScheme="gray"
                          borderRadius="full"
                          textTransform="capitalize"
                        >
                          {task.type}
                        </Badge>
                      </HStack>
                      
                      <VStack align="start" spacing="2">
                        <Heading size="md" color="gray.700" _dark={{ color: 'gray.200' }}>
                          {task.title}
                        </Heading>
                        
                        <Text fontSize="sm" color="gray.600" _dark={{ color: 'gray.400' }}>
                          {task.description}
                        </Text>
                        
                        {task.itemName && (
                          <HStack spacing="2">
                            <Text fontSize="sm" fontWeight="bold">📦 Item:</Text>
                            <Text fontSize="sm" color="brand.500">{task.itemName}</Text>
                          </HStack>
                        )}
                        
                        <Text fontSize="xs" color="gray.500">
                          🕒 Created: {formatDate(task.createdAt)}
                        </Text>
                      </VStack>
                      
                      {task.status === 'pending' && (
                        <HStack spacing="2">
                          <Button
                            size="sm"
                            colorScheme="blue"
                            onClick={() => handleTaskStatusUpdate(task.id, 'in_progress')}
                            borderRadius="lg"
                            leftIcon={<Icon as={FiZap} />}
                            _hover={{
                              transform: 'scale(1.05)',
                            }}
                          >
                            Start
                          </Button>
                          <Button
                            size="sm"
                            colorScheme="emerald"
                            onClick={() => handleTaskStatusUpdate(task.id, 'completed')}
                            borderRadius="lg"
                            leftIcon={<Icon as={FiCheck} />}
                            _hover={{
                              transform: 'scale(1.05)',
                            }}
                          >
                            Complete
                          </Button>
                        </HStack>
                      )}
                      
                      {task.status === 'in_progress' && (
                        <Button
                          size="sm"
                          colorScheme="emerald"
                          onClick={() => handleTaskStatusUpdate(task.id, 'completed')}
                          borderRadius="lg"
                          leftIcon={<Icon as={FiCheck} />}
                          _hover={{
                            transform: 'scale(1.05)',
                          }}
                        >
                          Complete Task
                        </Button>
                      )}
                    </VStack>
                  </CardBody>
                </Card>
              );
            })}
          </SimpleGrid>
        )}
      </VStack>

      {/* Add CSS animations */}
      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </Box>
  );
};

export default Tasks;
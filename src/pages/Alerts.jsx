// Creative alerts page
import React from 'react';
import {
  Box,
  Heading,
  VStack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Badge,
  HStack,
  Text
} from '@chakra-ui/react';
import { useNotifications } from '../hooks/useNotifications';
import StockAlerts from '../components/alerts/StockAlerts';
import { ALERT_TYPES } from '../utils/constants';

const Alerts = () => {
  const { alerts } = useNotifications();

  const stockAlerts = alerts.filter(alert => 
    alert.type === ALERT_TYPES.LOW_STOCK || 
    alert.type === ALERT_TYPES.EXPIRY_WARNING ||
    alert.type === ALERT_TYPES.EXPIRED
  );

  const taskAlerts = alerts.filter(alert => 
    alert.type === ALERT_TYPES.TASK_ASSIGNED
  );

  return (
    <Box>
      <VStack spacing="8" align="stretch">
        {/* Creative Header */}
        <Box
          bgGradient="linear(135deg, orange.500, red.500)"
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
            <Text fontSize="4xl">🔔</Text>
            <VStack align="start" spacing="1">
              <Heading 
                size="2xl" 
                fontWeight="black"
                textShadow="2px 2px 4px rgba(0,0,0,0.3)"
              >
                Alerts & Notifications
              </Heading>
              <Text fontSize="lg" opacity={0.9}>
                Stay on top of your inventory! 🚨
              </Text>
            </VStack>
          </HStack>
        </Box>
        
        <Tabs variant="soft-rounded" colorScheme="brand">
          <TabList bg="white" p="2" borderRadius="xl" boxShadow="lg" _dark={{ bg: 'gray.800' }}>
            <Tab borderRadius="lg" fontWeight="bold">
              <HStack spacing="2">
                <Text>📦 Stock Alerts</Text>
                {stockAlerts.length > 0 && (
                  <Badge colorScheme="red" borderRadius="full" animation="pulse 2s infinite">
                    {stockAlerts.length}
                  </Badge>
                )}
              </HStack>
            </Tab>
            <Tab borderRadius="lg" fontWeight="bold">
              <HStack spacing="2">
                <Text>📋 Task Alerts</Text>
                {taskAlerts.length > 0 && (
                  <Badge colorScheme="blue" borderRadius="full" animation="pulse 2s infinite">
                    {taskAlerts.length}
                  </Badge>
                )}
              </HStack>
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel px="0">
              <StockAlerts />
            </TabPanel>
            <TabPanel px="0">
              <Box 
                textAlign="center" 
                py="16" 
                bgGradient="linear(135deg, blue.50, purple.50)"
                borderRadius="2xl"
                border="2px dashed"
                borderColor="blue.200"
              >
                <VStack spacing="4">
                  <Text fontSize="4xl">📋</Text>
                  <Heading size="lg" color="gray.600">Task alerts will be displayed here</Heading>
                  <Text color="gray.500">Coming soon! ✨</Text>
                </VStack>
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </Box>
  );
};

export default Alerts;
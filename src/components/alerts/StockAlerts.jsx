// Stock alerts component
import React from 'react';
import {
  Box,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  VStack,
  Badge,
  HStack,
  IconButton,
  Text,
  useColorModeValue
} from '@chakra-ui/react';
import { FiX, FiPackage, FiAlertTriangle } from 'react-icons/fi';
import { useSelector, useDispatch } from 'react-redux';
import { dismissAlert } from '../../store/alertsSlice';
import { ALERT_TYPES } from '../../utils/constants';

const StockAlerts = () => {
  const dispatch = useDispatch();
  const { alerts } = useSelector(state => state.alerts);
  const { items } = useSelector(state => state.inventory);
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  // Filter stock-related alerts
  const stockAlerts = alerts.filter(alert => 
    alert.type === ALERT_TYPES.LOW_STOCK || 
    alert.type === ALERT_TYPES.EXPIRY_WARNING ||
    alert.type === ALERT_TYPES.EXPIRED
  );

  const getAlertIcon = (type) => {
    switch (type) {
      case ALERT_TYPES.LOW_STOCK:
        return FiPackage;
      case ALERT_TYPES.EXPIRY_WARNING:
      case ALERT_TYPES.EXPIRED:
        return FiAlertTriangle;
      default:
        return FiAlertTriangle;
    }
  };

  const getAlertStatus = (type) => {
    switch (type) {
      case ALERT_TYPES.LOW_STOCK:
        return 'warning';
      case ALERT_TYPES.EXPIRY_WARNING:
        return 'warning';
      case ALERT_TYPES.EXPIRED:
        return 'error';
      default:
        return 'info';
    }
  };

  const handleDismiss = (alertId) => {
    dispatch(dismissAlert(alertId));
  };

  if (stockAlerts.length === 0) {
    return (
      <Box
        p="6"
        bg={bgColor}
        borderRadius="lg"
        border="1px"
        borderColor={borderColor}
        textAlign="center"
      >
        <Text color="gray.500">No stock alerts at the moment</Text>
      </Box>
    );
  }

  return (
    <VStack spacing="4" align="stretch">
      {stockAlerts.map((alert) => {
        const AlertIcon = getAlertIcon(alert.type);
        const item = items.find(item => item.id === alert.itemId);
        
        return (
          <Alert
            key={alert.id}
            status={getAlertStatus(alert.type)}
            variant="left-accent"
            borderRadius="md"
            p="4"
          >
            <AlertIcon boxSize="5" />
            <Box flex="1">
              <HStack justify="space-between" align="start">
                <VStack align="start" spacing="1">
                  <HStack>
                    <AlertTitle fontSize="md">{alert.itemName}</AlertTitle>
                    <Badge colorScheme={getAlertStatus(alert.type)}>
                      {alert.type.replace('_', ' ')}
                    </Badge>
                  </HStack>
                  <AlertDescription fontSize="sm">
                    {alert.message}
                  </AlertDescription>
                  {item && (
                    <HStack spacing="4" fontSize="xs" color="gray.600">
                      <Text>Quantity: {item.quantity}</Text>
                      <Text>Category: {item.category}</Text>
                      <Text>Location: {item.location || 'N/A'}</Text>
                    </HStack>
                  )}
                </VStack>
                <IconButton
                  size="sm"
                  variant="ghost"
                  icon={<FiX />}
                  onClick={() => handleDismiss(alert.id)}
                  aria-label="Dismiss alert"
                />
              </HStack>
            </Box>
          </Alert>
        );
      })}
    </VStack>
  );
};

export default StockAlerts;
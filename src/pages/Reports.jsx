// Reports page component
import React from 'react';
import {
  Box,
  Heading,
  VStack
} from '@chakra-ui/react';
import InventoryReports from '../components/reports/InventoryReports';

const Reports = () => {
  return (
    <Box>
      <VStack spacing="6" align="stretch">
        <Heading size="lg">Inventory Reports</Heading>
        
        <InventoryReports />
      </VStack>
    </Box>
  );
};

export default Reports;
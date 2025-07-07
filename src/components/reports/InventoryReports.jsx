// Inventory reports component
import React, { useState, useMemo } from 'react';
import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  useColorModeValue,
  Select,
  HStack,
  Text,
  VStack
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { formatCurrency, formatDate } from '../../utils/helpers';
import StockLevelsChart from './StockLevelsChart';
import CategoryDistributionChart from './CategoryDistributionChart';
import ExpiryTimelineChart from './ExpiryTimelineChart';
import { ITEM_CATEGORIES } from '../../utils/constants';

const InventoryReports = () => {
  const { items } = useSelector(state => state.inventory);
  const [selectedPeriod, setSelectedPeriod] = useState('30'); // days
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  // Calculate key metrics
  const metrics = useMemo(() => {
    const totalItems = items.length;
    const totalValue = items.reduce((sum, item) => sum + (item.quantity * (item.unitPrice || 0)), 0);
    const inStock = items.filter(item => item.quantity > 0).length;
    const outOfStock = items.filter(item => item.quantity === 0).length;
    const lowStock = items.filter(item => item.quantity <= 10 && item.quantity > 0).length;
    const expiringSoon = items.filter(item => {
      const expiryDate = new Date(item.expiryDate);
      const today = new Date();
      const diffDays = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
      return diffDays <= 7 && diffDays > 0;
    }).length;
    
    return {
      totalItems,
      totalValue,
      inStock,
      outOfStock,
      lowStock,
      expiringSoon,
      stockPercentage: totalItems > 0 ? (inStock / totalItems * 100) : 0
    };
  }, [items]);

  // Category distribution
  const categoryData = useMemo(() => {
    return ITEM_CATEGORIES.map(category => ({
      name: category,
      value: items.filter(item => item.category === category).length,
      total: items.filter(item => item.category === category).reduce((sum, item) => sum + item.quantity, 0)
    })).filter(category => category.value > 0);
  }, [items]);

  // Stock levels over time (mock data for demonstration)
  const stockLevelsData = useMemo(() => {
    const days = parseInt(selectedPeriod);
    const data = [];
    
    for (let i = days; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      // Mock data - in real app, this would come from historical data
      data.push({
        date: formatDate(date),
        totalStock: Math.floor(Math.random() * 1000) + 500,
        lowStock: Math.floor(Math.random() * 50) + 10,
        outOfStock: Math.floor(Math.random() * 20) + 5
      });
    }
    
    return data;
  }, [selectedPeriod]);

  return (
    <Box>
      {/* Key Metrics */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing="6" mb="8">
        <Stat
          p="6"
          bg={bgColor}
          borderRadius="lg"
          border="1px"
          borderColor={borderColor}
        >
          <StatLabel>Total Items</StatLabel>
          <StatNumber>{metrics.totalItems}</StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />
            {metrics.stockPercentage.toFixed(1)}% in stock
          </StatHelpText>
        </Stat>

        <Stat
          p="6"
          bg={bgColor}
          borderRadius="lg"
          border="1px"
          borderColor={borderColor}
        >
          <StatLabel>Total Value</StatLabel>
          <StatNumber>{formatCurrency(metrics.totalValue)}</StatNumber>
          <StatHelpText>Current inventory value</StatHelpText>
        </Stat>

        <Stat
          p="6"
          bg={bgColor}
          borderRadius="lg"
          border="1px"
          borderColor={borderColor}
        >
          <StatLabel>Low Stock Alerts</StatLabel>
          <StatNumber color="orange.500">{metrics.lowStock}</StatNumber>
          <StatHelpText>Items below threshold</StatHelpText>
        </Stat>

        <Stat
          p="6"
          bg={bgColor}
          borderRadius="lg"
          border="1px"
          borderColor={borderColor}
        >
          <StatLabel>Expiring Soon</StatLabel>
          <StatNumber color="red.500">{metrics.expiringSoon}</StatNumber>
          <StatHelpText>Within 7 days</StatHelpText>
        </Stat>
      </SimpleGrid>

      {/* Charts */}
      <Tabs>
        <TabList>
          <Tab>Stock Levels</Tab>
          <Tab>Category Distribution</Tab>
          <Tab>Expiry Timeline</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <VStack spacing="4" align="stretch">
              <HStack justify="space-between">
                <Text fontSize="lg" fontWeight="bold">
                  Stock Levels Over Time
                </Text>
                <Select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  maxW="200px"
                >
                  <option value="7">Last 7 days</option>
                  <option value="30">Last 30 days</option>
                  <option value="90">Last 90 days</option>
                </Select>
              </HStack>
              
              <Box
                p="6"
                bg={bgColor}
                borderRadius="lg"
                border="1px"
                borderColor={borderColor}
              >
                <StockLevelsChart data={stockLevelsData} />
              </Box>
            </VStack>
          </TabPanel>

          <TabPanel>
            <VStack spacing="4" align="stretch">
              <Text fontSize="lg" fontWeight="bold">
                Inventory by Category
              </Text>
              
              <Box
                p="6"
                bg={bgColor}
                borderRadius="lg"
                border="1px"
                borderColor={borderColor}
              >
                <CategoryDistributionChart data={categoryData} />
              </Box>
            </VStack>
          </TabPanel>

          <TabPanel>
            <VStack spacing="4" align="stretch">
              <Text fontSize="lg" fontWeight="bold">
                Expiry Timeline
              </Text>
              
              <Box
                p="6"
                bg={bgColor}
                borderRadius="lg"
                border="1px"
                borderColor={borderColor}
              >
                <ExpiryTimelineChart items={items} />
              </Box>
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default InventoryReports;
// Creative inventory search with vibrant design
import React from 'react';
import {
  Box,
  Input,
  Select,
  HStack,
  Button,
  InputGroup,
  InputLeftElement,
  useDisclosure,
  VStack,
  Text,
  Badge,
  Wrap,
  WrapItem,
  Icon,
  Card,
  CardBody,
  Heading
} from '@chakra-ui/react';
import { FiSearch, FiFilter, FiPlus, FiPackage, FiZap } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm, setSelectedCategory, clearFilters } from '../../store/inventorySlice';
import { ITEM_CATEGORIES, USER_ROLES } from '../../utils/constants';
import InventoryForm from './InventoryForm';

const InventorySearch = () => {
  const dispatch = useDispatch();
  const { searchTerm, selectedCategory, items, filteredItems } = useSelector(state => state.inventory);
  const { user } = useSelector(state => state.auth);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const canAdd = user?.role === USER_ROLES.ADMIN || user?.role === USER_ROLES.MANAGER;

  const handleSearchChange = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  const handleCategoryChange = (e) => {
    dispatch(setSelectedCategory(e.target.value));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  // Get category counts
  const categoryCounts = ITEM_CATEGORIES.reduce((acc, category) => {
    acc[category] = items.filter(item => item.category === category).length;
    return acc;
  }, {});

  const badgeColors = ['brand', 'emerald', 'purple', 'coral', 'yellow', 'teal', 'indigo'];

  return (
    <Card variant="elevated">
      <CardBody>
        <VStack spacing="6" align="stretch">
          {/* Header */}
          <HStack spacing="3">
            <Text fontSize="2xl">🔍</Text>
            <Heading size="md" bgGradient="linear(135deg, gray.700, gray.900)" bgClip="text">
              Search & Filter
            </Heading>
          </HStack>

          {/* Search and Filter Controls */}
          <HStack spacing="4" wrap="wrap">
            <InputGroup flex="1" minW="300px">
              <InputLeftElement pointerEvents="none">
                <Icon as={FiSearch} color="gray.400" />
              </InputLeftElement>
              <Input
                placeholder="Search by name, category, or supplier..."
                value={searchTerm}
                onChange={handleSearchChange}
                size="lg"
                borderRadius="xl"
                variant="filled"
                _focus={{
                  transform: 'scale(1.02)',
                  boxShadow: 'xl',
                }}
                transition="all 0.2s"
              />
            </InputGroup>

            <Select
              placeholder="All Categories"
              value={selectedCategory}
              onChange={handleCategoryChange}
              maxW="250px"
              size="lg"
              borderRadius="xl"
              variant="filled"
              _focus={{
                transform: 'scale(1.02)',
              }}
              transition="all 0.2s"
            >
              {ITEM_CATEGORIES.map(category => (
                <option key={category} value={category}>
                  {category} ({categoryCounts[category] || 0})
                </option>
              ))}
            </Select>

            <Button
              leftIcon={<FiFilter />}
              variant="outline"
              onClick={handleClearFilters}
              size="lg"
              borderRadius="xl"
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'lg',
              }}
              transition="all 0.2s"
            >
              Clear Filters
            </Button>

            {canAdd && (
              <Button
                leftIcon={<FiPlus />}
                variant="gradient"
                onClick={onOpen}
                size="lg"
                borderRadius="xl"
                boxShadow="xl"
                _hover={{
                  transform: 'translateY(-3px) scale(1.05)',
                  boxShadow: '2xl',
                }}
                transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
              >
                Add Item
              </Button>
            )}
          </HStack>

          {/* Quick Stats with Creative Design */}
          <VStack align="start" spacing="4">
            <HStack align="center" spacing="3">
              <Icon as={FiPackage} color="brand.500" boxSize="6" />
              <Text fontSize="lg" fontWeight="bold" color="gray.700" _dark={{ color: 'gray.200' }}>
                📊 Showing {filteredItems.length} of {items.length} items
              </Text>
              <Icon as={FiZap} color="yellow.500" />
            </HStack>
            
            <Wrap spacing="3">
              {[
                { label: 'Total Items', value: items.length, color: 'brand', emoji: '📦' },
                { label: 'In Stock', value: items.filter(item => item.quantity > 0).length, color: 'emerald', emoji: '✅' },
                { label: 'Out of Stock', value: items.filter(item => item.quantity === 0).length, color: 'coral', emoji: '❌' },
                { label: 'Low Stock', value: items.filter(item => item.quantity <= 10 && item.quantity > 0).length, color: 'yellow', emoji: '⚠️' }
              ].map((stat, index) => (
                <WrapItem key={index}>
                  <Badge 
                    colorScheme={stat.color} 
                    variant="subtle" 
                    px="4" 
                    py="2" 
                    borderRadius="full"
                    fontSize="sm"
                    fontWeight="bold"
                    border="2px solid"
                    borderColor={`${stat.color}.200`}
                    _hover={{
                      transform: 'scale(1.05)',
                      boxShadow: 'md',
                    }}
                    transition="all 0.2s"
                  >
                    <HStack spacing="2">
                      <Text>{stat.emoji}</Text>
                      <Text>{stat.label}: {stat.value}</Text>
                    </HStack>
                  </Badge>
                </WrapItem>
              ))}
            </Wrap>
          </VStack>
        </VStack>

        {/* Add Item Modal */}
        <InventoryForm
          isOpen={isOpen}
          onClose={onClose}
        />
      </CardBody>
    </Card>
  );
};

export default InventorySearch;
// Creative dashboard with vibrant design and animations
import React from 'react';
import {
  Box,
  Heading,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  useColorModeValue,
  VStack,
  HStack,
  Text,
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Icon,
  Card,
  CardBody,
  Flex,
  Progress,
  Circle
} from '@chakra-ui/react';
import { FiPlus, FiBarChart, FiAlertTriangle, FiTrendingUp, FiPackage, FiDollarSign, FiClock, FiZap } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useInventory } from '../hooks/useInventory';
import { useNotifications } from '../hooks/useNotifications';
import { formatCurrency, getDaysUntilExpiry } from '../utils/helpers';
import { USER_ROLES } from '../utils/constants';
import StockAlerts from '../components/alerts/StockAlerts';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);
  const { items, loading } = useInventory();
  const { alerts, tasks } = useNotifications();
  
  const canAdd = user?.role === USER_ROLES.ADMIN || user?.role === USER_ROLES.MANAGER;

  // Calculate dashboard metrics
  const metrics = {
    totalItems: items.length,
    totalValue: items.reduce((sum, item) => sum + (item.quantity * (item.unitPrice || 0)), 0),
    lowStock: items.filter(item => item.quantity <= 10 && item.quantity > 0).length,
    expiringSoon: items.filter(item => {
      const days = getDaysUntilExpiry(item.expiryDate);
      return days <= 7 && days > 0;
    }).length,
    outOfStock: items.filter(item => item.quantity === 0).length,
    activeTasks: tasks.filter(task => task.status === 'pending').length
  };

  const statCards = [
    {
      label: 'Total Items',
      value: metrics.totalItems,
      helpText: `${metrics.outOfStock} out of stock`,
      icon: FiPackage,
      color: 'brand',
      gradient: 'linear(135deg, brand.400, brand.600)',
      change: '+12%',
      changeType: 'increase',
      emoji: '📦'
    },
    {
      label: 'Inventory Value',
      value: formatCurrency(metrics.totalValue),
      helpText: 'Current total value',
      icon: FiDollarSign,
      color: 'emerald',
      gradient: 'linear(135deg, emerald.400, emerald.600)',
      change: '+8%',
      changeType: 'increase',
      emoji: '💰'
    },
    {
      label: 'Active Alerts',
      value: alerts.length,
      helpText: `${metrics.lowStock} low stock, ${metrics.expiringSoon} expiring`,
      icon: FiAlertTriangle,
      color: 'coral',
      gradient: 'linear(135deg, orange.400, red.500)',
      change: '-5%',
      changeType: 'decrease',
      emoji: '🚨'
    },
    {
      label: 'Pending Tasks',
      value: metrics.activeTasks,
      helpText: 'Require attention',
      icon: FiClock,
      color: 'purple',
      gradient: 'linear(135deg, purple.400, purple.600)',
      change: '+3%',
      changeType: 'increase',
      emoji: '⏰'
    }
  ];

  if (loading) {
    return <LoadingSpinner text="Loading your awesome dashboard..." />;
  }

  return (
    <Box>
      <VStack spacing="8" align="stretch">
        {/* Creative Header */}
        <Box
          bgGradient="linear(135deg, brand.500, purple.500, teal.500)"
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
            bgImage: 'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.2) 0%, transparent 50%)',
          }}
        >
          <Flex justify="space-between" align="center" wrap="wrap" gap="4" position="relative" zIndex={1}>
            <VStack align="start" spacing="2">
              <HStack spacing="3">
                <Text fontSize="4xl">👋</Text>
                <Heading 
                  size="2xl" 
                  fontWeight="black"
                  textShadow="2px 2px 4px rgba(0,0,0,0.3)"
                >
                  Welcome back!
                </Heading>
              </HStack>
              <Text fontSize="xl" opacity={0.9} fontWeight="medium">
                Hey {user?.displayName || user?.email}, ready to manage some inventory? ✨
              </Text>
              <HStack spacing="4" mt="2">
                <HStack spacing="2">
                  <Circle size="3" bg="green.400" />
                  <Text fontSize="sm" opacity={0.9}>System Online</Text>
                </HStack>
                <HStack spacing="2">
                  <Icon as={FiZap} />
                  <Text fontSize="sm" opacity={0.9}>All systems go!</Text>
                </HStack>
              </HStack>
            </VStack>
            
            <HStack spacing="3">
              {canAdd && (
                <Button
                  leftIcon={<FiPlus />}
                  size="lg"
                  bg="white"
                  color="brand.600"
                  onClick={() => navigate('/inventory')}
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
              <Button
                leftIcon={<FiBarChart />}
                variant="outline"
                size="lg"
                onClick={() => navigate('/reports')}
                borderRadius="xl"
                borderColor="white"
                color="white"
                _hover={{
                  bg: 'whiteAlpha.200',
                  transform: 'translateY(-3px) scale(1.05)',
                }}
                transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
              >
                View Reports
              </Button>
            </HStack>
          </Flex>
        </Box>

        {/* Creative Stats Grid with Responsive Breakpoints */}
        <SimpleGrid 
          columns={{ 
            base: 1,           // 1 card on mobile (<700px)
            sm: 1,             // 1 card on small screens
            md: 2,             // 2 cards between 700px-1099px
            lg: 3,             // 3 cards between 1100px-1549px
            xl: 4              // 4 cards above 1550px
          }} 
          spacing="6"
          sx={{
            '@media (min-width: 700px) and (max-width: 1099px)': {
              gridTemplateColumns: 'repeat(2, 1fr)',
            },
            '@media (min-width: 1100px) and (max-width: 1549px)': {
              gridTemplateColumns: 'repeat(3, 1fr)',
            },
            '@media (min-width: 1550px)': {
              gridTemplateColumns: 'repeat(4, 1fr)',
            }
          }}
        >
          {statCards.map((stat, index) => (
            <Card 
              key={index} 
              variant="elevated"
              _hover={{
                transform: 'translateY(-8px) scale(1.02)',
                boxShadow: '2xl',
              }}
              transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
              style={{
                animationDelay: `${index * 0.1}s`,
                animation: 'slideInUp 0.6s ease-out forwards',
              }}
            >
              <CardBody position="relative" overflow="hidden">
                {/* Background gradient */}
                <Box
                  position="absolute"
                  top="0"
                  right="0"
                  w="20"
                  h="20"
                  bgGradient={stat.gradient}
                  borderRadius="full"
                  opacity={0.1}
                  transform="translate(50%, -50%)"
                />
                
                <Stat>
                  <Flex justify="space-between" align="start">
                    <Box>
                      <StatLabel fontSize="sm" color="gray.600" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">
                        {stat.label}
                      </StatLabel>
                      <HStack spacing="2" mt="1">
                        <Text fontSize="2xl">{stat.emoji}</Text>
                        <StatNumber fontSize="3xl" fontWeight="black" bgGradient={stat.gradient} bgClip="text">
                          {stat.value}
                        </StatNumber>
                      </HStack>
                      <StatHelpText fontSize="sm" mb="0" mt="2">
                        <StatArrow type={stat.changeType} />
                        <Text as="span" fontWeight="bold" color={stat.changeType === 'increase' ? 'green.500' : 'red.500'}>
                          {stat.change}
                        </Text>
                        <Text as="span" ml="1">from last month</Text>
                      </StatHelpText>
                    </Box>
                    <Box
                      p="3"
                      bgGradient={stat.gradient}
                      borderRadius="xl"
                      color="white"
                      boxShadow="lg"
                    >
                      <Icon as={stat.icon} boxSize="6" />
                    </Box>
                  </Flex>
                  <Text fontSize="xs" color="gray.500" mt="3" fontWeight="medium">
                    {stat.helpText}
                  </Text>
                  
                  {/* Progress bar for visual appeal */}
                  <Progress
                    value={Math.random() * 100}
                    size="sm"
                    borderRadius="full"
                    mt="3"
                    bgGradient={stat.gradient}
                    sx={{
                      '& > div': {
                        bgGradient: stat.gradient,
                      }
                    }}
                  />
                </Stat>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>

        {/* Critical Alerts with Creative Design */}
        {(metrics.lowStock > 0 || metrics.expiringSoon > 0 || metrics.outOfStock > 0) && (
          <Alert 
            status="warning" 
            borderRadius="2xl" 
            border="2px solid"
            borderColor="orange.200"
            bgGradient="linear(135deg, orange.50, yellow.50)"
            _dark={{
              bgGradient: 'linear(135deg, orange.900, yellow.900)',
              borderColor: 'orange.700'
            }}
            boxShadow="xl"
            p="6"
          >
            <AlertIcon boxSize="8" />
            <Box>
              <AlertTitle fontSize="xl" fontWeight="bold" mb="2">
                🚨 Attention Required!
              </AlertTitle>
              <AlertDescription fontSize="lg">
                You have <Text as="span" fontWeight="bold" color="orange.600">{metrics.lowStock}</Text> low stock items, 
                <Text as="span" fontWeight="bold" color="red.600" ml="1">{metrics.expiringSoon}</Text> items expiring soon, 
                and <Text as="span" fontWeight="bold" color="red.700" ml="1">{metrics.outOfStock}</Text> items out of stock.
              </AlertDescription>
            </Box>
          </Alert>
        )}

        {/* Recent Alerts with Creative Card */}
        <Card variant="elevated">
          <CardBody>
            <Flex justify="space-between" align="center" mb="6">
              <HStack spacing="3">
                <Text fontSize="2xl">🔔</Text>
                <Heading size="lg" bgGradient="linear(135deg, gray.700, gray.900)" bgClip="text">
                  Recent Alerts
                </Heading>
              </HStack>
              <Button
                size="sm"
                variant="outline"
                onClick={() => navigate('/alerts')}
                borderRadius="xl"
                _hover={{
                  transform: 'scale(1.05)',
                }}
              >
                View All
              </Button>
            </Flex>
            <StockAlerts />
          </CardBody>
        </Card>

        {/* Quick Actions with Creative Grid */}
        <Card variant="elevated">
          <CardBody>
            <HStack spacing="3" mb="6">
              <Text fontSize="2xl">⚡</Text>
              <Heading size="lg" bgGradient="linear(135deg, gray.700, gray.900)" bgClip="text">
                Quick Actions
              </Heading>
            </HStack>
            <SimpleGrid 
              columns={{ 
                base: 1,           // 1 card on mobile
                sm: 1,             // 1 card on small screens
                md: 2,             // 2 cards between 700px-1099px
                lg: 3,             // 3 cards between 1100px-1549px
                xl: 4              // 4 cards above 1550px
              }} 
              spacing="4"
              sx={{
                '@media (min-width: 700px) and (max-width: 1099px)': {
                  gridTemplateColumns: 'repeat(2, 1fr)',
                },
                '@media (min-width: 1100px) and (max-width: 1549px)': {
                  gridTemplateColumns: 'repeat(3, 1fr)',
                },
                '@media (min-width: 1550px)': {
                  gridTemplateColumns: 'repeat(4, 1fr)',
                }
              }}
            >
              {[
                { icon: FiPlus, label: 'Add New Item', path: '/inventory', disabled: !canAdd, gradient: 'linear(135deg, emerald.400, emerald.600)', emoji: '➕' },
                { icon: FiBarChart, label: 'View Reports', path: '/reports', gradient: 'linear(135deg, purple.400, purple.600)', emoji: '📊' },
                { icon: FiAlertTriangle, label: 'Check Alerts', path: '/alerts', gradient: 'linear(135deg, orange.400, red.500)', emoji: '🔔' },
                { icon: FiClock, label: `View Tasks (${metrics.activeTasks})`, path: '/tasks', gradient: 'linear(135deg, blue.400, blue.600)', emoji: '📋' }
              ].map((action, index) => (
                <Button
                  key={index}
                  size="lg"
                  variant="outline"
                  leftIcon={<Icon as={action.icon} />}
                  onClick={() => navigate(action.path)}
                  isDisabled={action.disabled}
                  borderRadius="xl"
                  h="20"
                  flexDirection="column"
                  spacing="2"
                  border="2px solid"
                  borderColor="gray.200"
                  _hover={{
                    bgGradient: action.gradient,
                    color: 'white',
                    borderColor: 'transparent',
                    transform: 'translateY(-4px) scale(1.02)',
                    boxShadow: 'xl',
                  }}
                  _disabled={{
                    opacity: 0.5,
                    cursor: 'not-allowed',
                  }}
                  transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                >
                  <Text fontSize="2xl" mb="1">{action.emoji}</Text>
                  <Text fontSize="sm" fontWeight="bold" textAlign="center">
                    {action.label}
                  </Text>
                </Button>
              ))}
            </SimpleGrid>
          </CardBody>
        </Card>
      </VStack>

      {/* Add some CSS animations */}
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

export default Dashboard;
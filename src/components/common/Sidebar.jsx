// Creative sidebar with vibrant design
import React from 'react';
import {
  Box,
  CloseButton,
  Flex,
  Text,
  useColorModeValue,
  Link,
  Icon,
  VStack,
  Divider,
  Badge,
  Avatar,
  HStack
} from '@chakra-ui/react';
import {
  FiHome,
  FiPackage,
  FiBarChart,
  FiAlertTriangle,
  FiUsers,
  FiClipboard,
  FiSettings
} from 'react-icons/fi';
import { NavLink as RouterLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { USER_ROLES } from '../../utils/constants';

const LinkItems = [
  { name: '🏠 Dashboard', icon: FiHome, path: '/dashboard', emoji: '🏠', color: 'brand' },
  { name: '📦 Inventory', icon: FiPackage, path: '/inventory', emoji: '📦', color: 'emerald' },
  { name: '📊 Reports', icon: FiBarChart, path: '/reports', emoji: '📊', color: 'purple' },
  { name: '🔔 Alerts', icon: FiAlertTriangle, path: '/alerts', emoji: '🔔', color: 'coral' },
  { name: '📋 Tasks', icon: FiClipboard, path: '/tasks', emoji: '📋', color: 'indigo' },
  { name: '👥 Users', icon: FiUsers, path: '/users', adminOnly: true, emoji: '👥', color: 'teal' },
  { name: '⚙️ Settings', icon: FiSettings, path: '/settings', emoji: '⚙️', color: 'yellow' }
];

const Sidebar = ({ onClose, ...rest }) => {
  const { user } = useSelector(state => state.auth);
  const { alerts } = useSelector(state => state.alerts);
  const location = useLocation();

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box
      transition="all 0.3s ease"
      bg={bgColor}
      borderRight="1px"
      borderRightColor={borderColor}
      w={{ base: 'full', md: 64 }}
      pos="fixed"
      h="full"
      boxShadow="xl"
      backdropFilter="blur(10px)"
      bgGradient={useColorModeValue(
        'linear(to-b, white, gray.50)',
        'linear(to-b, gray.800, gray.900)'
      )}
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="6" justifyContent="space-between">
        <Text 
          fontSize="2xl" 
          fontWeight="bold"
          bgGradient="linear(135deg, brand.500, purple.500, teal.500)"
          bgClip="text"
          letterSpacing="tight"
        >
          SmartInventory ✨
        </Text>
        <CloseButton 
          display={{ base: 'flex', md: 'none' }} 
          onClick={onClose}
          borderRadius="xl"
          _hover={{
            bg: useColorModeValue('gray.100', 'gray.700'),
            transform: 'scale(1.1)',
          }}
          transition="all 0.2s"
        />
      </Flex>
      
      <VStack spacing="2" px="4" mt="6">
        {LinkItems.map((link) => {
          // Hide admin-only links for non-admin users
          if (link.adminOnly && user?.role !== USER_ROLES.ADMIN) {
            return null;
          }
          
          const alertCount = link.name.includes('Alerts') ? alerts.length : 0;
          
          return (
            <NavItem
              key={link.name}
              icon={link.icon}
              path={link.path}
              isActive={location.pathname === link.path}
              alertCount={alertCount}
              color={link.color}
              emoji={link.emoji}
            >
              {link.name}
            </NavItem>
          );
        })}
      </VStack>

      <Divider mx="4" mt="8" />
      
      <Box px="4" mt="6">
        <Text 
          fontSize="xs" 
          color="gray.500" 
          fontWeight="bold" 
          textTransform="uppercase" 
          letterSpacing="wider"
          mb="3"
        >
          Account
        </Text>
        <Box 
          p="4" 
          bg={useColorModeValue('gray.50', 'gray.700')} 
          borderRadius="xl"
          border="2px solid"
          borderColor={useColorModeValue('gray.200', 'gray.600')}
          _hover={{
            borderColor: 'brand.300',
            transform: 'scale(1.02)',
          }}
          transition="all 0.2s"
        >
          <HStack spacing="3">
            <Avatar
              size="sm"
              name={user?.displayName || user?.email}
              bg="brand.500"
              color="white"
            />
            <VStack align="start" spacing="0" flex="1">
              <Text fontSize="sm" fontWeight="bold" noOfLines={1}>
                {user?.displayName || user?.email}
              </Text>
              <Badge 
                colorScheme="brand" 
                size="sm" 
                borderRadius="full"
                textTransform="capitalize"
              >
                {user?.role}
              </Badge>
            </VStack>
          </HStack>
        </Box>
      </Box>
    </Box>
  );
};

const NavItem = ({ icon, children, path, isActive, alertCount, color, emoji, ...rest }) => {
  const activeBg = useColorModeValue(`${color}.50`, `${color}.900`);
  const activeColor = useColorModeValue(`${color}.600`, `${color}.200`);
  const hoverBg = useColorModeValue('gray.100', 'gray.700');

  return (
    <Link
      as={RouterLink}
      to={path}
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
      w="full"
    >
      <Flex
        align="center"
        p="3"
        borderRadius="xl"
        role="group"
        cursor="pointer"
        bg={isActive ? activeBg : 'transparent'}
        color={isActive ? activeColor : 'inherit'}
        fontWeight={isActive ? 'bold' : 'medium'}
        border="2px solid"
        borderColor={isActive ? `${color}.200` : 'transparent'}
        _hover={{
          bg: isActive ? activeBg : hoverBg,
          transform: 'translateX(4px) scale(1.02)',
          borderColor: isActive ? `${color}.300` : 'gray.200',
        }}
        transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
        justify="space-between"
        position="relative"
        overflow="hidden"
        _before={isActive ? {
          content: '""',
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: '4px',
          bgGradient: `linear(to-b, ${color}.400, ${color}.600)`,
          borderRadius: 'full',
        } : {}}
        {...rest}
      >
        <Flex align="center">
          <Text fontSize="lg" mr="3">
            {emoji}
          </Text>
          <Text fontSize="sm" fontWeight={isActive ? 'bold' : 'medium'}>
            {children.replace(/^[^\s]+ /, '')} {/* Remove emoji from text */}
          </Text>
        </Flex>
        {alertCount > 0 && (
          <Badge
            colorScheme="red"
            borderRadius="full"
            fontSize="xs"
            minW="5"
            h="5"
            display="flex"
            alignItems="center"
            justifyContent="center"
            animation="pulse 2s infinite"
            boxShadow="0 0 10px rgba(239, 68, 68, 0.5)"
          >
            {alertCount}
          </Badge>
        )}
      </Flex>
    </Link>
  );
};

export default Sidebar;
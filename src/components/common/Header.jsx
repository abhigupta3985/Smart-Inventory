// Creative header with glassmorphism and vibrant design
import React from 'react';
import {
  Flex,
  Box,
  Text,
  IconButton,
  Button,
  Avatar,
  HStack,
  VStack,
  useColorModeValue,
  useColorMode,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Badge,
  useToast,
  Tooltip
} from '@chakra-ui/react';
import {
  FiMenu,
  FiSun,
  FiMoon,
  FiBell,
  FiSettings,
  FiLogOut,
  FiUser
} from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../store/authSlice';
import { useNotifications } from '../../hooks/useNotifications';

const Header = ({ onOpen }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const dispatch = useDispatch();
  const toast = useToast();
  const { user } = useSelector(state => state.auth);
  const { alerts } = useNotifications();

  const bgColor = useColorModeValue('rgba(255, 255, 255, 0.8)', 'rgba(26, 32, 44, 0.8)');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      toast({
        title: '👋 See you later!',
        description: 'Logged out successfully',
        status: 'success',
        duration: 3000,
        isClosable: true
      });
    } catch (error) {
      toast({
        title: 'Error logging out',
        description: error,
        status: 'error',
        duration: 3000,
        isClosable: true
      });
    }
  };

  return (
    <Flex
      ml={{ base: 0, md: 64 }}
      px={{ base: 4, md: 6 }}
      height="20"
      alignItems="center"
      bg={bgColor}
      borderBottomWidth="1px"
      borderBottomColor={borderColor}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      backdropFilter="blur(20px)"
      position="sticky"
      top="0"
      zIndex="100"
      boxShadow="lg"
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="ghost"
        aria-label="open menu"
        icon={<FiMenu />}
        size="lg"
        borderRadius="xl"
        _hover={{
          bg: useColorModeValue('gray.100', 'gray.700'),
          transform: 'scale(1.1) rotate(90deg)',
        }}
        transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
      />

      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="xl"
        fontWeight="bold"
        bgGradient="linear(135deg, brand.500, purple.500)"
        bgClip="text"
      >
        SmartInventory ✨
      </Text>

      <HStack spacing={{ base: '2', md: '4' }}>
        <Tooltip label={`Switch to ${colorMode === 'light' ? 'dark' : 'light'} mode`}>
          <IconButton
            size="lg"
            variant="ghost"
            aria-label="toggle color mode"
            icon={colorMode === 'light' ? <FiMoon /> : <FiSun />}
            onClick={toggleColorMode}
            borderRadius="xl"
            _hover={{
              bg: useColorModeValue('yellow.100', 'yellow.900'),
              transform: 'scale(1.1) rotate(180deg)',
              color: 'yellow.500',
            }}
            transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
          />
        </Tooltip>
        
        <Tooltip label="Notifications">
          <Box position="relative">
            <IconButton
              size="lg"
              variant="ghost"
              aria-label="notifications"
              icon={<FiBell />}
              borderRadius="xl"
              _hover={{
                bg: useColorModeValue('blue.100', 'blue.900'),
                transform: 'scale(1.1)',
                color: 'blue.500',
              }}
              transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
            />
            {alerts.length > 0 && (
              <Badge
                position="absolute"
                top="1"
                right="1"
                colorScheme="red"
                borderRadius="full"
                minW="6"
                h="6"
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontSize="xs"
                fontWeight="bold"
                animation="bounce 1s infinite"
                boxShadow="0 0 15px rgba(239, 68, 68, 0.6)"
              >
                {alerts.length}
              </Badge>
            )}
          </Box>
        </Tooltip>

        <Menu>
          <MenuButton
            as={Button}
            variant="ghost"
            p={2}
            borderRadius="xl"
            _hover={{
              bg: useColorModeValue('gray.100', 'gray.700'),
              transform: 'scale(1.05)',
            }}
            _active={{
              bg: useColorModeValue('gray.200', 'gray.600'),
              transform: 'scale(0.98)',
            }}
            transition="all 0.2s"
          >
            <HStack spacing="3">
              <Avatar
                size="sm"
                name={user?.displayName || user?.email}
                bg="brand.500"
                color="white"
                border="3px solid"
                borderColor="brand.200"
                _hover={{
                  borderColor: 'brand.400',
                  transform: 'scale(1.1)',
                }}
                transition="all 0.2s"
              />
              <VStack
                display={{ base: 'none', md: 'flex' }}
                alignItems="flex-start"
                spacing="0"
                ml="2"
              >
                <Text fontSize="sm" fontWeight="bold" lineHeight="1.2">
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
          </MenuButton>
          <MenuList
            borderRadius="xl"
            border="1px solid"
            borderColor={borderColor}
            boxShadow="2xl"
            py="2"
            bg={useColorModeValue('white', 'gray.800')}
            backdropFilter="blur(10px)"
          >
            <MenuItem 
              icon={<FiUser />} 
              borderRadius="lg"
              mx="2"
              _hover={{
                bg: useColorModeValue('blue.50', 'blue.900'),
                color: 'blue.500',
              }}
              transition="all 0.2s"
            >
              👤 Profile
            </MenuItem>
            <MenuItem 
              icon={<FiSettings />} 
              borderRadius="lg"
              mx="2"
              _hover={{
                bg: useColorModeValue('gray.100', 'gray.700'),
              }}
              transition="all 0.2s"
            >
              ⚙️ Settings
            </MenuItem>
            <MenuDivider />
            <MenuItem 
              icon={<FiLogOut />} 
              onClick={handleLogout}
              borderRadius="lg"
              mx="2"
              color="red.500"
              _hover={{
                bg: 'red.50',
                _dark: {
                  bg: 'red.900',
                }
              }}
              transition="all 0.2s"
            >
              🚪 Sign out
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </Flex>
  );
};

export default Header;
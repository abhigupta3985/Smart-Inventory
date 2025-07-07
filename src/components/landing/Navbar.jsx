// Navigation bar component for landing page
import React from 'react';
import {
  Box,
  Flex,
  Text,
  Button,
  HStack,
  Link,
  IconButton,
  useColorMode,
  useColorModeValue,
  Container,
  useDisclosure,
  VStack,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton
} from '@chakra-ui/react';
import { FiSun, FiMoon, FiMenu } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const navItems = [
    { label: 'Features', href: '#features' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' }
  ];

  const NavLink = ({ children, href, ...props }) => (
    <Link
      px={2}
      py={1}
      rounded="md"
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700')
      }}
      href={href}
      {...props}
    >
      {children}
    </Link>
  );

  return (
    <Box
      bg={bg}
      borderBottom="1px"
      borderColor={borderColor}
      position="fixed"
      top="0"
      left="0"
      right="0"
      zIndex="1000"
      backdropFilter="blur(10px)"
      bgOpacity={0.95}
    >
      <Container maxW="container.xl">
        <Flex h="16" alignItems="center" justifyContent="space-between">
          {/* Logo */}
          <Text
            fontSize="xl"
            fontWeight="bold"
            color="blue.500"
            cursor="pointer"
            onClick={() => navigate('/')}
          >
            SmartInventory
          </Text>

          {/* Desktop Navigation */}
          <HStack spacing="8" display={{ base: 'none', md: 'flex' }}>
            {navItems.map((item) => (
              <NavLink key={item.label} href={item.href}>
                {item.label}
              </NavLink>
            ))}
          </HStack>

          {/* Right side buttons */}
          <HStack spacing="4">
            <IconButton
              size="md"
              variant="ghost"
              aria-label="Toggle color mode"
              icon={colorMode === 'light' ? <FiMoon /> : <FiSun />}
              onClick={toggleColorMode}
            />
            
            <Button
              variant="ghost"
              onClick={() => navigate('/login')}
              display={{ base: 'none', md: 'inline-flex' }}
            >
              Login
            </Button>
            
            <Button
              colorScheme="blue"
              onClick={() => navigate('/login')}
              display={{ base: 'none', md: 'inline-flex' }}
            >
              Get Started
            </Button>

            {/* Mobile menu button */}
            <IconButton
              size="md"
              variant="ghost"
              aria-label="Open menu"
              icon={<FiMenu />}
              onClick={onOpen}
              display={{ base: 'flex', md: 'none' }}
            />
          </HStack>
        </Flex>
      </Container>

      {/* Mobile Navigation Drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody>
            <VStack spacing="4" align="stretch">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={onClose}
                  p="2"
                  rounded="md"
                  _hover={{
                    bg: useColorModeValue('gray.100', 'gray.700')
                  }}
                >
                  {item.label}
                </Link>
              ))}
              <Button
                variant="ghost"
                onClick={() => {
                  navigate('/login');
                  onClose();
                }}
                justifyContent="flex-start"
              >
                Login
              </Button>
              <Button
                colorScheme="blue"
                onClick={() => {
                  navigate('/login');
                  onClose();
                }}
              >
                Get Started
              </Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Navbar;
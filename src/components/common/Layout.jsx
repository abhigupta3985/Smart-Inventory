// Main application layout component with creative design
import React from 'react';
import {
  Box,
  Flex,
  useColorModeValue,
  Drawer,
  DrawerContent,
  useDisclosure
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { sidebarOpen } = useSelector(state => state.ui);

  const bgColor = useColorModeValue('gray.50', 'gray.900');

  return (
    <Box 
      minH="100vh" 
      bg={bgColor}
      position="relative"
      _before={{
        content: '""',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        bgGradient: 'radial(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%), radial(circle at 80% 20%, rgba(255, 119, 198, 0.1) 0%, transparent 50%), radial(circle at 40% 40%, rgba(120, 219, 255, 0.1) 0%, transparent 50%)',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      <Sidebar
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <Sidebar onClose={onClose} />
        </DrawerContent>
      </Drawer>
      
      <Header onOpen={onOpen} />
      
      <Box 
        ml={{ base: 0, md: 64 }} 
        p="6"
        transition="all 0.3s ease"
        position="relative"
        zIndex={1}
      >
        <Box
          maxW="full"
          mx="auto"
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
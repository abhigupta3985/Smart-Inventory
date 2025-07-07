// Footer component for landing page
import React from 'react';
import {
  Box,
  Container,
  Text,
  HStack,
  VStack,
  Link,
  Divider,
  useColorModeValue,
  SimpleGrid,
  Heading
} from '@chakra-ui/react';

const Footer = () => {
  const bg = useColorModeValue('gray.50', 'gray.900');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.400');

  const footerLinks = {
    Product: [
      { label: 'Features', href: '#features' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Documentation', href: '#docs' }
    ],
    Company: [
      { label: 'About Us', href: '#about' },
      { label: 'Contact', href: '#contact' },
      { label: 'Careers', href: '#careers' }
    ],
    Support: [
      { label: 'Help Center', href: '#help' },
      { label: 'Community', href: '#community' },
      { label: 'Status', href: '#status' }
    ]
  };

  return (
    <Box bg={bg} borderTop="1px" borderColor={borderColor}>
      <Container maxW="container.xl" py="12">
        <SimpleGrid columns={{ base: 1, md: 4 }} spacing="8">
          {/* Brand Section */}
          <VStack align="start" spacing="4">
            <Heading size="md" color="blue.500">
              SmartInventory
            </Heading>
            <Text fontSize="sm" color={textColor} maxW="250px">
              The complete inventory management solution for modern businesses. 
              Track, manage, and optimize your inventory with ease.
            </Text>
          </VStack>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <VStack key={category} align="start" spacing="3">
              <Heading size="sm">{category}</Heading>
              {links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  fontSize="sm"
                  color={textColor}
                  _hover={{
                    color: 'blue.500',
                    textDecoration: 'none'
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </VStack>
          ))}
        </SimpleGrid>

        <Divider my="8" />

        {/* Bottom Section */}
        <HStack
          justify="space-between"
          align="center"
          direction={{ base: 'column', md: 'row' }}
          spacing="4"
        >
          <Text fontSize="sm" color={textColor}>
            © {new Date().getFullYear()} SmartInventory. All rights reserved.
          </Text>
          
          <HStack spacing="6">
            <Link
              href="#privacy"
              fontSize="sm"
              color={textColor}
              _hover={{ color: 'blue.500' }}
            >
              Privacy Policy
            </Link>
            <Link
              href="#terms"
              fontSize="sm"
              color={textColor}
              _hover={{ color: 'blue.500' }}
            >
              Terms of Service
            </Link>
          </HStack>
        </HStack>
      </Container>
    </Box>
  );
};

export default Footer;
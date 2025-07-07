// Login page component
import React from 'react';
import { 
  Box, 
  Grid, 
  GridItem, 
  useColorModeValue,
  Container,
  VStack
} from '@chakra-ui/react';
import LoginForm from '../components/auth/LoginForm';
import LoginIllustration from '../components/auth/LoginIllustration';
import LoginNavbar from '../components/auth/LoginNavbar';
import LoginFooter from '../components/auth/LoginFooter';

const Login = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.900');

  return (
    <Box minH="100vh" bg={bgColor} display="flex" flexDirection="column">
      {/* Navbar */}
      <LoginNavbar />
      
      {/* Main Content */}
      <Box flex="1" display="flex" alignItems="center" py="8">
        <Container maxW="container.xl" h="full">
          <Grid
            templateColumns={{ base: '1fr', lg: '1fr 1fr' }}
            gap="8"
            h="full"
            minH="600px"
            alignItems="center"
          >
            {/* Left Side - Illustration (Hidden on mobile) */}
            <GridItem display={{ base: 'none', lg: 'block' }}>
              <LoginIllustration />
            </GridItem>

            {/* Right Side - Login Form */}
            <GridItem>
              <VStack justify="center" h="full" spacing="8">
                <LoginForm />
              </VStack>
            </GridItem>
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <LoginFooter />
    </Box>
  );
};

export default Login;
// Login form component
import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
  useColorModeValue,
  Alert,
  AlertIcon,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Select,
  useToast,
  Heading,
  HStack,
  Divider,
  Link,
  InputGroup,
  InputRightElement,
  IconButton
} from '@chakra-ui/react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerUser, clearError } from '../../store/authSlice';
import { USER_ROLES } from '../../utils/constants';

const LoginForm = () => {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({
    email: '',
    password: '',
    displayName: '',
    role: USER_ROLES.VIEWER
  });
  const [showPassword, setShowPassword] = useState(false);
  
  const dispatch = useDispatch();
  const toast = useToast();
  const { loading, error } = useSelector(state => state.auth);

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await dispatch(loginUser(loginData)).unwrap();
      toast({
        title: 'Welcome back!',
        description: 'Login successful',
        status: 'success',
        duration: 3000,
        isClosable: true
      });
    } catch (error) {
      toast({
        title: 'Login failed',
        description: error,
        status: 'error',
        duration: 3000,
        isClosable: true
      });
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await dispatch(registerUser(registerData)).unwrap();
      toast({
        title: 'Account created!',
        description: 'Registration successful',
        status: 'success',
        duration: 3000,
        isClosable: true
      });
    } catch (error) {
      toast({
        title: 'Registration failed',
        description: error,
        status: 'error',
        duration: 3000,
        isClosable: true
      });
    }
  };

  const handleInputChange = (e, type) => {
    const { name, value } = e.target;
    if (type === 'login') {
      setLoginData(prev => ({ ...prev, [name]: value }));
    } else {
      setRegisterData(prev => ({ ...prev, [name]: value }));
    }
    dispatch(clearError());
  };

  return (
    <Box
      w="full"
      maxW="md"
      p="8"
      bg={bgColor}
      borderRadius="xl"
      border="1px"
      borderColor={borderColor}
      boxShadow="2xl"
    >
      <VStack spacing="6" align="stretch">
        {/* Header */}
        <VStack spacing="2" textAlign="center">
          <Heading size="lg" color="blue.600">
            Welcome to SmartInventory
          </Heading>
          <Text color="gray.600" fontSize="sm">
            Sign in to your account or create a new one
          </Text>
        </VStack>

        {error && (
          <Alert status="error" borderRadius="md">
            <AlertIcon />
            {error}
          </Alert>
        )}

        <Tabs variant="soft-rounded" colorScheme="blue">
          <TabList>
            <Tab flex="1">Sign In</Tab>
            <Tab flex="1">Create Account</Tab>
          </TabList>

          <TabPanels>
            {/* Login Tab */}
            <TabPanel px="0">
              <form onSubmit={handleLogin}>
                <VStack spacing="4">
                  <FormControl isRequired>
                    <FormLabel fontSize="sm" fontWeight="medium">
                      Email Address
                    </FormLabel>
                    <Input
                      type="email"
                      name="email"
                      value={loginData.email}
                      onChange={(e) => handleInputChange(e, 'login')}
                      placeholder="Enter your email"
                      size="lg"
                      borderRadius="lg"
                      _focus={{
                        borderColor: 'blue.500',
                        boxShadow: '0 0 0 1px blue.500'
                      }}
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel fontSize="sm" fontWeight="medium">
                      Password
                    </FormLabel>
                    <InputGroup>
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={loginData.password}
                        onChange={(e) => handleInputChange(e, 'login')}
                        placeholder="Enter your password"
                        size="lg"
                        borderRadius="lg"
                        _focus={{
                          borderColor: 'blue.500',
                          boxShadow: '0 0 0 1px blue.500'
                        }}
                      />
                      <InputRightElement h="full">
                        <IconButton
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowPassword(!showPassword)}
                          icon={showPassword ? <FiEyeOff /> : <FiEye />}
                          aria-label={showPassword ? 'Hide password' : 'Show password'}
                        />
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>

                  <HStack justify="space-between" w="full">
                    <Link fontSize="sm" color="blue.500" _hover={{ textDecoration: 'underline' }}>
                      Forgot password?
                    </Link>
                  </HStack>

                  <Button
                    type="submit"
                    colorScheme="blue"
                    size="lg"
                    width="full"
                    isLoading={loading}
                    loadingText="Signing in..."
                    borderRadius="lg"
                    _hover={{
                      transform: 'translateY(-1px)',
                      boxShadow: 'lg'
                    }}
                    transition="all 0.2s"
                  >
                    Sign In
                  </Button>
                </VStack>
              </form>
            </TabPanel>

            {/* Register Tab */}
            <TabPanel px="0">
              <form onSubmit={handleRegister}>
                <VStack spacing="4">
                  <FormControl isRequired>
                    <FormLabel fontSize="sm" fontWeight="medium">
                      Full Name
                    </FormLabel>
                    <Input
                      type="text"
                      name="displayName"
                      value={registerData.displayName}
                      onChange={(e) => handleInputChange(e, 'register')}
                      placeholder="Enter your full name"
                      size="lg"
                      borderRadius="lg"
                      _focus={{
                        borderColor: 'blue.500',
                        boxShadow: '0 0 0 1px blue.500'
                      }}
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel fontSize="sm" fontWeight="medium">
                      Email Address
                    </FormLabel>
                    <Input
                      type="email"
                      name="email"
                      value={registerData.email}
                      onChange={(e) => handleInputChange(e, 'register')}
                      placeholder="Enter your email"
                      size="lg"
                      borderRadius="lg"
                      _focus={{
                        borderColor: 'blue.500',
                        boxShadow: '0 0 0 1px blue.500'
                      }}
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel fontSize="sm" fontWeight="medium">
                      Password
                    </FormLabel>
                    <InputGroup>
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={registerData.password}
                        onChange={(e) => handleInputChange(e, 'register')}
                        placeholder="Create a password"
                        size="lg"
                        borderRadius="lg"
                        _focus={{
                          borderColor: 'blue.500',
                          boxShadow: '0 0 0 1px blue.500'
                        }}
                      />
                      <InputRightElement h="full">
                        <IconButton
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowPassword(!showPassword)}
                          icon={showPassword ? <FiEyeOff /> : <FiEye />}
                          aria-label={showPassword ? 'Hide password' : 'Show password'}
                        />
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel fontSize="sm" fontWeight="medium">
                      Role
                    </FormLabel>
                    <Select
                      name="role"
                      value={registerData.role}
                      onChange={(e) => handleInputChange(e, 'register')}
                      size="lg"
                      borderRadius="lg"
                      _focus={{
                        borderColor: 'blue.500',
                        boxShadow: '0 0 0 1px blue.500'
                      }}
                    >
                      <option value={USER_ROLES.VIEWER}>Viewer</option>
                      <option value={USER_ROLES.MANAGER}>Manager</option>
                      <option value={USER_ROLES.ADMIN}>Admin</option>
                    </Select>
                  </FormControl>

                  <Button
                    type="submit"
                    colorScheme="blue"
                    size="lg"
                    width="full"
                    isLoading={loading}
                    loadingText="Creating account..."
                    borderRadius="lg"
                    _hover={{
                      transform: 'translateY(-1px)',
                      boxShadow: 'lg'
                    }}
                    transition="all 0.2s"
                  >
                    Create Account
                  </Button>
                </VStack>
              </form>
            </TabPanel>
          </TabPanels>
        </Tabs>

        <HStack>
          <Divider />
          <Text fontSize="xs" color="gray.500" whiteSpace="nowrap">
            Secure & Encrypted
          </Text>
          <Divider />
        </HStack>

        <Text fontSize="xs" color="gray.500" textAlign="center">
          By signing in, you agree to our{' '}
          <Link color="blue.500" _hover={{ textDecoration: 'underline' }}>
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link color="blue.500" _hover={{ textDecoration: 'underline' }}>
            Privacy Policy
          </Link>
        </Text>
      </VStack>
    </Box>
  );
};

export default LoginForm;
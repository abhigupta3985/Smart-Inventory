// Landing page component
import React from 'react';
import { Box } from '@chakra-ui/react';
import Navbar from '../components/landing/Navbar';
import Hero from '../components/landing/Hero';
import Footer from '../components/landing/Footer';

const Landing = () => {
  return (
    <Box minH="100vh">
      <Navbar />
      <Box pt="16"> {/* Add padding top to account for fixed navbar */}
        <Hero />
      </Box>
      <Footer />
    </Box>
  );
};

export default Landing;
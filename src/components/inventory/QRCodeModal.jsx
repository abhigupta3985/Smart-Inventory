// QR Code modal component
import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  VStack,
  Text,
  Box,
  useToast
} from '@chakra-ui/react';
import QRCode from 'react-qr-code';
import { generateQRData } from '../../utils/helpers';

const QRCodeModal = ({ isOpen, onClose, item }) => {
  const toast = useToast();

  if (!item) return null;

  const qrData = generateQRData(item);

  const handleDownload = () => {
    // Convert SVG to canvas and download
    const svg = document.getElementById('qr-code');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const data = new XMLSerializer().serializeToString(svg);
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      
      const link = document.createElement('a');
      link.download = `${item.name}-qr-code.png`;
      link.href = canvas.toDataURL();
      link.click();
    };
    
    img.src = 'data:image/svg+xml;base64,' + btoa(data);
    
    toast({
      title: 'QR Code downloaded',
      status: 'success',
      duration: 3000,
      isClosable: true
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>QR Code - {item.name}</ModalHeader>
        <ModalCloseButton />
        
        <ModalBody>
          <VStack spacing="4">
            <Box p="4" bg="white" borderRadius="md">
              <QRCode
                id="qr-code"
                value={qrData}
                size={200}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              />
            </Box>
            
            <VStack spacing="2" textAlign="center">
              <Text fontWeight="bold">{item.name}</Text>
              <Text fontSize="sm" color="gray.600">
                Category: {item.category}
              </Text>
              <Text fontSize="sm" color="gray.600">
                Quantity: {item.quantity}
              </Text>
              <Text fontSize="xs" color="gray.500">
                Scan this QR code to quickly access item information
              </Text>
            </VStack>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button colorScheme="blue" onClick={handleDownload}>
            Download QR Code
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default QRCodeModal;
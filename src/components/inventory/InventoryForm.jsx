// Inventory form component for adding/editing items
import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  VStack,
  HStack,
  useToast,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { addInventoryItem, updateInventoryItem } from '../../store/inventorySlice';
import { ITEM_CATEGORIES } from '../../utils/constants';

const InventoryForm = ({ isOpen, onClose, item }) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    quantity: 0,
    expiryDate: '',
    location: '',
    supplier: '',
    description: '',
    unitPrice: 0,
    barcode: '',
    minStockLevel: 10
  });

  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name || '',
        category: item.category || '',
        quantity: item.quantity || 0,
        expiryDate: item.expiryDate || '',
        location: item.location || '',
        supplier: item.supplier || '',
        description: item.description || '',
        unitPrice: item.unitPrice || 0,
        barcode: item.barcode || '',
        minStockLevel: item.minStockLevel || 10
      });
    } else {
      setFormData({
        name: '',
        category: '',
        quantity: 0,
        expiryDate: '',
        location: '',
        supplier: '',
        description: '',
        unitPrice: 0,
        barcode: '',
        minStockLevel: 10
      });
    }
  }, [item]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (item) {
        // Update existing item
        await dispatch(updateInventoryItem({
          id: item.id,
          updates: formData
        })).unwrap();
        toast({
          title: 'Item updated successfully',
          status: 'success',
          duration: 3000,
          isClosable: true
        });
      } else {
        // Add new item
        await dispatch(addInventoryItem(formData)).unwrap();
        toast({
          title: 'Item added successfully',
          status: 'success',
          duration: 3000,
          isClosable: true
        });
      }
      onClose();
    } catch (error) {
      toast({
        title: 'Error saving item',
        description: error,
        status: 'error',
        duration: 3000,
        isClosable: true
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <ModalHeader>
            {item ? 'Edit Item' : 'Add New Item'}
          </ModalHeader>
          <ModalCloseButton />
          
          <ModalBody>
            <VStack spacing="4">
              <HStack spacing="4" width="full">
                <FormControl isRequired>
                  <FormLabel>Name</FormLabel>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter item name"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Category</FormLabel>
                  <Select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    placeholder="Select category"
                  >
                    {ITEM_CATEGORIES.map(category => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </HStack>

              <HStack spacing="4" width="full">
                <FormControl isRequired>
                  <FormLabel>Quantity</FormLabel>
                  <NumberInput
                    min={0}
                    value={formData.quantity}
                    onChange={(value) => handleNumberChange('quantity', parseInt(value) || 0)}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Expiry Date</FormLabel>
                  <Input
                    name="expiryDate"
                    type="date"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                  />
                </FormControl>
              </HStack>

              <HStack spacing="4" width="full">
                <FormControl>
                  <FormLabel>Location</FormLabel>
                  <Input
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="Storage location"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Supplier</FormLabel>
                  <Input
                    name="supplier"
                    value={formData.supplier}
                    onChange={handleInputChange}
                    placeholder="Supplier name"
                  />
                </FormControl>
              </HStack>

              <HStack spacing="4" width="full">
                <FormControl>
                  <FormLabel>Unit Price ($)</FormLabel>
                  <NumberInput
                    min={0}
                    precision={2}
                    value={formData.unitPrice}
                    onChange={(value) => handleNumberChange('unitPrice', parseFloat(value) || 0)}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>

                <FormControl>
                  <FormLabel>Min Stock Level</FormLabel>
                  <NumberInput
                    min={0}
                    value={formData.minStockLevel}
                    onChange={(value) => handleNumberChange('minStockLevel', parseInt(value) || 10)}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>
              </HStack>

              <FormControl>
                <FormLabel>Barcode</FormLabel>
                <Input
                  name="barcode"
                  value={formData.barcode}
                  onChange={handleInputChange}
                  placeholder="Barcode number"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Item description"
                  rows={3}
                />
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              type="submit"
              isLoading={loading}
              loadingText="Saving..."
            >
              {item ? 'Update' : 'Add'} Item
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default InventoryForm;
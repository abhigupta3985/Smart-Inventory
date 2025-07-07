// Inventory list component
import React, { useState } from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Badge,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  HStack,
  Text,
  useColorModeValue,
  Button,
  VStack,
  Alert,
  AlertIcon
} from '@chakra-ui/react';
import { FiMoreVertical, FiEdit, FiTrash2, FiCamera, FiEye } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { deleteInventoryItem } from '../../store/inventorySlice';
import { formatDate, getDaysUntilExpiry, getStockStatus } from '../../utils/helpers';
import { USER_ROLES } from '../../utils/constants';
import InventoryForm from './InventoryForm';
import QRCodeModal from './QRCodeModal';

const InventoryList = () => {
  const dispatch = useDispatch();
  const { filteredItems, loading } = useSelector(state => state.inventory);
  const { user } = useSelector(state => state.auth);
  const [selectedItem, setSelectedItem] = useState(null);
  const [qrItem, setQrItem] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isQROpen, onOpen: onQROpen, onClose: onQRClose } = useDisclosure();

  const canEdit = user?.role === USER_ROLES.ADMIN || user?.role === USER_ROLES.MANAGER;
  const canDelete = user?.role === USER_ROLES.ADMIN;

  const handleEdit = (item) => {
    setSelectedItem(item);
    onOpen();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      await dispatch(deleteInventoryItem(id));
    }
  };

  const handleQRCode = (item) => {
    setQrItem(item);
    onQROpen();
  };

  const getStockStatusColor = (quantity) => {
    const status = getStockStatus(quantity);
    switch (status) {
      case 'out_of_stock':
        return 'red';
      case 'low_stock':
        return 'orange';
      default:
        return 'green';
    }
  };

  const getExpiryStatusColor = (expiryDate) => {
    const daysUntilExpiry = getDaysUntilExpiry(expiryDate);
    if (daysUntilExpiry < 0) return 'red';
    if (daysUntilExpiry <= 7) return 'orange';
    return 'green';
  };

  if (loading) {
    return (
      <Box p="4">
        <Text>Loading inventory...</Text>
      </Box>
    );
  }

  if (filteredItems.length === 0) {
    return (
      <Box p="4">
        <Alert status="info">
          <AlertIcon />
          No inventory items found. Add your first item to get started.
        </Alert>
      </Box>
    );
  }

  return (
    <Box>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Category</Th>
              <Th>Quantity</Th>
              <Th>Status</Th>
              <Th>Expiry Date</Th>
              <Th>Location</Th>
              <Th>Supplier</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredItems.map((item) => (
              <Tr key={item.id}>
                <Td fontWeight="medium">{item.name}</Td>
                <Td>{item.category}</Td>
                <Td>{item.quantity}</Td>
                <Td>
                  <Badge colorScheme={getStockStatusColor(item.quantity)}>
                    {getStockStatus(item.quantity).replace('_', ' ')}
                  </Badge>
                </Td>
                <Td>
                  <VStack spacing="1" align="start">
                    <Text fontSize="sm">{formatDate(item.expiryDate)}</Text>
                    <Badge
                      size="sm"
                      colorScheme={getExpiryStatusColor(item.expiryDate)}
                    >
                      {getDaysUntilExpiry(item.expiryDate)} days
                    </Badge>
                  </VStack>
                </Td>
                <Td>{item.location || 'N/A'}</Td>
                <Td>{item.supplier || 'N/A'}</Td>
                <Td>
                  <Menu>
                    <MenuButton
                      as={IconButton}
                      icon={<FiMoreVertical />}
                      variant="ghost"
                      size="sm"
                    />
                    <MenuList>
                      <MenuItem icon={<FiEye />}>View Details</MenuItem>
                      <MenuItem icon={<FiCamera />} onClick={() => handleQRCode(item)}>
                        QR Code
                      </MenuItem>
                      {canEdit && (
                        <MenuItem icon={<FiEdit />} onClick={() => handleEdit(item)}>
                          Edit
                        </MenuItem>
                      )}
                      {canDelete && (
                        <MenuItem
                          icon={<FiTrash2 />}
                          onClick={() => handleDelete(item.id)}
                          color="red.500"
                        >
                          Delete
                        </MenuItem>
                      )}
                    </MenuList>
                  </Menu>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      {/* Edit Modal */}
      <InventoryForm
        isOpen={isOpen}
        onClose={() => {
          setSelectedItem(null);
          onClose();
        }}
        item={selectedItem}
      />

      {/* QR Code Modal */}
      <QRCodeModal
        isOpen={isQROpen}
        onClose={onQRClose}
        item={qrItem}
      />
    </Box>
  );
};

export default InventoryList;
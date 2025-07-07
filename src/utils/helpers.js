// Utility helper functions
import { format, differenceInDays, isAfter, isBefore, addDays } from 'date-fns';

/**
 * Format date for display
 * @param {Date} date - Date to format
 * @returns {string} Formatted date string
 */
export const formatDate = (date) => {
  return format(new Date(date), 'MMM dd, yyyy');
};

/**
 * Calculate days until expiry
 * @param {Date} expiryDate - Expiry date
 * @returns {number} Days until expiry
 */
export const getDaysUntilExpiry = (expiryDate) => {
  return differenceInDays(new Date(expiryDate), new Date());
};

/**
 * Check if item is expired
 * @param {Date} expiryDate - Expiry date
 * @returns {boolean} True if expired
 */
export const isExpired = (expiryDate) => {
  return isBefore(new Date(expiryDate), new Date());
};

/**
 * Check if item is expiring soon
 * @param {Date} expiryDate - Expiry date
 * @param {number} warningDays - Days before expiry to warn
 * @returns {boolean} True if expiring soon
 */
export const isExpiringSoon = (expiryDate, warningDays = 7) => {
  const warningDate = addDays(new Date(), warningDays);
  return isBefore(new Date(expiryDate), warningDate) && isAfter(new Date(expiryDate), new Date());
};

/**
 * Generate QR code data for inventory item
 * @param {Object} item - Inventory item
 * @returns {string} QR code data
 */
export const generateQRData = (item) => {
  return JSON.stringify({
    id: item.id,
    name: item.name,
    category: item.category,
    quantity: item.quantity,
    expiryDate: item.expiryDate
  });
};

/**
 * Calculate stock status
 * @param {number} quantity - Current quantity
 * @param {number} threshold - Low stock threshold
 * @returns {string} Stock status
 */
export const getStockStatus = (quantity, threshold = 10) => {
  if (quantity === 0) return 'out_of_stock';
  if (quantity <= threshold) return 'low_stock';
  return 'in_stock';
};

/**
 * Format currency
 * @param {number} amount - Amount to format
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};
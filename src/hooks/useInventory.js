// Custom hook for inventory operations
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInventoryItems } from '../store/inventorySlice';
import { createAlert } from '../store/alertsSlice';
import { isExpired, isExpiringSoon, getStockStatus } from '../utils/helpers';
import { ALERT_TYPES, STOCK_THRESHOLDS } from '../utils/constants';

export const useInventory = () => {
  const dispatch = useDispatch();
  const { items, filteredItems, loading, error } = useSelector(state => state.inventory);
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(fetchInventoryItems());
  }, [dispatch]);

  // Monitor inventory for alerts
  useEffect(() => {
    if (items.length > 0 && user) {
      items.forEach(item => {
        // Check for low stock
        if (item.quantity <= STOCK_THRESHOLDS.LOW_STOCK) {
          dispatch(createAlert({
            type: ALERT_TYPES.LOW_STOCK,
            itemId: item.id,
            itemName: item.name,
            message: `Low stock alert: ${item.name} has only ${item.quantity} units remaining`,
            severity: 'warning',
            userId: user.uid
          }));
        }

        // Check for expiry warnings
        if (isExpiringSoon(item.expiryDate, STOCK_THRESHOLDS.EXPIRY_WARNING_DAYS)) {
          dispatch(createAlert({
            type: ALERT_TYPES.EXPIRY_WARNING,
            itemId: item.id,
            itemName: item.name,
            message: `Expiry warning: ${item.name} expires soon`,
            severity: 'warning',
            userId: user.uid
          }));
        }

        // Check for expired items
        if (isExpired(item.expiryDate)) {
          dispatch(createAlert({
            type: ALERT_TYPES.EXPIRED,
            itemId: item.id,
            itemName: item.name,
            message: `${item.name} has expired`,
            severity: 'error',
            userId: user.uid
          }));
        }
      });
    }
  }, [items, user, dispatch]);

  return {
    items,
    filteredItems,
    loading,
    error
  };
};
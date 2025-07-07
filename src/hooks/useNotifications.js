// Custom hook for notifications and alerts
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useToast } from '@chakra-ui/react';
import { fetchAlerts, dismissAlert } from '../store/alertsSlice';
import { fetchTasks } from '../store/tasksSlice';

export const useNotifications = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const { alerts } = useSelector(state => state.alerts);
  const { tasks } = useSelector(state => state.tasks);
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    if (user) {
      dispatch(fetchAlerts());
      dispatch(fetchTasks(user.uid));
    }
  }, [dispatch, user]);

  // Show toast notifications for new alerts
  useEffect(() => {
    alerts.forEach(alert => {
      if (alert.active && !alert.toastShown) {
        toast({
          title: alert.message,
          status: alert.severity,
          duration: 5000,
          isClosable: true,
          position: 'top-right'
        });
        
        // Mark as shown to prevent duplicate toasts
        alert.toastShown = true;
      }
    });
  }, [alerts, toast]);

  const dismissNotification = (alertId) => {
    dispatch(dismissAlert(alertId));
  };

  return {
    alerts,
    tasks,
    dismissNotification
  };
};
// NotificationDisplay.js
import {React, useEffect} from 'react';
import { useNotification } from '../context/NotificationContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NotificationDisplay = () => {
  const { notifications, removeNotification } = useNotification();

  useEffect(() => {
    notifications.forEach((notification) => {
      toast[notification.type](notification.message, {
        position: 'bottom-right',
        onClose: () => removeNotification(notification.id),
      });
    });
  }, [notifications, removeNotification]);

  return <ToastContainer autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover />;
};

export default NotificationDisplay;

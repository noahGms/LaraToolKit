import { showNotification } from '@mantine/notifications';

export const showSuccessNotification = (message: string) => {
  showNotification({
    title: 'Success',
    message: message,
    color: 'green',
  });
};

export const showErrorNotification = (message: string) => {
  showNotification({
    title: 'Error',
    message: message,
    color: 'red',
  });
};

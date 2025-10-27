import { useDispatch } from 'react-redux';
import { showToast } from '../features/ui/uiSlice';

export const useToast = () => {
  const dispatch = useDispatch();

  const toast = {
    success: (message, duration = 3000) => {
      dispatch(showToast({ message, type: 'success', duration }));
    },
    error: (message, duration = 4000) => {
      dispatch(showToast({ message, type: 'error', duration }));
    },
    info: (message, duration = 3000) => {
      dispatch(showToast({ message, type: 'info', duration }));
    },
    warning: (message, duration = 3500) => {
      dispatch(showToast({ message, type: 'warning', duration }));
    },
  };

  return toast;
};
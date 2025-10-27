import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { X, CheckCircle, XCircle, Info, AlertTriangle } from 'lucide-react';
import { selectToasts, removeToast } from '../features/ui/uiSlice';

const Toast = () => {
  const toasts = useSelector(selectToasts);
  const dispatch = useDispatch();
  console.log({toasts})

  const getToastIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'info':
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const getToastStyles = (type) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'info':
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  return (
    <div className="fixed top-4 right-4 z-[9999] space-y-2 pointer-events-none">
      {toasts?.map((toast) => (
        <ToastItem
          key={toast.id}
          toast={toast}
          onRemove={() => dispatch(removeToast(toast.id))}
          getIcon={getToastIcon}
          getStyles={getToastStyles}
        />
      ))}
    </div>
  );
};

const ToastItem = ({ toast, onRemove, getIcon, getStyles }) => {
  useEffect(() => {
    if (toast.duration > 0) {
      const timer = setTimeout(() => {
        onRemove();
      }, toast.duration);

      return () => clearTimeout(timer);
    }
  }, [toast.duration, onRemove]);

  return (
    <div
      className={`
        ${getStyles(toast.type)}
        pointer-events-auto
        min-w-[300px] max-w-md
        px-4 py-3
        rounded-lg shadow-lg border
        flex items-start gap-3
        animate-slide-up
      `}
    >
      <div className="flex-shrink-0 mt-0.5">{getIcon(toast.type)}</div>
      <p className="flex-1 text-sm text-gray-800">{typeof toast.message=="string"?toast.message:toast.message.message}</p>
      <button
        onClick={onRemove}
        className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
        aria-label="Close"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Toast;
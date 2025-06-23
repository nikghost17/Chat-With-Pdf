import React from 'react';
import { CheckCircle, X, AlertCircle, Info } from 'lucide-react';

export interface ToastData {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface ToastProps {
  toast: ToastData;
  onRemove: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toast, onRemove }) => {
  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-500" />;
      default:
        return <CheckCircle className="w-5 h-5 text-green-500" />;
    }
  };

  const getBorderColor = () => {
    switch (toast.type) {
      case 'success':
        return 'border-l-green-500';
      case 'error':
        return 'border-l-red-500';
      case 'info':
        return 'border-l-blue-500';
      default:
        return 'border-l-green-500';
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-lg border-l-4 ${getBorderColor()} p-4 mb-3 flex items-start gap-3 max-w-sm animate-slide-in backdrop-blur-sm`}>
      {getIcon()}
      <div className="flex-1">
        <p className="text-gray-800 font-medium text-sm">{toast.message}</p>
      </div>
      <button
        onClick={() => onRemove(toast.id)}
        className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
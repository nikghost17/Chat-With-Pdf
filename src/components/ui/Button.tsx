// // import React from 'react';
// // import { LucideIcon } from 'lucide-react';

// // interface ButtonProps {
// //   children: React.ReactNode;
// //   onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
// //   variant?: 'primary' | 'secondary' | 'ghost';
// //   size?: 'sm' | 'md' | 'lg';
// //   icon?: LucideIcon;
// //   className?: string;
// //   disabled?: boolean;
// // }

// // export const Button: React.FC<ButtonProps> = ({
// //   children,
// //   onClick,
// //   variant = 'primary',
// //   size = 'md',
// //   icon: Icon,
// //   className = '',
// //   disabled = false
// // }) => {
// //   const baseClasses = 'font-medium rounded-xl transition-all duration-200 flex items-center justify-center space-x-2';
  
// //   const variantClasses = {
// //     primary: 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:scale-105',
// //     secondary: 'bg-gray-800 hover:bg-gray-700 text-gray-300 border border-gray-700',
// //     ghost: 'text-gray-400 hover:text-white hover:bg-gray-800/50'
// //   };

// //   const sizeClasses = {
// //     sm: 'py-2 px-3 text-sm',
// //     md: 'py-3 px-4',
// //     lg: 'py-3 px-8'
// //   };

// //   return (
// //     <button
// //       onClick={onClick}
// //       disabled={disabled}
// //       className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className} ${
// //         disabled ? 'opacity-50 cursor-not-allowed' : ''
// //       }`}
// //     >
// //       {Icon && <Icon className="w-5 h-5" />}
// //       <span>{children}</span>
// //     </button>
// //   );
// // };

// import React from 'react';
// import { LucideIcon } from 'lucide-react';

// interface ButtonProps {
//   children: React.ReactNode;
//   onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
//   variant?: 'primary' | 'secondary' | 'ghost';
//   size?: 'sm' | 'md' | 'lg';
//   icon?: LucideIcon;
//   className?: string;
//   disabled?: boolean;
// }

// export const Button: React.FC<ButtonProps> = ({
//   children,
//   onClick,
//   variant = 'primary',
//   size = 'md',
//   icon: Icon,
//   className = '',
//   disabled = false
// }) => {
//   const baseClasses = 'font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
//   const variantClasses = {
//     primary: 'bg-slate-900 hover:bg-slate-800 text-white shadow-sm hover:shadow-md focus:ring-slate-500',
//     secondary: 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 hover:border-slate-400 shadow-sm focus:ring-slate-500',
//     ghost: 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:ring-slate-500'
//   };

//   const sizeClasses = {
//     sm: 'py-2 px-3 text-sm',
//     md: 'py-2.5 px-4 text-sm',
//     lg: 'py-3 px-6 text-base'
//   };

//   const iconSizeClasses = {
//     sm: 'w-4 h-4',
//     md: 'w-4 h-4',
//     lg: 'w-5 h-5'
//   };

//   return (
//     <button
//       onClick={onClick}
//       disabled={disabled}
//       className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className} ${
//         disabled ? 'opacity-50 cursor-not-allowed hover:bg-current hover:shadow-none' : ''
//       }`}
//     >
//       {Icon && <Icon className={iconSizeClasses[size]} />}
//       <span>{children}</span>
//     </button>
//   );
// };

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  className?: string;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  className = '',
  disabled = false
}) => {
  const baseClasses = 'font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl focus:ring-blue-500',
    secondary: 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 hover:border-blue-300 shadow-sm hover:shadow-md focus:ring-blue-500',
    ghost: 'text-slate-600 hover:text-blue-600 hover:bg-blue-50 focus:ring-blue-500'
  };

  const sizeClasses = {
    sm: 'py-2 px-3 text-sm',
    md: 'py-2.5 px-4 text-sm',
    lg: 'py-3 px-6 text-base'
  };

  const iconSizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className} ${
        disabled ? 'opacity-50 cursor-not-allowed hover:bg-current hover:shadow-none' : ''
      }`}
    >
      {Icon && <Icon className={iconSizeClasses[size]} />}
      <span>{children}</span>
    </button>
  );
};
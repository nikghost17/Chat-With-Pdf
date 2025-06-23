// // import React from 'react';
// // import { FileText } from 'lucide-react';

// // interface FileIconProps {
// //   size?: 'sm' | 'md' | 'lg';
// //   className?: string;
// // }

// // export const FileIcon: React.FC<FileIconProps> = ({ size = 'md', className = '' }) => {
// //   const sizeClasses = {
// //     sm: 'w-6 h-6',
// //     md: 'w-8 h-8',
// //     lg: 'w-12 h-12'
// //   };

// //   const iconSizes = {
// //     sm: 'w-3 h-3',
// //     md: 'w-4 h-4',
// //     lg: 'w-6 h-6'
// //   };

// //   return (
// //     <div className={`${sizeClasses[size]} bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0 ${className}`}>
// //       <FileText className={`${iconSizes[size]} text-red-400`} />
// //     </div>
// //   );
// // };

// import React from 'react';
// import { FileText } from 'lucide-react';

// interface FileIconProps {
//   size?: 'sm' | 'md' | 'lg';
//   className?: string;
// }

// export const FileIcon: React.FC<FileIconProps> = ({ size = 'md', className = '' }) => {
//   const sizeClasses = {
//     sm: 'w-6 h-6',
//     md: 'w-8 h-8',
//     lg: 'w-12 h-12'
//   };

//   const iconSizes = {
//     sm: 'w-3 h-3',
//     md: 'w-4 h-4',
//     lg: 'w-6 h-6'
//   };

//   return (
//     <div className={`${sizeClasses[size]} bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0 border border-slate-200 shadow-sm ${className}`}>
//       <FileText className={`${iconSizes[size]} text-slate-600`} />
//     </div>
//   );
// };

import React from 'react';
import { FileText } from 'lucide-react';

interface FileIconProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const FileIcon: React.FC<FileIconProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-6 h-6'
  };

  return (
    <div className={`${sizeClasses[size]} bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg flex items-center justify-center flex-shrink-0 border border-blue-200/50 shadow-sm ${className}`}>
      <FileText className={`${iconSizes[size]} text-blue-600`} />
    </div>
  );
};
// // import React, { useRef, useState } from 'react';
// // import { Upload, ChevronDown } from 'lucide-react';
// // import { Button } from '../ui/Button';

// // interface UploadAreaProps {
// //   onFilesSelected: (files: File[]) => void;
// //   accept?: string;
// //   multiple?: boolean;
// //   maxSize?: number; // in bytes
// // }

// // export const UploadArea: React.FC<UploadAreaProps> = ({
// //   onFilesSelected,
// //   accept = '.pdf',
// //   multiple = true,
// //   maxSize
// // }) => {
// //   const [isDragOver, setIsDragOver] = useState(false);
// //   const fileInputRef = useRef<HTMLInputElement>(null);

// //   const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
// //     e.preventDefault();
// //     setIsDragOver(true);
// //   };

// //   const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
// //     e.preventDefault();
// //     setIsDragOver(false);
// //   };

// //   const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
// //     e.preventDefault();
// //     setIsDragOver(false);
// //     const files = Array.from(e.dataTransfer.files);
// //     const validFiles = validateFiles(files);
// //     if (validFiles.length > 0) {
// //       onFilesSelected(validFiles);
// //     }
// //   };

// //   const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const files = Array.from(e.target.files || []);
// //     const validFiles = validateFiles(files);
// //     if (validFiles.length > 0) {
// //       onFilesSelected(validFiles);
// //     }
// //     // Reset input value to allow selecting the same file again
// //     e.target.value = '';
// //   };

// //   const validateFiles = (files: File[]): File[] => {
// //     let validFiles = files;
    
// //     // Filter by accept type
// //     if (accept === '.pdf') {
// //       validFiles = validFiles.filter(file => file.type === 'application/pdf');
// //     }
    
// //     // Filter by max size
// //     if (maxSize) {
// //       validFiles = validFiles.filter(file => file.size <= maxSize);
// //     }
    
// //     return validFiles;
// //   };

// //   const handleBrowseClick = () => {
// //     fileInputRef.current?.click();
// //   };

// //   return (
// //     <div className="max-w-2xl mx-auto">
// //       <div
// //         className={`relative border-2 border-dashed rounded-2xl p-12 transition-all duration-300 ${
// //           isDragOver
// //             ? 'border-blue-400 bg-blue-500/10 scale-105'
// //             : 'border-gray-600 bg-gray-800/30 hover:border-gray-500 hover:bg-gray-800/50'
// //         }`}
// //         onDragOver={handleDragOver}
// //         onDragLeave={handleDragLeave}
// //         onDrop={handleDrop}
// //       >
// //         <input
// //           ref={fileInputRef}
// //           type="file"
// //           accept={accept}
// //           multiple={multiple}
// //           onChange={handleFileSelect}
// //           className="hidden"
// //         />
        
// //         <div className="space-y-6">
// //           <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
// //             <Upload className="w-8 h-8 text-white" />
// //           </div>
// //           <div className="space-y-2">
// //             <p className="text-lg font-semibold text-white">
// //               Drop your PDF files here, or click to browse
// //             </p>
// //             <p className="text-gray-400">
// //               Drag & drop your documents to get started
// //             </p>
// //           </div>
// //           <Button 
// //             onClick={handleBrowseClick}
// //             variant="primary"
// //             size="lg"
// //             icon={Upload}
// //             className="mx-auto"
// //           >
// //             Choose Files
// //             <ChevronDown className="w-4 h-4 ml-2" />
// //           </Button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };


// import React, { useRef, useState } from 'react';
// import { Upload, FileText } from 'lucide-react';
// import { Button } from '../ui/Button';

// interface UploadAreaProps {
//   onFilesSelected: (files: File[]) => void;
//   accept?: string;
//   multiple?: boolean;
//   maxSize?: number; // in bytes
// }

// export const UploadArea: React.FC<UploadAreaProps> = ({
//   onFilesSelected,
//   accept = '.pdf',
//   multiple = true,
//   maxSize
// }) => {
//   const [isDragOver, setIsDragOver] = useState(false);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     setIsDragOver(true);
//   };

//   const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     setIsDragOver(false);
//   };

//   const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     setIsDragOver(false);
//     const files = Array.from(e.dataTransfer.files);
//     const validFiles = validateFiles(files);
//     if (validFiles.length > 0) {
//       onFilesSelected(validFiles);
//     }
//   };

//   const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = Array.from(e.target.files || []);
//     const validFiles = validateFiles(files);
//     if (validFiles.length > 0) {
//       onFilesSelected(validFiles);
//     }
//     // Reset input value to allow selecting the same file again
//     e.target.value = '';
//   };

//   const validateFiles = (files: File[]): File[] => {
//     let validFiles = files;
    
//     // Filter by accept type
//     if (accept === '.pdf') {
//       validFiles = validFiles.filter(file => file.type === 'application/pdf');
//     }
    
//     // Filter by max size
//     if (maxSize) {
//       validFiles = validFiles.filter(file => file.size <= maxSize);
//     }
    
//     return validFiles;
//   };

//   const handleBrowseClick = () => {
//     fileInputRef.current?.click();
//   };

//   return (
//     <div className="max-w-3xl mx-auto">
//       <div
//         className={`relative border-2 border-dashed rounded-xl p-16 transition-all duration-200 cursor-pointer ${
//           isDragOver
//             ? 'border-blue-500 bg-blue-50 shadow-lg'
//             : 'border-slate-300 bg-white hover:border-slate-400 hover:bg-slate-50'
//         }`}
//         onDragOver={handleDragOver}
//         onDragLeave={handleDragLeave}
//         onDrop={handleDrop}
//         onClick={handleBrowseClick}
//       >
//         <input
//           ref={fileInputRef}
//           type="file"
//           accept={accept}
//           multiple={multiple}
//           onChange={handleFileSelect}
//           className="hidden"
//         />
        
//         <div className="space-y-6 text-center">
//           <div className="w-16 h-16 mx-auto bg-slate-100 rounded-xl flex items-center justify-center shadow-sm">
//             <FileText className="w-8 h-8 text-slate-600" />
//           </div>
          
//           <div className="space-y-3">
//             <h3 className="text-xl font-semibold text-slate-900">
//               Upload your documents
//             </h3>
//             <div className="space-y-1">
//               <p className="text-slate-600 font-medium">
//                 Drag and drop your PDF files here, or click to browse
//               </p>
//               <p className="text-sm text-slate-500">
//                 Supports PDF files up to {maxSize ? `${Math.round(maxSize / (1024 * 1024))}MB` : '10MB'}
//               </p>
//             </div>
//           </div>
          
//           <Button 
//             onClick={(e) => {
//               e.stopPropagation();
//               handleBrowseClick();
//             }}
//             variant="primary"
//             size="lg"
//             icon={Upload}
//             className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-3 font-medium shadow-lg hover:shadow-xl transition-all duration-200 "
//           >
//             Select Files
//           </Button>
//         </div>
//       </div>
      
//       <div className="mt-4 flex justify-center">
//         <p className="text-xs text-slate-400">
//           Your files are processed securely and never stored permanently
//         </p>
//       </div>
//     </div>
//   );
// };
"use client";

import React, { useRef, useState } from 'react';
import { Upload, FileText } from 'lucide-react';
import { Button } from '../ui/Button';

interface UploadAreaProps {
  onFilesSelected: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // in bytes
  isUploading?: boolean;
}

export const UploadArea: React.FC<UploadAreaProps> = ({
  onFilesSelected,
  accept = '.pdf',
  multiple = true,
  maxSize,
  isUploading = false 
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    const validFiles = validateFiles(files);
    if (validFiles.length > 0) {
      onFilesSelected(validFiles);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = validateFiles(files);
    if (validFiles.length > 0) {
      onFilesSelected(validFiles);
    }
    // Reset input value to allow selecting the same file again
    e.target.value = '';
  };

  const validateFiles = (files: File[]): File[] => {
    let validFiles = files;
    
    // Filter by accept type
    if (accept === '.pdf') {
      validFiles = validFiles.filter(file => file.type === 'application/pdf');
    }
    
    // Filter by max size
    if (maxSize) {
      validFiles = validFiles.filter(file => file.size <= maxSize);
    }
    
    return validFiles;
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div
        className={`relative border-2 border-dashed rounded-xl p-16 transition-all duration-200 cursor-pointer ${
          isDragOver
            ? 'border-blue-500 bg-blue-50 shadow-lg ring-4 ring-blue-200/50'
            : 'border-slate-300 bg-gradient-to-br from-white to-slate-50 hover:border-blue-400 hover:bg-blue-50/30 shadow-sm hover:shadow-md'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleBrowseClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileSelect}
          className="hidden"
        />
        
        <div className="space-y-3 text-center">
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
            <FileText className="w-8 h-8 text-white" />
          </div>
          
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-slate-900">
              Upload your documents
            </h3>
            <div className="space-y-1">
              <p className="text-slate-600 font-medium">
                <span className='text-slate-950'>Drag and drop </span>
                your PDF files here, or
                <span className='text-slate-950'> click to browse</span>
              </p>
              <p className="text-sm text-slate-500">
                Supports PDF files up to {maxSize ? `${Math.round(maxSize / (1024 * 1024))}MB` : '10MB'}
              </p>
            </div>
          </div>
          <div className="flex justify-center">
            <Button 
              onClick={(e) => {
                e.stopPropagation();
                handleBrowseClick();
              }}
              variant="primary"
              size="lg"
              icon={Upload}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 font-medium shadow-lg hover:shadow-xl transition-all duration-200"
            >
              {isUploading ? 'Uploading...' : 'Select Files'}
            </Button>
          </div>
        </div>
      </div>
      
      <div className="mt-4 flex justify-center">
        <p className="text-xs text-slate-400">
          Your files are processed securely and never stored permanently
        </p>
      </div>
    </div>
  );
};

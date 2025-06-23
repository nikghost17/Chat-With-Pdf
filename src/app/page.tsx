// 'use client'

// import React, { useState, useRef } from 'react';
// import { Upload, FileText, FolderPlus, MessageCircle, Users, Shield, Menu, X, ChevronDown, Settings, History, Star } from 'lucide-react';
// import Bottom from '@/components/sidebar/bottom';

// type UploadedFile = {
//   id: string;
//   name: string;
//   size: number;
//   uploadTime: string;
// }

// const DocuChat: React.FC = () => {
//   const [isDragOver, setIsDragOver] = useState<boolean>(false);
//   const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
//   const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
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
//     const pdfFiles = files.filter(file => file.type === 'application/pdf');
//     handleFiles(pdfFiles);
//   };

//   const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = Array.from(e.target.files || []);
//     const pdfFiles = files.filter(file => file.type === 'application/pdf');
//     handleFiles(pdfFiles);
//   };

//   const handleFiles = (files: File[]) => {
//     const newFiles: UploadedFile[] = files.map(file => ({
//       id: Date.now() + Math.random().toString(),
//       name: file.name,
//       size: file.size,
//       uploadTime: new Date().toLocaleTimeString()
//     }));
//     setUploadedFiles(prev => [...prev, ...newFiles]);
//   };

//   const formatFileSize = (bytes: number): string => {
//     if (bytes === 0) return '0 Bytes';
//     const k = 1024;
//     const sizes = ['Bytes', 'KB', 'MB', 'GB'];
//     const i = Math.floor(Math.log(bytes) / Math.log(k));
//     return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex">
//       {/* Sidebar */}
//       <div className={`${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:relative z-30 w-80 h-screen bg-gray-900/95 backdrop-blur-xl border-r border-gray-700/50 transition-transform duration-300 ease-in-out`}>
//         <div className="flex flex-col h-full">
//           {/* Header */}
//           <div className="p-6 border-b border-gray-700/50">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center space-x-3">
//                 <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
//                   <MessageCircle className="w-6 h-6 text-white" />
//                 </div>
//                 <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
//                   DocuChat
//                 </h1>
//               </div>
//               <button 
//                 onClick={() => setIsMenuOpen(false)}
//                 className="lg:hidden text-gray-400 hover:text-white transition-colors"
//               >
//                 <X className="w-6 h-6" />
//               </button>
//             </div>
//           </div>

//           {/* Upload Section */}
//           <div className="p-6 space-y-4">
//             <button 
//               onClick={() => fileInputRef.current?.click()}
//               className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center space-x-2 transition-all duration-200 transform hover:scale-105 shadow-lg"
//             >
//               <Upload className="w-5 h-5" />
//               <span>Upload PDF</span>
//             </button>
            
//             <button className="w-full bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium py-3 px-4 rounded-xl flex items-center justify-center space-x-2 transition-colors border border-gray-700">
//               <FolderPlus className="w-5 h-5" />
//               <span>New Collection</span>
//             </button>
//           </div>

//           {/* File List */}
//           <div className="flex-1 px-6 overflow-y-auto">
//             <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Recent Files</h3>
//             <div className="space-y-2">
//               {uploadedFiles.map((file) => (
//                 <div key={file.id} className="bg-gray-800/50 hover:bg-gray-800 rounded-lg p-3 cursor-pointer transition-colors border border-gray-700/30 hover:border-gray-600/50">
//                   <div className="flex items-start space-x-3">
//                     <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
//                       <FileText className="w-4 h-4 text-red-400" />
//                     </div>
//                     <div className="flex-1 min-w-0">
//                       <p className="text-sm font-medium text-white truncate">{file.name}</p>
//                       <p className="text-xs text-gray-400">{formatFileSize(file.size)} • {file.uploadTime}</p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Bottom Section */}
//           <div className="p-6 border-t border-gray-700/50 space-y-3">
//             <div className="text-center text-sm text-gray-400">
//               <p>Sign in to save your chat history</p>
//             </div>
//             <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors">
//               Sign In
//             </button>
//             <div className="flex items-center justify-between text-sm">
//               <div className="flex items-center space-x-4">
//                 <button className="text-gray-400 hover:text-white transition-colors flex items-center space-x-1">
//                   <Settings className="w-4 h-4" />
//                   <span>Settings</span>
//                 </button>
//                 <button className="text-gray-400 hover:text-white transition-colors flex items-center space-x-1">
//                   <History className="w-4 h-4" />
//                   <span>History</span>
//                 </button>
//               </div>
//             </div>
//           </div>
         
          
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col">
//         {/* Mobile Header */}
//         <div className="lg:hidden bg-gray-900/95 backdrop-blur-xl border-b border-gray-700/50 p-4">
//           <div className="flex items-center justify-between">
//             <button 
//               onClick={() => setIsMenuOpen(true)}
//               className="text-gray-400 hover:text-white transition-colors"
//             >
//               <Menu className="w-6 h-6" />
//             </button>
//             <div className="flex items-center space-x-2">
//               <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
//                 <MessageCircle className="w-5 h-5 text-white" />
//               </div>
//               <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
//                 DocuChat
//               </h1>
//             </div>
//             <div className="w-6"></div>
//           </div>
//         </div>

//         {/* Hero Section */}
//         <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
//           <div className="max-w-4xl mx-auto space-y-8">
//             <div className="space-y-4">
//               <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
//                 Chat with any{' '}
//                 <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
//                   PDF
//                 </span>
//               </h1>
//               <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
//                 Join millions of{' '}
//                 <span className="text-orange-400 font-semibold">students, researchers and professionals</span>{' '}
//                 to instantly analyze documents and get insights with AI
//               </p>
//             </div>

//             {/* Upload Area */}
//             <div className="max-w-2xl mx-auto">
//               <div
//                 className={`relative border-2 border-dashed rounded-2xl p-12 transition-all duration-300 ${
//                   isDragOver
//                     ? 'border-blue-400 bg-blue-500/10 scale-105'
//                     : 'border-gray-600 bg-gray-800/30 hover:border-gray-500 hover:bg-gray-800/50'
//                 }`}
//                 onDragOver={handleDragOver}
//                 onDragLeave={handleDragLeave}
//                 onDrop={handleDrop}
//               >
//                 <input
//                   ref={fileInputRef}
//                   type="file"
//                   accept=".pdf"
//                   multiple
//                   onChange={handleFileSelect}
//                   className="hidden"
//                 />
                
//                 <div className="space-y-6">
//                   <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
//                     <Upload className="w-8 h-8 text-white" />
//                   </div>
//                   <div className="space-y-2">
//                     <p className="text-lg font-semibold text-white">
//                       Drop your PDF files here, or click to browse
//                     </p>
//                     <p className="text-gray-400">
//                       Drag & drop your documents to get started
//                     </p>
//                   </div>
//                   <button 
//                     onClick={() => fileInputRef.current?.click()}
//                     className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center space-x-2 mx-auto"
//                   >
//                     <Upload className="w-5 h-5" />
//                     <span>Choose Files</span>
//                     <ChevronDown className="w-4 h-4" />
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Trust Indicators */}
//             <div className="space-y-4">
//               <p className="text-gray-400">Trusted by students and researchers from top institutions</p>
//               <div className="flex items-center justify-center space-x-8 text-gray-500">
//                 <div className="flex items-center space-x-2">
//                   <Users className="w-5 h-5" />
//                   <span className="text-sm">10M+ Users</span>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <Shield className="w-5 h-5" />
//                   <span className="text-sm">Secure & Private</span>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <Star className="w-5 h-5" />
//                   <span className="text-sm">4.9 Rating</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu Overlay */}
//       {isMenuOpen && (
//         <div 
//           className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-20"
//           onClick={() => setIsMenuOpen(false)}
//         />
//       )}
//     </div>
//   );
// };

// export default DocuChat;

import DocuChat from './../components/DouChat/DouChat'

export default function Home() {
  return <DocuChat />
}
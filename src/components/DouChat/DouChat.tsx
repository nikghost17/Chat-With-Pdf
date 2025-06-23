"use client";

import React, { useState, useRef } from 'react';
import { Sidebar } from '../Sidebar/Sidebar';
import { MobileHeader } from '../Header/MobileHeader';
import { HeroSection } from '../Hero/HeroSection';
import { ChatInterface } from './ChatInterface';
import { useFileUpload } from '../../hooks/useFileUpload';
import { UploadedFile } from '../../lib/types';
import { createFolder } from '@/lib/supabaseUtils';
import { useToast } from '../../hooks/useToast';
import { ToastContainer } from '../Toast/ToastContainer';


const DocuChat: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<UploadedFile | null>(null);
  const {isUploading ,uploadedFiles, handleFiles } = useFileUpload();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [folderAdded, setFolderAdded] = useState(false)
  const {toasts, addToast, removeToast} = useToast();
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const uploadedFileObjects = await handleFiles(files);
    
    // Automatically select the first uploaded file to show chat interface
    if (uploadedFileObjects && uploadedFileObjects.length > 0) {
      setSelectedFile(uploadedFileObjects[0]);
    }
  };

  const handleNewCollection = async () => {
    // const folderName = prompt('Enter collection name:');
    // if (folderName) {
    //   const status = await createFolder(folderName);
    //   if (status) {
    //     // Consider replacing alert with a proper toast notification
    //     alert(status);
    //   }
    //   setFolderAdded(prev => !prev)
    // }
    const folderName = prompt('Enter collection name:');
    if (folderName) {
      try {
        const status = await createFolder(folderName);
        if (status) {
          // Determine toast type based on status message
          const isError = status.toLowerCase().includes('error') || 
                         status.toLowerCase().includes('failed') || 
                         status.toLowerCase().includes('exists');
          
          addToast(status, isError ? 'error' : 'success');
        }
        setFolderAdded(prev => !prev);
      } catch (error) {
        addToast('Failed to create folder. Please try again.', 'error');
      }
    }
  };

  const handleFileClick = (file: UploadedFile) => {
    setSelectedFile(file);
  };

  const handleBackToHome = () => {
    setSelectedFile(null);
  };

  const handleSignIn = () => {
    console.log('Sign in clicked');
  };

  const handleSettings = () => {
    console.log('Settings clicked');
  };

  const handleHistory = () => {
    console.log('History clicked');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex">
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf"
        multiple
        onChange={handleFileSelect}
        className="hidden"
      />

      <Sidebar
        isUploading={isUploading}
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        uploadedFiles={uploadedFiles}
        onUploadClick={handleUploadClick}
        onNewCollectionClick={handleNewCollection}
        onFileClick={handleFileClick}
        onSignInClick={handleSignIn}
        onSettingsClick={handleSettings}
        onHistoryClick={handleHistory}
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
        folderAdded={folderAdded}
      />

      <div className="flex-1 flex flex-col bg-white/80 backdrop-blur-sm">
        <MobileHeader onMenuClick={() => setIsMenuOpen(true)} />
        
        {selectedFile ? (
          <ChatInterface 
            file={selectedFile} 
            onBackToHome={handleBackToHome}
          />
        ) : (
          <HeroSection onFilesSelected={async (files) => {
            const uploadedFileObjects = await handleFiles(files);
            console.log('Uploaded files:', uploadedFileObjects);
            // Automatically select the first uploaded file to show chat interface
            if (uploadedFileObjects && uploadedFileObjects.length > 0) {
              setSelectedFile(uploadedFileObjects[0]);
            }
          }} isUploading={isUploading}/>
        )}
      </div>

      {/* Mobile overlay */}
      {isMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-20"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
       <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
};

export default DocuChat;
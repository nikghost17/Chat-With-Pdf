"use client";

import React, { useState } from 'react';
import { PDFViewer } from './PDFViewer';
import { ChatSection } from './ChatSection';
import { UploadedFile } from '../../lib/types';
interface ChatInterfaceProps {
  file: UploadedFile;
  onBackToHome: () => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ file, onBackToHome }) => {
  const [isPdfMaximized, setIsPdfMaximized] = useState(false);

  const togglePdfMaximize = () => {
    setIsPdfMaximized(!isPdfMaximized);
  };

  return (
    <div className="flex-1 flex bg-gradient-to-br from-slate-50 to-white min-h-screen">
      <PDFViewer 
        file={file}
        onBackToHome={onBackToHome}
        isMaximized={isPdfMaximized}
        onToggleMaximize={togglePdfMaximize}
      />
      
      {!isPdfMaximized && (
        <ChatSection fileName={file.name || 'document'} />
      )}
    </div>
  );
};
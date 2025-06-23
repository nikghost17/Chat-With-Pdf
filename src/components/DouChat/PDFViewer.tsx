"use client";

import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { ArrowLeft, Maximize2, Minimize2, ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from 'lucide-react';
import { UploadedFile } from '../../lib/types';

if (typeof Promise.withResolvers === 'undefined') {
    if (window)
        // @ts-expect-error This does not exist outside of polyfill which this is doing
        window.Promise.withResolvers = function () {
            let resolve, reject;
            const promise = new Promise((res, rej) => {
                resolve = res;
                reject = rej;
            });
            return { promise, resolve, reject };
        };
}

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/legacy/build/pdf.worker.min.mjs',
    import.meta.url
).toString();

interface PDFViewerProps {
  file: UploadedFile;
  onBackToHome: () => void;
  isMaximized: boolean;
  onToggleMaximize: () => void;
}

export const PDFViewer: React.FC<PDFViewerProps> = ({ 
  file, 
  onBackToHome, 
  isMaximized, 
  onToggleMaximize 
}) => {
  const [pdfScale, setPdfScale] = useState(1);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);

  const handleZoomIn = () => {
    setPdfScale(prev => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setPdfScale(prev => Math.max(prev - 0.25, 0.5));
  };

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  const goToPrevPage = () => {
    setPageNumber(prev => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setPageNumber(prev => Math.min(prev + 1, numPages || 1));
  };

  return (
    <div className={`bg-white border-r border-slate-200 flex flex-col transition-all duration-300 ${
      isMaximized ? 'w-full' : 'w-2/3'
    }`}>
      {/* PDF Header */}
      <div className="flex items-center justify-between p-5 border-b border-slate-200 bg-gradient-to-r from-white to-slate-50">
        <button
          onClick={onBackToHome}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors font-medium"
        >
          <ArrowLeft size={20} />
          Back
        </button>
        
        <div className="flex items-center gap-2 text-slate-700">
          <span className="text-sm font-semibold truncate max-w-xs">
            {typeof file === 'string' ? file : file.name}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={goToPrevPage}
            disabled={pageNumber <= 1}
            className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            title="Previous Page"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="text-sm text-slate-600 min-w-[80px] text-center font-medium">
            {pageNumber} / {numPages || 1}
          </span>
          <button
            onClick={goToNextPage}
            disabled={pageNumber >= (numPages || 1)}
            className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            title="Next Page"
          >
            <ChevronRight size={16} />
          </button>
          <div className="w-px h-6 bg-slate-300 mx-2"></div>
          <button
            onClick={handleZoomOut}
            className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            title="Zoom Out"
          >
            <ZoomOut size={16} />
          </button>
          <span className="text-sm text-slate-600 min-w-[60px] text-center font-medium">
            {Math.round(pdfScale * 100)}%
          </span>
          <button
            onClick={handleZoomIn}
            className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            title="Zoom In"
          >
            <ZoomIn size={16} />
          </button>
          <button
            onClick={onToggleMaximize}
            className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors ml-1"
            title={isMaximized ? "Minimize" : "Maximize"}
          >
            {isMaximized ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
        </div>
      </div>

      {/* PDF Content */}
      <div className="flex-1 overflow-auto bg-slate-50 p-6 flex justify-center">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <Document
            file={file.url}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={
              <div className="flex items-center justify-center h-96 bg-white">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-slate-600 font-medium">Loading PDF...</p>
                </div>
              </div>
            }
            error={
              <div className="flex items-center justify-center h-96 bg-white">
                <div className="text-center">
                  <p className="text-red-600 mb-2 font-semibold">Failed to load PDF</p>
                  <p className="text-slate-500 text-sm">Please try uploading the file again</p>
                </div>
              </div>
            }
          >
            <Page
              pageNumber={pageNumber}
              scale={pdfScale}
              loading={
                <div className="flex items-center justify-center h-96 bg-white">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              }
              renderAnnotationLayer={false}
              renderTextLayer={false}
            />
          </Document>
        </div>
      </div>
    </div>
  );
};
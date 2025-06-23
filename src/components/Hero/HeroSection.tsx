import React from 'react'
import { UploadArea } from '@/components/Upload/UploadArea'
import { TrustIndicators } from './TrustIndicators'

interface HeroSectionProps {
  onFilesSelected: (files: File[]) => void
  isUploading?: boolean
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onFilesSelected,
  isUploading,
}) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-10 text-center">
      <div className="max-w-5xl mx-auto space-y-12">
        <div className="space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-600 leading-tight">
            Chat with any{' '}
             <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              PDF
             </span>
           </h1>
          <div className="space-y-2">
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium">
              Transform your PDFs into interactive conversations
            </p>
            <p className="text-base text-slate-500 max-w-2xl mx-auto">
              Trusted by professionals, researchers, and students worldwide for efficient document analysis and insights
            </p>
          </div>
        </div>

        <div className="space-y-8">
          <UploadArea onFilesSelected={onFilesSelected} isUploading={isUploading} />
          
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Secure & Private</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>AI-Powered Analysis</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>Instant Results</span>
            </div>
          </div>
        </div>

        {/* {<TrustIndicators />} */}
      </div>
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

interface FileData {
  id: string
  name: string
  size: number
  mimetype: string
  created_at: string
  updated_at: string
  last_accessed_at: string
  publicUrl: string
  filePath: string
}

interface ApiResponse {
  success: boolean
  files: FileData[]
  count: number
  folderId: string
  error?: string
}

export default function FolderFilesPage() {
  const params = useParams()
  const folderId = params.folderId as string
  
  const [files, setFiles] = useState<FileData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (folderId) {
      fetchFiles()
    }
  }, [folderId])

  const fetchFiles = async () => {
    try {
      const response = await fetch(`/api/allfiles/${folderId}`)
      const data: ApiResponse = await response.json()
      
      if (data.success) {
        setFiles(data.files)
      } else {
        setError(data.error || 'Failed to fetch files')
      }
    } catch (err) {
      setError('Network error occurred')
      console.error('Fetch error:', err)
    } finally {
      setLoading(false)
    }
    console.log('Files from API:', files);
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getFileIcon = (mimetype: string): string => {
    if (mimetype.includes('pdf')) return '📄'
    if (mimetype.includes('image')) return '🖼️'
    if (mimetype.includes('text')) return '📝'
    if (mimetype.includes('video')) return '🎥'
    if (mimetype.includes('audio')) return '🎵'
    if (mimetype.includes('zip') || mimetype.includes('rar')) return '🗜️'
    if (mimetype.includes('word') || mimetype.includes('document')) return '📝'
    if (mimetype.includes('excel') || mimetype.includes('spreadsheet')) return '📊'
    if (mimetype.includes('powerpoint') || mimetype.includes('presentation')) return '📽️'
    return '📄'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading files...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Files</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <div className="space-x-4">
            <button 
              onClick={fetchFiles}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
            <Link 
              href="/allfiles"
              className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors inline-block"
            >
              Back to Folders
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-blue-600 hover:text-blue-800">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">D</span>
                  </div>
                  <span className="font-semibold text-lg">DocuChat</span>
                </div>
              </Link>
              <span className="text-gray-400">/</span>
              <Link href="/allfiles" className="text-blue-600 hover:text-blue-800 font-medium">
                All Folders
              </Link>
              <span className="text-gray-400">/</span>
              <h1 className="text-2xl font-bold text-gray-800">{decodeURIComponent(folderId)}</h1>
            </div>
            <div className="text-sm text-gray-500">
              {files.length} {files.length === 1 ? 'file' : 'files'} found
            </div>
          </div>
          
          {/* Back Button */}
          <div className="mt-4">
            <Link 
              href="/allfiles"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
            >
              <span className="mr-2">←</span>
              Back to Folders
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {files.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📄</div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">No files found</h3>
            <p className="text-gray-600 mb-4">This folder appears to be empty.</p>
            <Link 
              href="/allfiles"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors inline-block"
            >
              Back to Folders
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {files.map((file) => (
              <div
                key={file.id + file.filePath || file.name}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-blue-200 transition-all duration-200 cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-3xl">
                    {getFileIcon(file.mimetype)}
                  </div>
                  <div className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                    {file.mimetype.split('/')[1]?.toUpperCase() || 'FILE'}
                  </div>
                </div>
                
                <div className="mb-4">
                  <h3 className="font-medium text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {file.name}
                  </h3>
                  <div className="space-y-1 text-sm text-gray-500">
                    <div className="flex justify-between">
                      <span>Size:</span>
                      <span>{formatFileSize(file.size)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Created:</span>
                      <span>{formatDate(file.created_at)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <a
                    href={file.publicUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-blue-50 text-blue-600 text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors text-center"
                  >
                    View
                  </a>
                  <a
                    href={file.publicUrl}
                    download={file.name}
                    className="flex-1 bg-gray-50 text-gray-600 text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors text-center"
                  >
                    Download
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
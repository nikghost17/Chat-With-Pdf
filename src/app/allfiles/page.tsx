'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface FolderData {
  id: string
  name: string
  created_at: string
  updated_at: string
  type: 'folder'
}

interface ApiResponse {
  success: boolean
  folders: FolderData[]
  count: number
  error?: string
}

export default function AllFilesPage() {
  const [folders, setFolders] = useState<FolderData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchFolders()
  }, [])

  const fetchFolders = async () => {
    try {
      const response = await fetch('/api/allfiles')
      const data: ApiResponse = await response.json()
      
      if (data.success) {
        setFolders(data.folders)
      } else {
        setError(data.error || 'Failed to fetch folders')
      }
    } catch (err) {
      setError('Network error occurred')
      console.error('Fetch error:', err)
    } finally {
      setLoading(false)
    }
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading folders...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Folders</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={fetchFolders}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
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
              <h1 className="text-2xl font-bold text-gray-800">All Folders</h1>
            </div>
            <div className="text-sm text-gray-500">
              {folders.length} {folders.length === 1 ? 'folder' : 'folders'} found
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {folders.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📁</div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">No folders found</h3>
            <p className="text-gray-600">Your bucket appears to be empty.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {folders.map((folder) => (
              <Link
                key={folder.id + folder.name || folder.name}
                href={`/allfiles/${folder.name}`}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-blue-200 transition-all duration-200 cursor-pointer group block"
              >
                <div className="text-center">
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-200">
                    📁
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="font-medium text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                      {folder.name}
                    </h3>
                    <div className="text-sm text-gray-500">
                      <div>Created: {formatDate(folder.created_at)}</div>
                    </div>
                  </div>

                  <div className="bg-blue-50 text-blue-600 text-sm font-medium px-4 py-2 rounded-lg group-hover:bg-blue-100 transition-colors">
                    Open Folder
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
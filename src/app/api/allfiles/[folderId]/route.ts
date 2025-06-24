import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET(
  request: Request,
  { params }: { params: { folderId: string } }
) {
    
  try {
    const { folderId } = params
    console.log(`Fetching files for folder: ${folderId}`);
    // Fetch all files from the specific folder
    const { data: files, error } = await supabase.storage
      .from('new-bucket')
      .list(folderId, {
        limit: 100,
        offset: 0,
        sortBy: { column: 'created_at', order: 'desc' }
      })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch files from folder' },
        { status: 500 }
      )
    }

    // Filter only actual files (not subfolders) and get public URLs
    const filesWithUrls = files?.filter(item => 
      item.name.includes('.') && item.metadata !== null
    ).map(file => {
      const filePath = `${folderId}/${file.name}`
      const { data: urlData } = supabase.storage
        .from('new-bucket')
        .getPublicUrl(filePath)
      
      return {
        id: file.id,
        name: file.name,
        size: file.metadata?.size || 0,
        mimetype: file.metadata?.mimetype || 'application/octet-stream',
        created_at: file.created_at,
        updated_at: file.updated_at,
        last_accessed_at: file.last_accessed_at,
        publicUrl: urlData.publicUrl,
        filePath: filePath
      }
    }) || []

    return NextResponse.json({
      success: true,
      files: filesWithUrls,
      count: filesWithUrls.length,
      folderId: folderId
    })

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
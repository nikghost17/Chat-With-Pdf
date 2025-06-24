import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET() {
  try {
    // Fetch all items from the 'new-bucket' bucket root
    const { data: items, error } = await supabase.storage
      .from('new-bucket')
      .list('', {
        limit: 100,
        offset: 0,
        sortBy: { column: 'created_at', order: 'desc' }
      })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch folders from bucket' },
        { status: 500 }
      )
    }

    // Filter to get only folders (items without file extensions or with null metadata)
    const folders = items?.filter(item => 
      !item.name.includes('.') && item.metadata === null
    ).map(folder => ({
      id: folder.id,
      name: folder.name,
      created_at: folder.created_at,
      updated_at: folder.updated_at,
      type: 'folder'
    })) || []

    return NextResponse.json({
      success: true,
      folders: folders,
      count: folders.length
    })

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
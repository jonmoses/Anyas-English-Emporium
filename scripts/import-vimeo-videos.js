#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */

/**
 * Script to automatically import videos from Vimeo to Supabase database
 *
 * Usage: node scripts/import-vimeo-videos.js
 *
 * This script will:
 * 1. Fetch all videos from your Vimeo account
 * 2. Extract metadata (title, description, duration, thumbnails)
 * 3. Insert/update videos in Supabase database
 * 4. Handle duplicates gracefully
 */

require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')

// Initialize Supabase client with service role key (bypasses RLS for admin operations)
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  supabaseServiceKey
)

// Vimeo API configuration
const VIMEO_ACCESS_TOKEN = process.env.VIMEO_ACCESS_TOKEN
const VIMEO_BASE_URL = 'https://api.vimeo.com'

if (!VIMEO_ACCESS_TOKEN) {
  console.error('❌ VIMEO_ACCESS_TOKEN is required in .env.local')
  process.exit(1)
}

// Helper function to make Vimeo API requests
async function makeVimeoRequest(endpoint) {
  const response = await fetch(`${VIMEO_BASE_URL}${endpoint}`, {
    headers: {
      'Authorization': `Bearer ${VIMEO_ACCESS_TOKEN}`,
      'Accept': 'application/vnd.vimeo.*+json;version=3.4'
    }
  })

  if (!response.ok) {
    throw new Error(`Vimeo API error: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

// Get video thumbnail URL from Vimeo data
function getThumbnailUrl(vimeoVideo) {
  if (vimeoVideo.pictures && vimeoVideo.pictures.sizes) {
    // Get the largest thumbnail
    const sizes = vimeoVideo.pictures.sizes
    const largest = sizes[sizes.length - 1]
    return largest.link
  }
  return null
}

// Extract Vimeo ID from video URI
function extractVimeoId(uri) {
  // URI format: /videos/123456789
  return uri.split('/videos/')[1]
}

// Determine video category based on title/description (you can customize this)
function categorizeVideo(title, description) {
  const content = (title + ' ' + (description || '')).toLowerCase()

  if (content.includes('grammar')) return 'grammar'
  if (content.includes('vocabulary') || content.includes('vocab')) return 'vocabulary'
  if (content.includes('pronunciation') || content.includes('pronounce')) return 'pronunciation'
  if (content.includes('conversation') || content.includes('speaking')) return 'conversation'
  if (content.includes('business')) return 'business'
  if (content.includes('listening')) return 'listening'
  if (content.includes('writing')) return 'writing'
  if (content.includes('reading')) return 'reading'

  // Default category
  return 'general'
}

// Determine video level based on title/description (you can customize this)
function determineLevel(title, description) {
  const content = (title + ' ' + (description || '')).toLowerCase()

  if (content.includes('beginner') || content.includes('basic') || content.includes('intro')) return 'beginner'
  if (content.includes('advanced') || content.includes('expert')) return 'advanced'
  if (content.includes('intermediate')) return 'intermediate'

  // Default to beginner
  return 'beginner'
}

// Main function to fetch and import videos
async function importVimeoVideos() {
  try {
    console.log('🔄 Fetching videos from Vimeo...')

    // Fetch user's videos from Vimeo
    const data = await makeVimeoRequest('/me/videos?per_page=100&fields=uri,name,description,duration,pictures,embed,status,privacy,created_time')

    console.log(`📹 Found ${data.data.length} videos in your Vimeo account`)

    if (data.data.length === 0) {
      console.log('ℹ️  No videos found in your Vimeo account')
      return
    }

    let imported = 0
    let updated = 0
    let skipped = 0

    // Process each video
    for (const vimeoVideo of data.data) {
      const vimeoId = extractVimeoId(vimeoVideo.uri)
      const thumbnailUrl = getThumbnailUrl(vimeoVideo)
      const category = categorizeVideo(vimeoVideo.name, vimeoVideo.description)
      const level = determineLevel(vimeoVideo.name, vimeoVideo.description)

      console.log(`\n📄 Processing: "${vimeoVideo.name}" (ID: ${vimeoId})`)

      // Check if video already exists
      const { data: existingVideo, error: checkError } = await supabase
        .from('videos')
        .select('id, title, updated_at')
        .eq('vimeo_id', vimeoId)
        .single()

      if (checkError && checkError.code !== 'PGRST116') { // PGRST116 = not found
        console.error(`❌ Error checking existing video: ${checkError.message}`)
        continue
      }

      const videoData = {
        vimeo_id: vimeoId,
        title: vimeoVideo.name,
        description: vimeoVideo.description || '',
        duration: vimeoVideo.duration,
        level: level,
        category: category,
        thumbnail_url: thumbnailUrl,
        embed_url: `https://player.vimeo.com/video/${vimeoId}`,
        is_published: vimeoVideo.status === 'available' && vimeoVideo.privacy.view !== 'disable'
      }

      if (existingVideo) {
        // Update existing video
        const { error: updateError } = await supabase
          .from('videos')
          .update(videoData)
          .eq('id', existingVideo.id)

        if (updateError) {
          console.error(`❌ Error updating video: ${updateError.message}`)
          continue
        }

        console.log(`✅ Updated: "${vimeoVideo.name}" (${level} ${category})`)
        updated++
      } else {
        // Insert new video
        const { error: insertError } = await supabase
          .from('videos')
          .insert(videoData)

        if (insertError) {
          console.error(`❌ Error inserting video: ${insertError.message}`)
          continue
        }

        console.log(`✅ Imported: "${vimeoVideo.name}" (${level} ${category})`)
        imported++
      }
    }

    console.log('\n🎉 Import completed!')
    console.log(`📊 Summary:`)
    console.log(`   • ${imported} videos imported`)
    console.log(`   • ${updated} videos updated`)
    console.log(`   • ${skipped} videos skipped`)
    console.log(`\n💡 You can now view your videos in the Video Lessons tab!`)

  } catch (error) {
    console.error('❌ Import failed:', error.message)
    process.exit(1)
  }
}

// Run the import
if (require.main === module) {
  importVimeoVideos()
}

module.exports = { importVimeoVideos }
# Vimeo Integration Setup Guide

This guide explains how to set up and use the Vimeo integration for Anya's English Emporium.

## Prerequisites

1. **Vimeo Account**: You need a Vimeo account (free or paid)
2. **Vimeo Developer App**: Create a Vimeo app at [developer.vimeo.com](https://developer.vimeo.com)
3. **Supabase Project**: Your Supabase database should be set up and running

## Step 1: Create Vimeo Developer App

1. Go to [developer.vimeo.com](https://developer.vimeo.com)
2. Sign in with your Vimeo account
3. Click "My Apps" and then "Create App"
4. Fill in the app details:
   - App Name: "Anya's English Emporium"
   - App Description: "English learning video platform"
   - App URL: Your website URL
5. Save the app

## Step 2: Generate Access Token

1. In your Vimeo app dashboard, go to "Authentication"
2. Click "Generate Access Token"
3. Select the required scopes:
   - `public` - Access public videos
   - `private` - Access private videos
   - `video_files` - Access video file information
4. Copy the generated access token

## Step 3: Configure Environment Variables

Update your `.env.local` file with the Vimeo credentials:

```env
# Vimeo Configuration
VIMEO_ACCESS_TOKEN=your_actual_vimeo_access_token_here
NEXT_PUBLIC_VIMEO_CLIENT_ID=your_vimeo_client_id_here
```

**Important**: Also add these to your Vercel environment variables for production:
1. Go to Vercel Dashboard > Your Project > Settings > Environment Variables
2. Add both variables for Production, Preview, and Development

## Step 4: Set Up Database

Run the Supabase migrations to create the necessary tables:

```sql
-- Run these in your Supabase SQL editor or via CLI
-- 001_create_videos_table.sql
-- 002_create_user_video_progress_table.sql
-- 003_sample_video_data.sql (optional, for testing)
```

## Step 5: Upload and Configure Videos

### Upload Videos to Vimeo

1. Upload your English learning videos to Vimeo
2. For each video, note down the Vimeo ID (the numbers in the URL)
3. Set appropriate privacy settings (public for free access, private for subscribers)

### Add Videos to Database

For each video, insert a record into the `videos` table:

```sql
INSERT INTO videos (
    vimeo_id,
    title,
    description,
    duration,
    level,
    category,
    thumbnail_url,
    embed_url,
    is_published
) VALUES (
    'your_vimeo_video_id',
    'Your Video Title',
    'Video description',
    1200, -- duration in seconds
    'beginner', -- or 'intermediate', 'advanced'
    'grammar', -- category
    'https://i.vimeocdn.com/video/thumbnail_url.jpg',
    'https://player.vimeo.com/video/your_vimeo_video_id',
    true
);
```

### Getting Video Information from Vimeo API

You can use the Vimeo API to automatically fetch video information:

```javascript
// Example: Get video info and insert to database
const vimeoAPI = require('./src/lib/vimeo')

async function addVideoFromVimeo(vimeoId) {
    const videoData = await vimeoAPI.getVideo(vimeoId)

    // Insert to database with Supabase
    const { data, error } = await supabase
        .from('videos')
        .insert({
            vimeo_id: vimeoId,
            title: videoData.name,
            description: videoData.description,
            duration: videoData.duration,
            thumbnail_url: vimeoAPI.getThumbnailUrl(videoData),
            embed_url: VimeoAPI.getEmbedUrl(vimeoId),
            level: 'beginner', // Set manually
            category: 'grammar', // Set manually
            is_published: true
        })
}
```

## Step 6: Video Categories and Levels

### Supported Levels
- `beginner`
- `intermediate`
- `advanced`

### Common Categories
- `grammar`
- `vocabulary`
- `pronunciation`
- `conversation`
- `business`
- `listening`
- `writing`
- `reading`

You can add more categories as needed.

## Step 7: Testing the Integration

1. Start your development server: `npm run dev`
2. Log in to your application
3. Navigate to the "Video Lessons" tab
4. You should see your videos loaded with:
   - Vimeo thumbnails
   - Video information
   - Progress tracking
   - Search and filtering

## Features

### Video Player
- **Responsive Design**: Works on all screen sizes
- **Progress Tracking**: Automatically saves watch progress
- **Quality Controls**: Vimeo's built-in quality selection
- **Fullscreen Support**: Native fullscreen functionality

### User Progress
- **Resume Watching**: Users can continue from where they left off
- **Completion Tracking**: Automatically marks videos as complete at 95%
- **Progress Indicators**: Visual progress bars on video thumbnails
- **Statistics**: Track completion rates and learning progress

### Search and Filtering
- **Text Search**: Search by title and description
- **Level Filter**: Filter by beginner/intermediate/advanced
- **Category Filter**: Filter by video category
- **Dynamic Categories**: Categories are loaded from database

## Troubleshooting

### Common Issues

1. **Video Not Loading**
   - Check Vimeo ID is correct
   - Verify video privacy settings on Vimeo
   - Ensure access token has proper scopes

2. **Thumbnail Not Showing**
   - Vimeo thumbnails may take time to generate
   - Check if thumbnail URL is accessible
   - Use placeholder image as fallback

3. **Progress Not Saving**
   - Verify user is authenticated
   - Check Supabase RLS policies
   - Ensure video ID exists in database

4. **Build Errors**
   - Make sure environment variables are set in Vercel
   - Check all imports are correct
   - Verify Supabase tables exist

### Performance Optimization

- **Lazy Loading**: Videos load thumbnails only when needed
- **Caching**: React-player caches video metadata
- **CDN**: Vimeo serves videos from global CDN
- **Optimization**: Images are optimized by Vimeo

## Next Steps

1. **Content Management**: Build admin interface for managing videos
2. **Analytics**: Add video watch analytics
3. **Certificates**: Generate completion certificates
4. **Playlists**: Group videos into courses/playlists
5. **Comments**: Add video comments and discussions

## Support

For Vimeo API support, visit: https://developer.vimeo.com/api
For Supabase support, visit: https://supabase.com/docs
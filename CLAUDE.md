# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Anya's English Emporium is a subscription video platform for English language learning built with Next.js 15. The platform will allow users to access language learning videos through a subscription model. Currently implemented as a landing page with email signup, but will expand to include user authentication, subscription management, video streaming, and course organization features.

## Development Commands

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build production application with Turbopack
- `npm start` - Start production server
- `npm run lint` - Run ESLint with Next.js and TypeScript rules

## Architecture

This is a standard Next.js App Router application with the following structure:

- `/src/app/` - App Router pages and layouts
  - `layout.tsx` - Root layout with Geist fonts (Sans and Mono)
  - `page.tsx` - Homepage with landing page content and email signup form
  - `globals.css` - Global styles and Tailwind imports
- TypeScript configuration supports `@/*` path mapping to `./src/*`
- ESLint configured with Next.js core web vitals and TypeScript rules
- Uses Turbopack for faster builds and development

## Key Dependencies

- Next.js 15.5.3 with App Router
- React 19.1.0
- TypeScript 5
- Tailwind CSS 4 with PostCSS integration
- Geist font family from Google Fonts
- Supabase for database and authentication
- react-player for video playback
- @vimeo/player for Vimeo-specific features

## Video Integration

The platform uses Vimeo for video hosting with the following features:
- **Video Streaming**: Videos are hosted on Vimeo and streamed via react-player
- **Progress Tracking**: User watch progress is saved in Supabase
- **Search & Filtering**: Videos can be filtered by level, category, and search terms
- **Responsive Player**: Video player works across all devices
- **Thumbnail Display**: Vimeo thumbnails are automatically fetched and displayed

### Database Schema
- `videos` table: Stores video metadata (Vimeo ID, title, description, etc.)
- `user_video_progress` table: Tracks user watch progress and completion

### Key Files
- `/src/lib/vimeo.ts` - Vimeo API utilities
- `/src/lib/videos.ts` - Video database operations
- `/src/components/VideoPlayer.tsx` - Main video player component
- `/src/components/VideoModal.tsx` - Fullscreen video modal
- `/supabase/migrations/` - Database schema migrations
- `/scripts/import-vimeo-videos.js` - Automated video import from Vimeo to database

### Adding New Videos

To import videos from Vimeo to the database:

1. **Upload videos to your Vimeo account**
2. **Run the import script**: `node scripts/import-vimeo-videos.js`
   - Automatically fetches all videos from your Vimeo account
   - Extracts metadata (title, description, duration, thumbnails)
   - Categorizes videos based on title/description keywords
   - Sets difficulty levels (beginner/intermediate/advanced)
   - Inserts new videos and updates existing ones
   - Handles duplicates gracefully

**Required Environment Variables** (in `.env.local`):
- `VIMEO_ACCESS_TOKEN` - Your Vimeo API access token
- `NEXT_PUBLIC_VIMEO_CLIENT_ID` - Your Vimeo client ID
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key (bypasses RLS for admin operations)

The script automatically categorizes videos using keywords:
- **Categories**: grammar, vocabulary, pronunciation, conversation, business, listening, writing, reading, general
- **Levels**: beginner (default), intermediate, advanced

## Planned Features

- Subscription billing and payment processing
- Admin panel for content management
- Course playlists and organization
- Video comments and discussions
- Completion certificates
- Advanced analytics

## Notes

The README.md contains merge conflict markers that should be resolved. The project is currently in the initial landing page phase, with the full subscription video platform features to be implemented.
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

## Planned Features

- User authentication and account management
- Subscription billing and payment processing
- Video streaming and playback
- Course organization and progress tracking
- Admin panel for content management
- Mobile-responsive design for cross-device learning

## Notes

The README.md contains merge conflict markers that should be resolved. The project is currently in the initial landing page phase, with the full subscription video platform features to be implemented.
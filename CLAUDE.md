# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Familiekwasten photo gallery - a Next.js application that showcases family artwork with Supabase backend and Discord bot integration. The project consists of:

- **Frontend**: Next.js 15 with TypeScript, displaying artwork in a responsive gallery
- **Backend**: Supabase for database (`discord_images` table) and storage (`discord-images` bucket)
- **Bot**: Discord bot (`/bot` directory) that automatically saves artwork images to Supabase
- **Styling**: CUBE CSS methodology with custom CSS architecture

## Development Commands

### Main Application
```bash
pnpm dev          # Start development server (uses --turbopack)
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
```

### Discord Bot
```bash
cd bot
pnpm install      # Install bot dependencies
pnpm start        # Start bot (node bot.js)
pnpm dev          # Start bot with nodemon
```

## Architecture

### Database Schema
The `discord_images` table stores:
- `discord_user_id`, `username`, `discord_message_id`, `channel_id`
- `image_filename`, `image_url`, `file_size`, `posted_at`

### File Structure
- `app/`: Next.js App Router pages and components
- `bot/`: Independent Discord bot application
- `styles/`: CUBE CSS architecture (global, composition, utilities, blocks, exceptions)
- `utils/supabase/`: Supabase client configuration (browser and server)

### Key Components
- **Gallery Page** (`app/page.tsx`): Fetches from `discord_images` table and displays artwork grid
- **Discord Bot** (`bot/bot.js`): Monitors Discord channels, downloads images, uploads to Supabase storage, saves metadata
- **Supabase Integration**: 
  - Client-side: `utils/supabase/client.ts`
  - Server-side: `utils/server.ts`

### Styling System
Uses CUBE CSS methodology with layers:
1. **Global**: Reset, tokens, base styles
2. **Composition**: Layout utilities (flow, grid, cluster, stack)
3. **Utilities**: Helper classes (wrapper, spacing, text)
4. **Blocks**: Component styles (button, card, form)
5. **Exceptions**: Style overrides

### Environment Variables
- `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Frontend Supabase config
- `DISCORD_TOKEN` / `SUPABASE_URL` / `SUPABASE_ANON_KEY`: Bot configuration
- `CHANNEL_ID`: Optional Discord channel restriction

## Configuration

- **Next.js**: Configured for Supabase image domains in `next.config.ts`
- **TypeScript**: Standard config with `@/*` path mapping
- **ESLint**: Next.js + TypeScript rules
- **PostCSS**: TailwindCSS v4 integration
- **Package Manager**: pnpm only

## Key Patterns

- Server Components for data fetching (gallery uses `createClient()` directly)
- Image optimization with Next.js Image component
- Discord bot uses event-driven architecture with error handling and emoji reactions
- CSS follows CUBE methodology for scalable styling
- Supabase Storage for image files, database for metadata
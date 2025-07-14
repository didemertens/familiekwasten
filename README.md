# Familiekwasten

A photo gallery showcasing the artwork of "Familiekwasten" - a creative family art project. This Next.js application features a dynamic photo gallery powered by Supabase for storage and database management, with an integrated Discord bot for community interaction.

## Features

- **Photo Gallery**: Dynamic display of Familiekwasten artwork
- **Supabase Integration**: Database and storage for artwork metadata and images
- **Discord Bot**: Community engagement through Discord integration (located in `/bot`)
- **Responsive Design**: Modern CSS architecture with utility-first approach

## Tech Stack

- **Frontend**: Next.js with TypeScript
- **Database & Storage**: Supabase
- **Styling**: Custom CSS with utility classes
- **Bot**: Discord.js (in `/bot` directory)

## Getting Started

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
├── app/                 # Next.js app directory
├── bot/                 # Discord bot implementation
├── styles/              # CSS architecture
│   ├── blocks/          # Component-specific styles
│   ├── composition/     # Layout utilities
│   ├── exceptions/      # Style overrides
│   ├── global/          # Global styles and tokens
│   └── utilities/       # Utility classes
├── utils/               # Shared utilities
│   └── supabase/        # Supabase client configuration
└── public/              # Static assets
```

## Discord Bot

The Discord bot is located in the `/bot` directory and provides community features for the Familiekwasten project. To run the bot:

```bash
cd bot
pnpm install
pnpm start
```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

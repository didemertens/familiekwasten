import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseDomain = supabaseUrl ? new URL(supabaseUrl).hostname : undefined;

const nextConfig: NextConfig = {
  images: {
    domains: supabaseDomain ? [supabaseDomain] : [],
  },
};

module.exports = nextConfig;

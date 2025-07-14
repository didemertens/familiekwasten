require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");
const { createClient } = require("@supabase/supabase-js");
const axios = require("axios");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

// Configuration
const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const CHANNEL_ID = process.env.CHANNEL_ID; // Optional: specific channel only

// Validate environment variables
if (!DISCORD_TOKEN || !SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error("❌ Missing required environment variables!");
  console.error(
    "Please check your .env file has DISCORD_TOKEN, SUPABASE_URL, and SUPABASE_SERVICE_ROLE_KEY"
  );
  process.exit(1);
}

// Initialize Discord client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// Initialize Supabase client with service role key for admin access
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

// Supported image formats
const IMAGE_EXTENSIONS = [
  ".jpg",
  ".jpeg",
  ".png",
  ".gif",
  ".webp",
  ".bmp",
  ".svg",
];

// Function to check if file is an image
function isImageFile(filename) {
  const ext = path.extname(filename).toLowerCase();
  return IMAGE_EXTENSIONS.includes(ext);
}

// Function to download image from Discord
async function downloadImage(url) {
  try {
    console.log(`📥 Downloading image from: ${url}`);
    const response = await axios({
      method: "GET",
      url: url,
      responseType: "arraybuffer",
      timeout: 30000, // 30 second timeout
    });
    console.log(`✅ Downloaded ${response.data.byteLength} bytes`);
    return Buffer.from(response.data);
  } catch (error) {
    console.error("❌ Error downloading image:", error.message);
    throw error;
  }
}

// Function to upload image to Supabase Storage
async function uploadToSupabase(imageBuffer, filename) {
  try {
    console.log(`📤 Uploading ${filename} to Supabase...`);

    const { data, error } = await supabase.storage
      .from("discord-images")
      .upload(filename, imageBuffer, {
        contentType: "image/*",
        upsert: false,
      });

    if (error) {
      console.error("❌ Supabase upload error:", error);
      throw error;
    }

    // Get public URL
    const { data: publicData } = supabase.storage
      .from("discord-images")
      .getPublicUrl(filename);

    console.log(`✅ Upload successful: ${publicData.publicUrl}`);
    return publicData.publicUrl;
  } catch (error) {
    console.error("❌ Error uploading to Supabase:", error);
    throw error;
  }
}

// Function to save image metadata to database
async function saveImageMetadata(imageData) {
  try {
    console.log(`💾 Saving metadata for ${imageData.display_name}...`);

    const { data, error } = await supabase
      .from("discord_images")
      .insert([imageData])
      .select();

    if (error) {
      console.error("❌ Database insert error:", error);
      throw error;
    }

    console.log("✅ Metadata saved successfully");
    return data;
  } catch (error) {
    console.error("❌ Error saving metadata:", error);
    throw error;
  }
}

// Function to process image attachment
async function processImageAttachment(message, attachment) {
  try {
    const displayName = message.author.globalName || message.author.displayName || message.author.username;
    console.log(
      `\n🎨 Processing art from ${displayName}: ${attachment.name}`
    );

    // Download image
    const imageBuffer = await downloadImage(attachment.url);

    // Generate unique filename with timestamp
    const timestamp = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    const fileExtension = path.extname(attachment.name);
    const baseName = path.basename(attachment.name, fileExtension);
    const uniqueFilename = `${timestamp}_${uuidv4()}_${baseName}${fileExtension}`;

    // Upload to Supabase
    const publicUrl = await uploadToSupabase(imageBuffer, uniqueFilename);

    // Prepare metadata
    const imageMetadata = {
      discord_user_id: message.author.id,
      display_name: displayName,
      discord_message_id: message.id,
      channel_id: message.channel.id,
      image_filename: uniqueFilename,
      image_url: publicUrl,
      file_size: attachment.size,
      posted_at: message.createdAt.toISOString(),
    };

    // Save metadata to database
    await saveImageMetadata(imageMetadata);

    console.log(
      `🎉 Successfully saved art piece: ${attachment.name} by ${displayName}`
    );

    // React with art palette emoji to show it was processed
    await message.react("🎨");
  } catch (error) {
    console.error(`❌ Error processing ${attachment.name}:`, error.message);

    // React with error emoji
    try {
      await message.react("❌");
    } catch (reactionError) {
      console.error("Could not add reaction:", reactionError.message);
    }
  }
}

// Bot event handlers
client.once("ready", () => {
  console.log(`\n🤖 Family Art Bot is ready!`);
  console.log(`📋 Logged in as: ${client.user.tag}`);
  console.log(`🏠 Monitoring ${client.guilds.cache.size} server(s)`);

  if (CHANNEL_ID) {
    console.log(`🎯 Watching specific channel: ${CHANNEL_ID}`);
  } else {
    console.log(`👀 Watching all channels for art uploads`);
  }

  console.log(`\n🎨 Ready to collect family art! 🖼️\n`);
});

client.on("messageCreate", async (message) => {
  // Ignore messages from bots
  if (message.author.bot) return;

  // If specific channel is set, only process messages from that channel
  if (CHANNEL_ID && message.channel.id !== CHANNEL_ID) return;

  // Check if message has attachments
  if (message.attachments.size === 0) return;

  const displayName = message.author.globalName || message.author.displayName || message.author.username;
  console.log(
    `📨 New message from ${displayName} with ${message.attachments.size} attachment(s)`
  );

  // Process each attachment
  for (const attachment of message.attachments.values()) {
    // Check if attachment is an image
    if (isImageFile(attachment.name)) {
      await processImageAttachment(message, attachment);
    } else {
      console.log(`⏭️  Skipping non-image file: ${attachment.name}`);
    }
  }
});

// Error handling
client.on("error", (error) => {
  console.error("❌ Discord client error:", error);
});

process.on("unhandledRejection", (error) => {
  console.error("❌ Unhandled promise rejection:", error);
});

// Login to Discord
console.log("🚀 Starting Family Art Bot...");
client.login(DISCORD_TOKEN);

// Graceful shutdown
process.on("SIGINT", () => {
  console.log("\n🛑 Bot shutting down gracefully...");
  client.destroy();
  process.exit(0);
});

process.on("SIGTERM", () => {
  console.log("\n🛑 Bot shutting down gracefully...");
  client.destroy();
  process.exit(0);
});

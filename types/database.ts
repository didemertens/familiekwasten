export type DiscordImage = {
  id: number;
  discord_user_id: string;
  display_name: string;
  discord_message_id: string;
  channel_id: string;
  image_filename: string;
  image_url: string;
  file_size: number;
  posted_at: string;
};

export type ArtworkWithSignedUrl = DiscordImage & {
  signedUrl: string | null;
};

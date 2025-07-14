import { createClient, getSignedImageUrl } from "@/utils/supabase/server";
import Image from "next/image";
import type { DiscordImage, ArtworkWithSignedUrl } from "@/types/database";
import { formatDate } from "@/utils/date";

export default async function Page() {
  const supabase = await createClient();
  const { data: artworks } = await supabase.from("discord_images").select();

  // Get signed URLs for all images
  const artworksWithSignedUrls = await Promise.all(
    artworks?.map(async (artwork: DiscordImage) => {
      const signedUrl = await getSignedImageUrl(artwork.image_filename);
      return {
        ...artwork,
        signedUrl,
      };
    }) || []
  );

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
            Familiekwasten Gallery
          </h1>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <ul role="list" className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {artworksWithSignedUrls?.map(
            (artwork: ArtworkWithSignedUrl, index: number) => (
              <li
                key={artwork.id}
                className="card w-full h-full flex flex-col gap-2 p-6 border-4 rounded-3xl"
              >
                <div className="card__image-container unset-img mb-2">
                  {/* Only render the image if signedUrl is not empty */}
                  {artwork.signedUrl && (
                    <Image
                      src={artwork.signedUrl}
                      alt={artwork.image_filename}
                      fill
                      className="custom-img gallery-card__image rounded-2xl"
                      sizes="(max-width: 640px) 100vw, 50vw"
                      priority={index < 4}
                    />
                  )}
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-base font-semibold">
                    {artwork.username}
                  </span>
                  <span className="text-xs text-gray-400">
                    {formatDate(artwork.posted_at)}
                  </span>
                </div>
              </li>
            )
          )}
        </ul>
      </section>
    </div>
  );
}

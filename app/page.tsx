import { createClient, getSignedImageUrl } from "@/utils/supabase/server";
import Image from "next/image";

export default async function Page() {
  const supabase = await createClient();
  const { data: artworks } = await supabase.from("discord_images").select();

  // Get signed URLs for all images
  const artworksWithSignedUrls = await Promise.all(
    // TODO change any to type
    artworks?.map(async (artwork: any) => {
      const signedUrl = await getSignedImageUrl(artwork.image_filename);
      return {
        ...artwork,
        signed_url: signedUrl || artwork.image_url, // fallback to original if signed URL fails
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
          {/* TODO change any to type */}
          {artworksWithSignedUrls?.map((artwork: any, index: number) => (
            <li
              key={artwork.id}
              className="card w-full h-full flex flex-col gap-2 p-6 border-4 rounded-3xl"
            >
              <div className="card__image-container unset-img mb-2">
                <Image
                  src={artwork.signed_url}
                  alt={artwork.image_filename}
                  fill
                  className="custom-img gallery-card__image rounded-2xl"
                  sizes="(max-width: 640px) 100vw, 50vw"
                  priority={index < 4}
                />
              </div>
              <div className="flex flex-col items-center">
                <span className="text-base font-semibold">
                  {artwork.username}
                </span>
                <span className="text-xs text-gray-400">
                  {new Date(artwork.posted_at).toLocaleDateString("en-GB", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

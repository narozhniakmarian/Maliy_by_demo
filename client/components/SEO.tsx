import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

export default function SEO({
  title = "Crafted Fishing Lures - Handmade Fishing Lures",
  description = "Premium handcrafted fishing lures designed with passion.",
  keywords = "fishing lures, handmade, artisan, tackle",
  image = "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&h=630&fit=crop",
  url = "https://craftedlures.com",
}: SEOProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Crafted Fishing Lures",
    description,
    image,
    url,
    telephone: "+1-555-000-0000",
    priceRange: "$",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: "256",
    },
    sameAs: [
      "https://instagram.com/craftedlures",
      "https://tiktok.com/@craftedlures",
      "https://t.me/craftedlures",
    ],
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="author" content="Crafted Fishing Lures" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
}

import { useEffect } from "react";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

export default function SEO({
  title = "Crafted Fishing Lures - Handmade Fishing Lures",
  description = "Premium handcrafted fishing lures designed with passion. Shop our collection of artisan-made lures perfect for every fishing adventure.",
  keywords = "fishing lures, handmade fishing lures, artisan lures, fishing tackle",
  image = "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&h=630&fit=crop",
  url = "https://.com",
}: SEOProps) {
  useEffect(() => {
    // Set page title
    document.title = title;

    // Set meta tags
    const setMetaTag = (name: string, content: string, isProperty = false) => {
      let tag = document.querySelector(
        `meta[${isProperty ? "property" : "name"}="${name}"]`,
      );
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(isProperty ? "property" : "name", name);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    setMetaTag("description", description);
    setMetaTag("keywords", keywords);
    setMetaTag("viewport", "width=device-width, initial-scale=1.0");
    setMetaTag("author", "Crafted Fishing Lures");

    // Open Graph tags
    setMetaTag("og:title", title, true);
    setMetaTag("og:description", description, true);
    setMetaTag("og:image", image, true);
    setMetaTag("og:url", url, true);
    setMetaTag("og:type", "website", true);

    // Twitter Card tags
    setMetaTag("twitter:card", "summary_large_image");
    setMetaTag("twitter:title", title);
    setMetaTag("twitter:description", description);
    setMetaTag("twitter:image", image);

    // Additional meta tags
    setMetaTag("robots", "index, follow");
    setMetaTag("language", "English");

    // Structured data (Schema.org)
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "Crafted Fishing Lures",
      description: description,
      image: image,
      url: url,
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

    let scriptTag = document.querySelector(
      'script[type="application/ld+json"]',
    );
    if (!scriptTag) {
      scriptTag = document.createElement("script");
      scriptTag.type = "application/ld+json";
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(structuredData);
  }, [title, description, keywords, image, url]);

  return null;
}

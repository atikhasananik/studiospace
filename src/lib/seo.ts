import type { Metadata } from "next";

function getSiteUrl(): URL {
  const configuredUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? process.env.BETTER_AUTH_URL;
  const deploymentUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : null;
  const siteUrl = configuredUrl ?? deploymentUrl ?? "http://localhost:3000";
  const url = new URL(siteUrl);
  url.pathname = "/";
  url.search = "";
  url.hash = "";
  return url;
}

export const SITE_URL = getSiteUrl();

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
};

export function createPageMetadata({
  title,
  description,
  path,
  noIndex = false,
  image,
  imageAlt,
  type = "website",
}: PageMetadataOptions): Metadata {
  const socialImage = [
    { url: image ?? "/opengraph-image", alt: imageAlt ?? title },
  ];

  return {
    title,
    description,
    alternates: { canonical: path },
    robots: noIndex
      ? {
          index: false,
          follow: false,
          googleBot: { index: false, follow: false },
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    openGraph: {
      title,
      description,
      url: path,
      siteName: "StudioSpace",
      locale: "en_US",
      type,
      images: socialImage,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: socialImage,
    },
  };
}

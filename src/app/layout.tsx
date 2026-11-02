import type { Metadata } from "next";
import { Geist, Geist_Mono, Syne } from "next/font/google";
import { Navbar } from "@/components/common/navbar/navbar";
import { Footer } from "@/components/common/footer/Footer";
import { BackToTop } from "@/components/back-to-top/BackToTop";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toast";
import { SITE_URL } from "@/lib/seo";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Brand heading font (see brand_identity_visual_strategy.md §3)
const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: SITE_URL,
  title: {
    default: "StudioSpace | Creative Studio Spaces for Rent",
    template: "%s | StudioSpace",
  },
  description:
    "Discover and book creative studio spaces for photography, film, podcasts, music, and production. Find the right space for your next project on StudioSpace.",
  applicationName: "StudioSpace",
  keywords: [
    "creative studio rental",
    "photography studio rental",
    "film studio rental",
    "podcast studio rental",
    "music recording studio",
    "production spaces",
    "creative spaces",
    "studio booking",
  ],
  authors: [{ name: "StudioSpace" }],
  creator: "StudioSpace",
  publisher: "StudioSpace",
  category: "Creative services",
  alternates: { canonical: "/" },
  robots: {
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
    title: "StudioSpace | Creative Studio Spaces for Rent",
    description:
      "Discover and book photography, film, podcast, music, and production studios for your next creative project.",
    url: "/",
    siteName: "StudioSpace",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "StudioSpace | Creative Studio Spaces for Rent",
    description:
      "Find and book the right creative studio for your next project.",
  },
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${syne.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground selection:bg-primary/20 selection:text-primary">
        <ThemeProvider>
          <Toaster>
            <Navbar />
            <main className="flex-1 flex flex-col">{children}</main>
            <Footer />
            <BackToTop />
          </Toaster>
        </ThemeProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from '@next/third-parties/google'
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Real Talk – Spark Meaningful Conversations",
  description:
    "Curated, AI-powered conversation topics designed to help you connect more deeply with friends, family, and partners.",
  openGraph: {
    title: "Real Talk – Spark Meaningful Conversations",
    description:
      "Curated, AI-powered conversation topics designed to help you connect more deeply with friends, family, and partners.",
    url: "https://realtalkz.netlify.app/",
    siteName: "Real Talk",
    images: [
      {
        url: "https://realtalkz.netlify.app/preview.webp", // full URL to your preview image
        width: 1200,
        height: 630,
        alt: "Real Talk App Preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Real Talk – Spark Meaningful Conversations",
    description:
      "Explore thoughtful, customized discussion topics powered by AI and tailored to your relationships.",
    images: ["https://realtalkz.netlify.app/preview.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <meta name="apple-mobile-web-app-title" content="RealTalk" />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
      <GoogleAnalytics gaId="G-HB17Z3XF9H" />
    </html>
  );
}
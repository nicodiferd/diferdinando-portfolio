import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteTitle = "DiFerdinando Brothers | Software, Data & Security Engineering";
const siteDescription =
  "Two engineers who design and ship production-grade software, data platforms, and security automation: full-stack apps, Snowflake/dbt pipelines, analytics, AI, and cloud infrastructure.";

export const metadata: Metadata = {
  metadataBase: new URL('https://diferdinando.com'),
  title: siteTitle,
  description: siteDescription,
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: 'https://diferdinando.com',
    siteName: 'DiFerdinando Brothers',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'DiFerdinando Brothers | Software, Data & Security Engineering',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

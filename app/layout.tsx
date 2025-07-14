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

export const metadata: Metadata = {
  title: "DiFerdinando Brothers - Full-Stack Development & Data Engineering",
  description: "Professional software development services specializing in web applications, mobile apps, data engineering, cybersecurity, and AI solutions.",
  icons: {
    icon: '/favicon.ico?v=2',
    shortcut: '/favicon.ico?v=2',
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: "DiFerdinando Brothers - Full-Stack Development & Data Engineering",
    description: "Professional software development services specializing in web applications, mobile apps, data engineering, cybersecurity, and AI solutions.",
    url: 'https://diferdinando.com',
    siteName: 'DiFerdinando Brothers',
    images: [
      {
        url: '/favicon.ico?v=2', // Using favicon temporarily
        width: 1200,
        height: 630,
        alt: 'DiFerdinando Brothers',
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "DiFerdinando Brothers - Full-Stack Development & Data Engineering",
    description: "Professional software development services specializing in web applications, mobile apps, data engineering, cybersecurity, and AI solutions.",
    images: ['/favicon.ico?v=2'],
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

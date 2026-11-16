import type { Metadata, Viewport } from 'next';
import { THEME_COLOR, THEME_INIT } from '@/components/site/theme';
import { site } from '@/lib/content';
import './globals.css';

const ogImage = {
  url: '/og.png',
  width: 1200,
  height: 630,
  alt: `${site.name}: ${site.headline}`,
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  alternates: { canonical: site.url },
  openGraph: {
    title: site.title,
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: 'en_US',
    type: 'website',
    images: [ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: site.title,
    description: site.description,
    images: [ogImage.url],
  },
};

// The browser bar follows the system; when a visitor picks Light or Dark in
// the footer, the theme script points both tags at that color.
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: THEME_COLOR.light },
    { media: '(prefers-color-scheme: dark)', color: THEME_COLOR.dark },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Sets html[data-theme] before the first paint, so there is no flash. */}
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
      </head>
      <body>{children}</body>
    </html>
  );
}

import type { MetadataRoute } from 'next';
import { site } from '@/lib/content';

export const dynamic = 'force-static';

// Production is indexable. Pages previews send their own noindex header.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${site.url}/sitemap.xml`,
  };
}

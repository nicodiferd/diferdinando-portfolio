import type { MetadataRoute } from 'next';
import { site } from '@/lib/content';

export const dynamic = 'force-static';

// The site has one page.
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: site.url, lastModified: new Date() }];
}

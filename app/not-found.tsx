import type { Metadata } from 'next';
import { NotFoundPage } from '@/components/site/not-found-page';

// Next marks the 404 page noindex on its own.
export const metadata: Metadata = {
  title: 'Page not found: DiFerdinando',
};

export default function NotFound() {
  return <NotFoundPage />;
}

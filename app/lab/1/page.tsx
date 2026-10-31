import type { Metadata } from 'next';
import { labPageMetadata } from '../_kit';
import { meta } from './meta';

export const metadata: Metadata = labPageMetadata(meta);

export default function LabVariant1Page() {
  return <main style={{ padding: 16 }}>Variant 1 is in progress.</main>;
}

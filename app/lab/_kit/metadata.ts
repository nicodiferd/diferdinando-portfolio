import type { Metadata } from 'next';
import type { LabEntry } from './lab-entry';

/** A variant page's tab title and description. The lab layout sets robots. */
export function labPageMetadata(entry: LabEntry): Metadata {
  return { title: `Lab ${entry.n}: ${entry.name}`, description: entry.oneLiner };
}

// The lab kit: the facts every variant shows (content.ts), the index entry
// type, and the lab tag a variant puts on each section so the owner can name
// what to keep ("2C and 5F"). Variants import from '../_kit' only.

export * from './content';
export type { LabEntry, LabNumber } from './lab-entry';
export { LAB_COUNT } from './lab-entry';
export { LabTag } from './lab-tag';
export { labPageMetadata } from './metadata';

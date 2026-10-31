// One lab variant as the /lab index lists it. Each variant's own meta.ts
// exports its entry and registry.ts collects them, so a builder edits only
// its own directory.

/** The variant's number, which is also its route: /lab/<n>. */
export type LabNumber = 1 | 2 | 3 | 4 | 5 | 6;

export type LabEntry = {
  n: LabNumber;
  /** A short name for the direction, a few words. */
  name: string;
  /** One sentence: what this variant tries. */
  oneLiner: string;
  /** The look in a few words (type, palette, layout). */
  style: string;
};

export const LAB_COUNT = 6;

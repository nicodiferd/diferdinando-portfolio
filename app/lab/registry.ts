import type { LabEntry } from './_kit';
import { meta as lab1 } from './1/meta';
import { meta as lab2 } from './2/meta';
import { meta as lab3 } from './3/meta';
import { meta as lab4 } from './4/meta';
import { meta as lab5 } from './5/meta';
import { meta as lab6 } from './6/meta';

// The lab's variants, in order, as the /lab index lists them. Each entry
// lives in its own variant's meta.ts, so a builder edits only its own
// directory and never this file. scripts/check-lab.mjs pins six entries
// numbered 1 to 6, each matching its directory.
export const LAB_VARIANTS: readonly LabEntry[] = [lab1, lab2, lab3, lab4, lab5, lab6];

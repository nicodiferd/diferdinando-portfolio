import type { Metadata } from 'next';
import { LabBar } from './_kit/lab-bar';
import { THEME_INIT } from './_kit/theme';
import './_kit/lab.css';

// The redesign lab (/lab and /lab/1 to /lab/6): drafts of the home page,
// each free to style the whole page. No lab page is indexed (robots here
// reach every lab route), nothing outside /lab links here, and the lab is
// removed before anything merges to main (docs/lab/2026-10-30-redesign-lab.md).
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function LabLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
      {children}
      <LabBar />
    </>
  );
}

'use client';

import { motion, MotionConfig } from 'framer-motion';

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const line = {
  hidden: { scaleX: 0 },
  show: {
    scaleX: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const titleBlock = [
  { label: 'Drawn by', value: 'N. DiFerdinando' },
  { label: 'Checked by', value: 'D. DiFerdinando' },
  { label: 'Scale', value: 'Full' },
  { label: 'Status', value: 'Open for projects', accent: true },
];

const HeroSection = () => {
  return (
    <MotionConfig reducedMotion="user">
      <section
        id="home"
        className="grid-drafting relative border-b border-line"
      >
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-5 pb-10 pt-28 sm:px-8"
        >
          {/* Sheet annotations */}
          <motion.div
            variants={item}
            className="mb-10 flex items-center justify-between gap-4"
          >
            <span className="label-mono">
              Engineering practice: software / data / security
            </span>
            <span className="label-mono hidden sm:block">
              San Diego, CA
            </span>
          </motion.div>

          {/* Headline: opacity-only reveal; a transform here makes Chrome
              leave stale raster behind the text-stroke outline */}
          <motion.h1
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { duration: 0.7 } },
            }}
            className="display-wide text-[clamp(1.75rem,8.5vw,6.75rem)] font-bold uppercase leading-[0.95] text-ink"
          >
            DiFerdinando
            <br />
            <span className="text-outline">Brothers</span>
          </motion.h1>

          {/* Dimension line */}
          <motion.div
            variants={item}
            className="mt-8 flex items-center gap-3 text-ink"
            aria-hidden="true"
          >
            <span className="h-3.5 w-px bg-ink" />
            <span className="h-0 w-0 border-y-[3.5px] border-r-[7px] border-y-transparent border-r-ink" />
            <motion.span variants={line} className="h-px flex-1 origin-left bg-ink" />
            <span className="label-mono whitespace-nowrap text-ink">
              Two brothers · end to end
            </span>
            <motion.span variants={line} className="h-px flex-1 origin-right bg-ink" />
            <span className="h-0 w-0 border-y-[3.5px] border-l-[7px] border-y-transparent border-l-ink" />
            <span className="h-3.5 w-px bg-ink" />
          </motion.div>

          {/* Subhead */}
          <motion.p
            variants={item}
            className="mt-8 max-w-2xl text-lg leading-relaxed text-graphite"
          >
            Donato builds data platforms that move a billion rows a day. Nicolo
            ships the software, security, and infrastructure around them.
            Together we take projects from first commit to production, and keep
            them running.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={item} className="mt-10 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="inline-flex items-center border border-ink bg-ink px-6 py-3 font-mono text-xs uppercase tracking-[0.15em] text-sheet transition-colors hover:bg-transparent hover:text-ink"
            >
              See the work
            </a>
            <a
              href="#contact"
              className="inline-flex items-center border border-ink px-6 py-3 font-mono text-xs uppercase tracking-[0.15em] text-ink transition-colors hover:bg-ink hover:text-sheet"
            >
              Start a project
            </a>
          </motion.div>

          {/* Title block: the sheet's signature */}
          <motion.div
            variants={item}
            className="mt-16 grid grid-cols-2 border border-line bg-sheet sm:grid-cols-4"
          >
            {titleBlock.map((cell, i) => (
              <div
                key={cell.label}
                className={`px-4 py-3 ${i > 0 ? 'border-l border-line max-sm:[&:nth-child(3)]:border-l-0' : ''} ${
                  i >= 2 ? 'max-sm:border-t max-sm:border-line' : ''
                }`}
              >
                <p className="label-mono mb-1">{cell.label}</p>
                <p className="flex items-center gap-2 font-mono text-[13px] text-ink">
                  {cell.accent && (
                    <span className="inline-block h-2 w-2 bg-redline" aria-hidden="true" />
                  )}
                  {cell.value}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>
    </MotionConfig>
  );
};

export default HeroSection;

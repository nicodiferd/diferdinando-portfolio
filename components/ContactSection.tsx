'use client';

import { motion, MotionConfig } from 'framer-motion';

const contactBlock = [
  {
    label: 'Location',
    content: (
      <p className="font-mono text-[13px] text-ink">
        San Diego, CA
      </p>
    ),
  },
  {
    label: 'LinkedIn',
    content: (
      <p className="flex gap-4 font-mono text-[13px]">
        <a
          href="https://www.linkedin.com/in/nicolo-diferdinando/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-ink transition-colors hover:text-redline"
        >
          Nicolo ↗
        </a>
        <a
          href="https://www.linkedin.com/in/donato-diferdinando"
          target="_blank"
          rel="noopener noreferrer"
          className="text-ink transition-colors hover:text-blueline"
        >
          Donato ↗
        </a>
      </p>
    ),
  },
  {
    label: 'GitHub',
    content: (
      <p className="flex gap-4 font-mono text-[13px]">
        <a
          href="https://github.com/nicodiferd"
          target="_blank"
          rel="noopener noreferrer"
          className="text-ink transition-colors hover:text-redline"
        >
          nicodiferd ↗
        </a>
        <a
          href="https://github.com/fddiferd"
          target="_blank"
          rel="noopener noreferrer"
          className="text-ink transition-colors hover:text-blueline"
        >
          fddiferd ↗
        </a>
      </p>
    ),
  },
  {
    label: 'Availability',
    content: (
      <p className="font-mono text-[13px] text-ink">
        Contract · consulting · long-term builds
      </p>
    ),
  },
];

const ContactSection = () => {
  return (
    <MotionConfig reducedMotion="user">
      <section id="contact" className="grid-drafting py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="label-mono mb-3">Contact</p>
            <h2 className="display-wide text-3xl font-bold uppercase text-ink sm:text-4xl">
              Start a project
            </h2>
            <p className="mt-4 max-w-2xl text-graphite">
              Tell us what you&apos;re building: a product, a data platform, or
              something that keeps breaking at 2 a.m. One of us is the right
              brother for it.
            </p>

            <a
              href="mailto:contact@diferdinando.com"
              className="mt-10 inline-block break-all font-mono text-2xl text-ink underline decoration-line decoration-2 underline-offset-8 transition-colors hover:text-redline hover:decoration-redline sm:text-4xl"
            >
              contact@diferdinando.com
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="mt-14 grid grid-cols-1 border border-line bg-sheet sm:grid-cols-2 lg:grid-cols-4"
          >
            {contactBlock.map((cell, i) => (
              <div
                key={cell.label}
                className={`px-5 py-4 ${i > 0 ? 'border-t border-line sm:border-t-0 sm:border-l max-lg:sm:[&:nth-child(3)]:border-l-0 max-lg:sm:[&:nth-child(n+3)]:border-t' : ''}`}
              >
                <p className="label-mono mb-2">{cell.label}</p>
                {cell.content}
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
};

export default ContactSection;

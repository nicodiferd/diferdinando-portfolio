'use client';

import { motion, MotionConfig } from 'framer-motion';
import Image from 'next/image';
import { projects } from '@/lib/data';
import type { Project } from '@/types';
import WedgeBag from '@/lib/Wedge_bag.jpeg';
import WedgeProfile from '@/lib/wedge_donato.jpeg';

const wedgeShots = [
  { src: WedgeBag, alt: 'Wedge app: your golf bag and club distances' },
  { src: WedgeProfile, alt: 'Wedge app: handicap index and recent rounds' },
];

// Lead marks: who drew what. N = Nicolo (redline), D = Donato (blueline).
const LeadMarks = ({ lead }: { lead: Project['lead'] }) => (
  <span className="flex gap-1" aria-label={`Led by ${lead.join(' and ')}`}>
    {lead.map((initial) => (
      <span
        key={initial}
        className={`flex h-5 w-5 items-center justify-center border font-mono text-[10px] font-medium ${
          initial === 'N'
            ? 'border-redline text-redline'
            : 'border-blueline text-blueline'
        }`}
      >
        {initial}
      </span>
    ))}
  </span>
);

const ProjectLinks = ({ project }: { project: Project }) => {
  if (!project.link && !project.github) return null;
  return (
    <span className="flex gap-5">
      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[11px] uppercase tracking-[0.15em] text-graphite transition-colors hover:text-redline"
        >
          Code ↗
        </a>
      )}
      {project.link && (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[11px] uppercase tracking-[0.15em] text-graphite transition-colors hover:text-redline"
        >
          Visit ↗
        </a>
      )}
    </span>
  );
};

const ProjectsSection = () => {
  const featured = projects.find((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <MotionConfig reducedMotion="user">
      <section id="projects" className="border-b border-line py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <p className="label-mono mb-3">Selected work</p>
            <h2 className="display-wide text-3xl font-bold uppercase text-ink sm:text-4xl">
              Project index
            </h2>
            <p className="mt-4 max-w-2xl text-graphite">
              Each entry is marked with who drew it:{' '}
              <span className="font-mono text-xs text-redline">N</span> — Nicolo,{' '}
              <span className="font-mono text-xs text-blueline">D</span> — Donato.
            </p>
          </motion.div>

          {/* Featured drawing: Wedge */}
          {featured && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-12 border border-line bg-sheet"
            >
              <div className="grid grid-cols-1 lg:grid-cols-5">
                <div className="grid grid-cols-2 gap-4 border-b border-line p-5 lg:col-span-3 lg:border-b-0 lg:border-r">
                  {wedgeShots.map((shot) => (
                    <div
                      key={shot.alt}
                      className="relative h-64 overflow-hidden border border-line sm:h-80"
                    >
                      <Image
                        src={shot.src}
                        alt={shot.alt}
                        fill
                        sizes="(max-width: 1024px) 45vw, 30vw"
                        className="object-cover object-top"
                      />
                    </div>
                  ))}
                </div>
                <div className="flex flex-col justify-center p-7 lg:col-span-2 sm:p-9">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="label-mono">{featured.category}</span>
                    <LeadMarks lead={featured.lead} />
                  </div>
                  <h3 className="display-wide text-2xl font-bold uppercase text-ink">
                    {featured.title}
                  </h3>
                  <p className="mt-4 text-[15px] leading-relaxed text-graphite">
                    {featured.description}
                  </p>
                  <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.12em] text-graphite/80">
                    {featured.technologies.join(' · ')}
                  </p>
                  <div className="mt-5">
                    <ProjectLinks project={featured} />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Index rows */}
          <div className="border-t border-line">
            {rest.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.04 }}
                viewport={{ once: true }}
                className="group border-b border-line py-7 transition-colors hover:bg-sheet"
              >
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  <h3 className="display-wide text-lg font-semibold uppercase text-ink">
                    {project.title}
                  </h3>
                  <LeadMarks lead={project.lead} />
                  <span className="label-mono">{project.category}</span>
                  {project.status && (
                    <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-redline">
                      {project.status}
                    </span>
                  )}
                  <span className="ml-auto">
                    <ProjectLinks project={project} />
                  </span>
                </div>
                <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-graphite">
                  {project.description}
                </p>
                <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.12em] text-graphite/80">
                  {project.technologies.join(' · ')}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </MotionConfig>
  );
};

export default ProjectsSection;

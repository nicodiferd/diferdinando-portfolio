'use client';

import { motion, MotionConfig } from 'framer-motion';
import Image from 'next/image';
import { teamMembers } from '@/lib/data';
import NicoloPhoto from '@/lib/Nicolo.jpeg';
import DonatoPhoto from '@/lib/Donato.jpeg';

const accentBg = {
  redline: 'bg-redline',
  blueline: 'bg-blueline',
} as const;

const accentText = {
  redline: 'text-redline',
  blueline: 'text-blueline',
} as const;

const accentHover = {
  redline: 'hover:text-redline',
  blueline: 'hover:text-blueline',
} as const;

const AboutSection = () => {
  return (
    <MotionConfig reducedMotion="user">
      <section id="about" className="border-b border-line py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <p className="label-mono mb-3">The brothers</p>
            <h2 className="display-wide text-3xl font-bold uppercase text-ink sm:text-4xl">
              Two of us
            </h2>
            <p className="mt-4 max-w-2xl text-graphite">
              Both trained as Industrial Engineers at Cal Poly San Luis Obispo,
              six years apart — and both ended up building at PeopleConnect in
              San Diego. Same degree, different obsessions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {teamMembers.map((member, index) => (
              <motion.article
                key={member.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="border border-line bg-sheet p-7 sm:p-9"
              >
                {/* Header */}
                <div className="flex items-start gap-5">
                  <div className="relative h-24 w-24 shrink-0 overflow-hidden border border-line">
                    <Image
                      src={member.firstName === 'Nicolo' ? NicoloPhoto : DonatoPhoto}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="display-wide text-xl font-bold uppercase leading-tight text-ink sm:text-2xl">
                      {member.firstName}
                    </h3>
                    <div className={`mt-2 h-0.5 w-10 ${accentBg[member.accent]}`} />
                    <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-graphite">
                      {member.role}
                    </p>
                  </div>
                </div>

                <p className="mt-6 text-[15px] leading-relaxed text-graphite">
                  {member.bio}
                </p>

                {/* Specialties */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {member.specialties.map((specialty) => (
                    <span
                      key={specialty}
                      className="border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-graphite"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>

                {/* Revision history */}
                <div className="mt-8">
                  <p className="label-mono mb-3">Revision history</p>
                  <div className="border-t border-line">
                    {member.revisions.map((revision) => (
                      <div
                        key={revision.rev}
                        className="flex items-baseline gap-4 border-b border-line-soft py-2.5 font-mono text-xs"
                      >
                        <span className={`w-4 shrink-0 font-medium ${accentText[member.accent]}`}>
                          {revision.rev}
                        </span>
                        <span className="w-10 shrink-0 text-graphite">
                          {revision.year}
                        </span>
                        <span className="text-ink">{revision.note}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* On record */}
                <div className="mt-7">
                  <p className="label-mono mb-3">On record</p>
                  <ul className="space-y-1.5">
                    {member.onRecord.map((entry) => (
                      <li key={entry} className="font-mono text-xs text-graphite">
                        {entry}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Links */}
                <div className="mt-8 flex flex-wrap gap-6 border-t border-line pt-5">
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`font-mono text-[11px] uppercase tracking-[0.15em] text-graphite transition-colors ${accentHover[member.accent]}`}
                  >
                    LinkedIn ↗
                  </a>
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`font-mono text-[11px] uppercase tracking-[0.15em] text-graphite transition-colors ${accentHover[member.accent]}`}
                  >
                    GitHub ↗
                  </a>
                  {member.website && (
                    <a
                      href={member.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`font-mono text-[11px] uppercase tracking-[0.15em] text-graphite transition-colors ${accentHover[member.accent]}`}
                    >
                      nicolod.org ↗
                    </a>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </MotionConfig>
  );
};

export default AboutSection;

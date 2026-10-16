'use client';

import { motion, MotionConfig } from 'framer-motion';
import { services } from '@/lib/data';

const ServicesSection = () => {
  return (
    <MotionConfig reducedMotion="user">
      <section id="services" className="border-b border-line py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <p className="label-mono mb-3">Capabilities</p>
            <h2 className="display-wide text-3xl font-bold uppercase text-ink sm:text-4xl">
              Six divisions, one practice
            </h2>
            <p className="mt-4 max-w-2xl text-graphite">
              Most projects draw on two or three of these at once: that&apos;s
              the point of hiring brothers instead of two separate contractors.
            </p>
          </motion.div>

          <div className="border-t border-line">
            {services.map((service, index) => (
              <motion.div
                key={service.code}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="group grid grid-cols-1 gap-3 border-b border-line py-7 transition-colors hover:bg-sheet lg:grid-cols-12 lg:gap-6"
              >
                <div className="lg:col-span-1">
                  <span className="font-mono text-sm text-graphite">
                    {service.code}
                  </span>
                </div>
                <div className="lg:col-span-4">
                  <h3 className="display-wide text-lg font-semibold uppercase text-ink">
                    {service.title}
                  </h3>
                </div>
                <div className="lg:col-span-7">
                  <p className="text-[15px] leading-relaxed text-graphite">
                    {service.description}
                  </p>
                  <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.12em] text-graphite/80">
                    {service.features.join(' · ')}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </MotionConfig>
  );
};

export default ServicesSection;

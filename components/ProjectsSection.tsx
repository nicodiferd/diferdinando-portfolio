'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image, { type StaticImageData } from 'next/image';
import { Github, ExternalLink } from 'lucide-react';
import { projects } from '@/lib/data';
import WedgeBag from '@/lib/Wedge_bag.jpeg';
import WedgeProfile from '@/lib/wedge_donato.jpeg';

const categoryLabels: { [key: string]: string } = {
  all: 'All Projects',
  web: 'Web & SaaS',
  mobile: 'Mobile',
  data: 'Data Engineering',
  security: 'Security',
  ai: 'AI / ML',
  infrastructure: 'Infrastructure',
};

// Screenshots that belong to a project, keyed by project id.
const projectShots: { [key: string]: { src: StaticImageData; alt: string }[] } = {
  wedge: [
    { src: WedgeBag, alt: 'Wedge app: your golf bag and club distances' },
    { src: WedgeProfile, alt: 'Wedge app: handicap index and recent rounds' },
  ],
};

// Only show filters for categories that actually have projects.
const categories = [
  { value: 'all', label: categoryLabels.all },
  ...Array.from(new Set(projects.map((p) => p.category))).map((value) => ({
    value,
    label: categoryLabels[value] ?? value,
  })),
];

const ProjectsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredProjects =
    selectedCategory === 'all'
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  return (
    <section id="projects" className="py-20 bg-black relative">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-black to-zinc-950" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Featured Projects</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            A selection of our work showcasing our diverse technical capabilities
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                  selectedCategory === category.value
                    ? 'bg-gradient-to-r from-red-600 to-blue-600 text-white shadow-lg'
                    : 'bg-zinc-900 text-gray-300 hover:bg-zinc-800 border border-zinc-800'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => {
            const shots = projectShots[project.id];
            const isFeatured = project.featured && shots;

            const details = (
              <div className="flex flex-col">
                <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-glow-red transition-all">
                  {project.title}
                </h3>
                <p className="text-gray-400 mb-4">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-zinc-800 text-gray-400 rounded text-xs border border-zinc-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {(project.github || project.link) && (
                  <div className="flex gap-4 mt-auto">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Github className="w-4 h-4" />
                        Code
                      </a>
                    )}
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Visit
                      </a>
                    )}
                  </div>
                )}
              </div>
            );

            return (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className={`card-glow rounded-xl overflow-hidden border border-zinc-800 hover:border-zinc-700 transition-all duration-300 group ${
                  isFeatured ? 'md:col-span-2' : ''
                }`}
              >
                {isFeatured ? (
                  <div className="flex flex-col lg:flex-row">
                    <div className="grid grid-cols-2 gap-4 p-6 lg:w-3/5">
                      {shots.map((shot) => (
                        <div
                          key={shot.alt}
                          className="relative h-64 sm:h-72 overflow-hidden rounded-xl border border-zinc-700/60 bg-zinc-950"
                        >
                          <Image
                            src={shot.src}
                            alt={shot.alt}
                            fill
                            sizes="(max-width: 1024px) 45vw, 25vw"
                            className="object-cover object-top"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="p-6 lg:w-2/5 lg:flex lg:flex-col lg:justify-center">
                      {details}
                    </div>
                  </div>
                ) : (
                  <div className="p-6">{details}</div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;

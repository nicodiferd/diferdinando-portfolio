'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Github, Linkedin, Globe, Award } from 'lucide-react';
import { teamMembers } from '@/lib/data';
import NicoloPhoto from '@/lib/Nicolo.jpeg';
import DonatoPhoto from '@/lib/Donato.jpeg';

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-zinc-950 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(220,38,38,0.1)_0%,transparent_50%),radial-gradient(circle_at_80%_50%,rgba(37,99,235,0.1)_0%,transparent_50%)]" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Meet The Team</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Two brothers with complementary skills, united by a passion for technology and innovation
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="card-glow rounded-xl p-8 border border-zinc-800 hover:border-zinc-700 transition-all duration-300"
            >
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Photo */}
                <div className="lg:w-1/3">
                  <div className="relative w-48 h-48 mx-auto lg:mx-0 rounded-xl overflow-hidden border-2 border-zinc-700">
                    <Image
                      src={member.name.includes('Nicolo') ? NicoloPhoto : DonatoPhoto}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                
                {/* Content */}
                <div className="lg:w-2/3">
                  <h3 className="text-2xl font-bold mb-2 text-white">{member.name}</h3>
                  <p className="text-lg gradient-text mb-4">{member.role}</p>
                  <p className="text-gray-400 mb-6">{member.bio}</p>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold mb-3 text-gray-300">
                  Core Specialties
                </h4>
                <div className="flex flex-wrap gap-2">
                  {member.specialties.map((specialty) => (
                    <span
                      key={specialty}
                      className="px-3 py-1 bg-gradient-to-r from-red-600/20 to-blue-600/20 text-gray-300 border border-zinc-700 rounded-full text-sm"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              {member.certifications && (
                <div className="mb-6">
                  <h4 className="font-semibold mb-3 text-gray-300 flex items-center">
                    <Award className="w-4 h-4 mr-2 text-red-500" />
                    Certifications
                  </h4>
                  <ul className="space-y-1">
                    {member.certifications.map((cert) => (
                      <li key={cert} className="text-gray-400 text-sm">
                        <span className="text-blue-500">•</span> {cert}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex gap-4">
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition-all duration-200"
                >
                  <Linkedin className="w-5 h-5" />
                  LinkedIn
                </a>
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition-all duration-200"
                >
                  <Github className="w-5 h-5" />
                  GitHub
                </a>
                {member.website && (
                  <a
                    href={member.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition-all duration-200"
                  >
                    <Globe className="w-5 h-5" />
                    Website
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
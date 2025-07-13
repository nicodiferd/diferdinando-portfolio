'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Globe, Award } from 'lucide-react';
import { teamMembers } from '@/lib/data';

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
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
              className="bg-gray-50 dark:bg-gray-900 rounded-xl p-8 shadow-lg"
            >
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
                <p className="text-lg text-blue-600 dark:text-blue-400 mb-4">{member.role}</p>
                <p className="text-gray-600 dark:text-gray-300 mb-6">{member.bio}</p>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold mb-3 text-gray-700 dark:text-gray-200">
                  Core Specialties
                </h4>
                <div className="flex flex-wrap gap-2">
                  {member.specialties.map((specialty) => (
                    <span
                      key={specialty}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              {member.certifications && (
                <div className="mb-6">
                  <h4 className="font-semibold mb-3 text-gray-700 dark:text-gray-200 flex items-center">
                    <Award className="w-4 h-4 mr-2" />
                    Certifications
                  </h4>
                  <ul className="space-y-1">
                    {member.certifications.map((cert) => (
                      <li key={cert} className="text-gray-600 dark:text-gray-300 text-sm">
                        • {cert}
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
                  className="flex items-center gap-2 text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                  LinkedIn
                </a>
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                >
                  <Github className="w-5 h-5" />
                  GitHub
                </a>
                {member.website && (
                  <a
                    href={member.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
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
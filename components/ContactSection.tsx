'use client';

import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, MapPin } from 'lucide-react';

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Let's Build Together</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Ready to bring your project to life? We'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-semibold mb-6">Get In Touch</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Whether you need a mobile app, web platform, data infrastructure, or security solution, 
              we're here to help turn your vision into reality.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span>California, USA</span>
              </div>
              
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <a 
                  href="mailto:contact@diferdinando.dev" 
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  contact@diferdinando.dev
                </a>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="font-semibold mb-4">Connect With Us</h4>
              <div className="flex gap-4">
                <a
                  href="https://www.linkedin.com/in/nicolo-diferdinando/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                  Nicolo
                </a>
                <a
                  href="https://www.linkedin.com/in/donato-diferdinando/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                  Donato
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gray-50 dark:bg-gray-900 p-8 rounded-xl"
          >
            <h3 className="text-2xl font-semibold mb-6">Our Expertise</h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">
                  Full-Stack Development
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  React, Next.js, TypeScript, Swift, Python, FastAPI
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">
                  Data & Analytics
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Snowflake, ETL Pipelines, Machine Learning, Tableau
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">
                  Security & Infrastructure
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  SOC Analysis, Penetration Testing, Cloud Architecture
                </p>
              </div>
            </div>

            <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                <strong>Available for:</strong> Contract work, consulting, and long-term partnerships
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
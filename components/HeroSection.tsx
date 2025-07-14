'use client';

import { motion } from 'framer-motion';
import { ArrowDown, Code, Database, Shield, Cpu } from 'lucide-react';

const HeroSection = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black">
      {/* Animated background shapes with red/blue theme */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600 rounded-full mix-blend-screen filter blur-3xl animate-pulse-red" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-600 rounded-full mix-blend-screen filter blur-3xl animate-pulse-blue animation-delay-2000" />
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-red-600 rounded-full mix-blend-screen filter blur-3xl animate-pulse-red animation-delay-4000" />
      </div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" xmlns="http://www.w3.org/2000/svg"%3E%3Cdefs%3E%3Cpattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse"%3E%3Cpath d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="1"/%3E%3C/pattern%3E%3C/defs%3E%3Crect width="100%25" height="100%25" fill="url(%23grid)"/%3E%3C/svg%3E')] opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="gradient-text">DiFerdinando Brothers</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Full-Stack Development • Data Engineering • Cybersecurity • AI Solutions
          </p>
          <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
            Two brothers combining expertise in security, data, and software development to build 
            innovative solutions for modern businesses.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a
                href="#projects"
                className="inline-flex items-center px-8 py-4 bg-red-600 text-white font-medium rounded-lg transition-all duration-300 button-glow-red hover:bg-red-700 hover:scale-105"
              >
                View Our Work
              </a>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a
                href="#contact"
                className="inline-flex items-center px-8 py-4 border-2 border-blue-500 text-blue-500 font-medium rounded-lg transition-all duration-300 hover:bg-blue-500/10 hover:scale-105 hover:border-blue-400"
              >
                Get In Touch
              </a>
            </motion.div>
          </div>

          {/* Tech icons */}
          <div className="flex justify-center items-center gap-8 mb-12">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="text-gray-400 hover:text-red-500 transition-colors"
            >
              <Code className="w-8 h-8" />
            </motion.div>
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="text-gray-400 hover:text-red-500 transition-colors"
            >
              <Database className="w-8 h-8" />
            </motion.div>
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="text-gray-400 hover:text-red-500 transition-colors"
            >
              <Shield className="w-8 h-8" />
            </motion.div>
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="text-gray-400 hover:text-red-500 transition-colors"
            >
              <Cpu className="w-8 h-8" />
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ArrowDown className="w-6 h-6 text-gray-500" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
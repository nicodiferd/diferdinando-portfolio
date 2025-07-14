'use client';

import { motion } from 'framer-motion';
import { Globe, Smartphone, Database, BarChart3, Brain, Shield } from 'lucide-react';
import { services } from '@/lib/data';

const iconMap: { [key: string]: any } = {
  globe: Globe,
  smartphone: Smartphone,
  database: Database,
  chart: BarChart3,
  brain: Brain,
  shield: Shield,
};

const ServicesSection = () => {
  return (
    <section id="services" className="py-20 bg-black relative">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Our Services</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Comprehensive technology solutions tailored to your business needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon];
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                className="card-glow rounded-xl p-8 border border-zinc-800 hover:border-zinc-700 transition-all duration-300 group cursor-pointer"
              >
                <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-red-600/20 to-blue-600/20 rounded-lg mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="w-7 h-7 text-red-500 group-hover:text-blue-500 transition-colors" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">{service.title}</h3>
                <p className="text-gray-400 mb-6">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start text-sm text-gray-500"
                    >
                      <span className="text-red-500 mr-2">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
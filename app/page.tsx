import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import AboutSection from '@/components/AboutSection';
import ProjectsSection from '@/components/ProjectsSection';
import ContactSection from '@/components/ContactSection';

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <footer className="bg-black border-t border-zinc-800 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} <span className="gradient-text font-semibold">DiFerdinando Brothers</span>. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm">
            <a href="mailto:contact@diferdinando.com" className="text-gray-400 hover:text-red-500 transition-colors">
              contact@diferdinando.com
            </a>
            <a href="#contact" className="text-gray-400 hover:text-red-500 transition-colors">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}

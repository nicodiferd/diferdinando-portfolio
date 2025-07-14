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
      <footer className="bg-black border-t border-zinc-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © 2024 <span className="gradient-text">DiFerdinando Brothers</span>. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}

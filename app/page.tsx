import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import AboutSection from '@/components/AboutSection';
import ProjectsSection from '@/components/ProjectsSection';
import ContactSection from '@/components/ContactSection';

export default function Home() {
  const year = new Date().getFullYear();

  const footerBlock = [
    { label: 'Project', value: 'diferdinando.com' },
    { label: 'Drawn by', value: 'N. DiFerdinando' },
    { label: 'Checked by', value: 'D. DiFerdinando' },
    { label: 'Scale', value: '1:1' },
    { label: 'Rev', value: String(year) },
    { label: 'Sheet', value: '1 of 1' },
  ];

  return (
    <>
      <Navigation />
      <main>
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <footer className="border-t border-line">
        <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
          <div className="grid grid-cols-2 border border-line bg-sheet sm:grid-cols-3 lg:grid-cols-6">
            {footerBlock.map((cell, i) => (
              <div
                key={cell.label}
                className={`border-line px-4 py-3 ${i % 2 !== 0 ? 'border-l' : ''} ${i >= 2 ? 'border-t' : ''} sm:border-t-0 ${i % 3 !== 0 ? 'sm:border-l' : 'sm:border-l-0'} ${i >= 3 ? 'sm:border-t' : ''} lg:border-t-0 ${i > 0 ? 'lg:border-l' : 'lg:border-l-0'}`}
              >
                <p className="label-mono mb-1">{cell.label}</p>
                <p className="font-mono text-[13px] text-ink">{cell.value}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
            <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-graphite">
              © {year} DiFerdinando Brothers
            </p>
            <a
              href="mailto:contact@diferdinando.com"
              className="font-mono text-[11px] uppercase tracking-[0.15em] text-graphite transition-colors hover:text-redline"
            >
              contact@diferdinando.com
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}

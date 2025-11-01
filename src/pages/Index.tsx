import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import DigitalPowerSection from '@/components/DigitalPowerSection';
import ClientsCarousel from '@/components/ClientsCarousel';
import PortfolioSection from '@/components/PortfolioSection';
import ProjectsSection from '@/components/ProjectsSection';
import CTASection from '@/components/CTASection';

const Index = () => {
  return (
    <div className="min-h-screen bg-transparent">
      <Header />
      <main>
        <HeroSection />
        <DigitalPowerSection />
        <ClientsCarousel />
        <PortfolioSection />
        <ProjectsSection />
        <CTASection />
      </main>
    </div>
  );
};

export default Index;

import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import DigitalPowerSection from '@/components/DigitalPowerSection';
import ClientsSection from '@/components/ClientsSection';
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
        <ClientsSection />
        <PortfolioSection />
        <ProjectsSection />
        <CTASection />
      </main>
    </div>
  );
};

export default Index;

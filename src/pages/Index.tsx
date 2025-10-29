import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ClientsSection from '@/components/ClientsSection';
import PortfolioSection from '@/components/PortfolioSection';
import MethodologySection from '@/components/MethodologySection';
import ProjectsSection from '@/components/ProjectsSection';
import CTASection from '@/components/CTASection';

const Index = () => {
  return (
    <div className="min-h-screen bg-transparent">
      <Header />
      <main>
        <HeroSection />
        <ClientsSection />
        <PortfolioSection />
        <ProjectsSection />
        <MethodologySection />
        <CTASection />
      </main>
    </div>
  );
};

export default Index;

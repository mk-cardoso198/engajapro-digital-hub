import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ClientsSection from '@/components/ClientsSection';
import PortfolioSection from '@/components/PortfolioSection';
import MethodologySection from '@/components/MethodologySection';
import { Vortex } from '@/components/ui/vortex';

const Index = () => {
  return (
    <div className="min-h-screen bg-black relative">
      <Vortex
        backgroundColor="transparent"
        className="w-full h-full"
        containerClassName="fixed inset-0 z-0"
        particleCount={700}
        baseHue={220}
        rangeSpeed={2}
      />
      
      <div className="relative z-10">
        <Header />
        
        <main>
          <HeroSection />
          <ClientsSection />
          <PortfolioSection />
          <MethodologySection />
        </main>
      </div>
    </div>
  );
};

export default Index;

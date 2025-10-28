import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ClientsSection from '@/components/ClientsSection';
import PortfolioSection from '@/components/PortfolioSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        <HeroSection />
        <ClientsSection />
        <PortfolioSection />
      </main>
    </div>
  );
};

export default Index;

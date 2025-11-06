import { lazy, Suspense } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const HeroSection = lazy(() => import('@/components/HeroSection'));
const DigitalPowerSection = lazy(() => import('@/components/DigitalPowerSection'));
const ClientsCarousel = lazy(() => import('@/components/ClientsCarousel'));
const PortfolioSection = lazy(() => import('@/components/PortfolioSection'));
const ProjectsSection = lazy(() => import('@/components/ProjectsSection'));
const CTASection = lazy(() => import('@/components/CTASection'));

const Index = () => {
  return (
    <div className="min-h-screen bg-transparent">
      <Header />
      <main>
        <Suspense fallback={<div className="min-h-screen bg-black" />}>
          <HeroSection />
          <DigitalPowerSection />
          <ClientsCarousel />
          <PortfolioSection />
          <ProjectsSection />
          <CTASection />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default Index;

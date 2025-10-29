import { Button } from '@/components/ui/button';
import { RainbowButton } from '@/components/ui/rainbow-button';
import logoIntro from '@/assets/logo-intro.png';
import { useState, useEffect } from 'react';

export default function HeroSection() {
  const [animationPhase, setAnimationPhase] = useState<'logo' | 'transition' | 'text'>('logo');

  useEffect(() => {
    // Phase 1: Show logo
    const logoTimer = setTimeout(() => {
      setAnimationPhase('transition');
      
      // Phase 2: Transition (vaporize logo)
      setTimeout(() => {
        setAnimationPhase('text');
      }, 500);
    }, 2500);

    return () => clearTimeout(logoTimer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="flex flex-col items-center text-center z-10 max-w-4xl mx-auto px-4">
        <div className="h-32 md:h-40 lg:h-48 w-full flex items-center justify-center mb-8">
          {animationPhase === 'logo' && (
            <img 
              src={logoIntro} 
              alt="Engaja Pro Logo" 
              className="h-full w-auto animate-fade-in"
              style={{ maxHeight: '200px' }}
            />
          )}
          
          {animationPhase === 'text' && (
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white animate-fade-in">
              Engaja Pro
            </h1>
          )}
        </div>

        <p className="text-xl md:text-3xl text-white/80 mb-12 max-w-2xl font-light">
          Transformando presença digital em resultados reais
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <Button 
            variant="outline" 
            size="lg"
            className="text-lg px-8 py-6"
          >
            Portfólio
          </Button>
          <RainbowButton className="text-lg px-8 py-6 text-white">
            Alavancar Agora
          </RainbowButton>
        </div>
      </div>
    </section>
  );
}

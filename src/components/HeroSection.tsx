import { Button } from '@/components/ui/button';
import { RainbowButton } from '@/components/ui/rainbow-button';
import logoIntro from '@/assets/logo-intro.png';
import { useState, useEffect } from 'react';
import VaporizeTextCycle from '@/components/ui/vaporize-text';

export default function HeroSection() {
  const [animationPhase, setAnimationPhase] = useState<'logo' | 'fadeOut' | 'text'>('logo');
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    // Phase 1: Show logo for 2 seconds
    const logoTimer = setTimeout(() => {
      setAnimationPhase('fadeOut');
      
      // Phase 2: Fade out logo
      setTimeout(() => {
        setAnimationPhase('text');
        setShowText(true);
      }, 800);
    }, 2000);

    return () => clearTimeout(logoTimer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="flex flex-col items-center text-center z-10 max-w-4xl mx-auto px-4">
        <div className="h-32 md:h-40 lg:h-48 w-full flex items-center justify-center mb-8">
          {(animationPhase === 'logo' || animationPhase === 'fadeOut') && (
            <img 
              src={logoIntro} 
              alt="Engaja Pro Logo" 
              className={`h-full w-auto transition-opacity duration-800 ${
                animationPhase === 'logo' ? 'animate-fade-in opacity-100' : 'opacity-0'
              }`}
              style={{ maxHeight: '200px' }}
            />
          )}
          
          {showText && (
            <VaporizeTextCycle
              texts={['Engaja Pro']}
              font={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '80px',
                fontWeight: 700,
              }}
              color="rgb(255, 255, 255)"
              spread={3}
              density={8}
              animation={{
                vaporizeDuration: 0,
                fadeInDuration: 1.5,
                waitDuration: 999999,
              }}
              alignment="center"
              className="w-full h-full flex items-center justify-center text-5xl md:text-7xl lg:text-8xl"
            />
          )}
        </div>

        <p className="text-xl md:text-3xl text-white/80 mb-12 max-w-2xl font-light">
          Criamos Marcas Memoráveis e Resultados Reais
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <Button 
            variant="outline" 
            size="lg"
            className="text-lg px-8 py-6"
            asChild
          >
            <a href="#portfolio">Portfólio</a>
          </Button>
          <RainbowButton className="text-lg px-8 py-6 text-white">
            Alavancar Agora
          </RainbowButton>
        </div>
      </div>
    </section>
  );
}

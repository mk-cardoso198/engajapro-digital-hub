import { Button } from '@/components/ui/button';
import { RainbowButton } from '@/components/ui/rainbow-button';
import VaporizeTextCycle, { Tag } from '@/components/ui/vaporize-text';
import logoIntro from '@/assets/logo-intro.png';
import { useState, useEffect } from 'react';

export default function HeroSection() {
  const [showLogo, setShowLogo] = useState(true);
  const [startTextAnimation, setStartTextAnimation] = useState(false);

  useEffect(() => {
    // Show logo for 2 seconds, then start text animation
    const logoTimer = setTimeout(() => {
      setShowLogo(false);
      setTimeout(() => {
        setStartTextAnimation(true);
      }, 100);
    }, 2000);

    return () => clearTimeout(logoTimer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="flex flex-col items-center text-center z-10 max-w-4xl mx-auto px-4">
        <div className="h-32 md:h-40 lg:h-48 w-full flex items-center justify-center mb-8">
          {showLogo ? (
            <img 
              src={logoIntro} 
              alt="Engaja Pro Logo" 
              className="h-full w-auto animate-fade-in"
            />
          ) : startTextAnimation ? (
            <VaporizeTextCycle
              texts={["Engaja Pro"]}
              font={{
                fontFamily: "Inter, sans-serif",
                fontSize: "80px",
                fontWeight: 700,
              }}
              color="rgb(255, 255, 255)"
              spread={5}
              density={5}
              animation={{
                vaporizeDuration: 2,
                fadeInDuration: 1,
                waitDuration: 999999,
              }}
              direction="left-to-right"
              alignment="center"
              tag={Tag.H1}
            />
          ) : null}
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
          <RainbowButton className="text-lg px-8 py-6">
            Alavancar Agora
          </RainbowButton>
        </div>
      </div>
    </section>
  );
}

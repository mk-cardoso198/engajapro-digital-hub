import { Button } from '@/components/ui/button';
import { RainbowButton } from '@/components/ui/rainbow-button';
import { Vortex } from '@/components/ui/vortex';
import VaporizeTextCycle, { Tag } from '@/components/ui/vaporize-text';
import logoIntro from '@/assets/logo-intro.png';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <Vortex
        backgroundColor="transparent"
        className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
        containerClassName="w-full h-full"
        particleCount={500}
        baseHue={220}
        rangeSpeed={2}
      >
        <div className="flex flex-col items-center text-center z-10 max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 text-white">
            Engaja Pro
          </h1>

          <p className="text-xl md:text-3xl text-foreground/90 mb-12 max-w-2xl font-light">
            Transformando presença digital em resultados reais
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <Button 
              variant="outline" 
              size="lg"
              className="text-lg px-8 py-6 hover:bg-primary/10 hover:border-primary transition-all"
            >
              Portfólio
            </Button>
            <RainbowButton className="text-lg px-8 py-6">
              Alavancar Agora
            </RainbowButton>
          </div>
        </div>
      </Vortex>
    </section>
  );
}

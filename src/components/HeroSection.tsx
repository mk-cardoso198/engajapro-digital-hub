import { Button } from '@/components/ui/button';
import { RainbowButton } from '@/components/ui/rainbow-button';
import VaporizeTextCycle from '@/components/ui/vaporize-text';
import logoHero from '@/assets/logo-engaja-hero.png';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="flex flex-col items-center text-center z-10 max-w-4xl mx-auto px-4">
        <img 
          src={logoHero} 
          alt="Engaja Pro Logo" 
          className="w-32 h-auto md:w-40 lg:w-48 mb-4 md:mb-6 object-contain"
        />
        <div className="h-24 md:h-32 lg:h-40 w-full flex items-center justify-center mb-6 md:mb-8">
          <VaporizeTextCycle
            texts={['Engaja Pro']}
            font={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '48px',
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
            className="w-full h-full"
          />
        </div>

        <p className="text-lg md:text-2xl lg:text-3xl text-white/80 mb-8 md:mb-12 max-w-2xl font-light px-4">
          Criamos Marcas Memoráveis e Resultados Reais
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <Button 
            variant="outline" 
            size="lg"
            className="text-base md:text-lg px-6 md:px-8 py-5 md:py-6"
            asChild
          >
            <a href="#portfolio">Portfólio</a>
          </Button>
          <RainbowButton className="text-base md:text-lg px-6 md:px-8 py-5 md:py-6 text-white">
            Alavancar Agora
          </RainbowButton>
        </div>
      </div>
    </section>
  );
}

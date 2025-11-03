import avenida from '@/assets/clients/avenida.png';
import bigodes from '@/assets/clients/bigodes.png';
import copaArena from '@/assets/clients/copa-arena.png';
import cria from '@/assets/clients/cria.png';
import nalaje from '@/assets/clients/nalaje.png';
import supercopa from '@/assets/clients/supercopa.png';

const ClientsCarousel = () => {
  const logos = [avenida, bigodes, copaArena, cria, nalaje, supercopa];
  
  // Duplicar logos para loop contínuo (usado com translateX(-50%))
  const allLogos = [...logos, ...logos];

  return (
    <section className="w-full py-16 md:py-24 bg-black/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-foreground mb-12 md:mb-16">
          Alguns de nossos clientes
        </h2>
        
        <div className="relative">
          <div 
            className="flex gap-8 md:gap-12 lg:gap-16 animate-infinite-scroll"
            style={{ willChange: 'transform' }}
          >
            {allLogos.map((logo, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-32 h-20 md:w-40 md:h-24 lg:w-48 lg:h-28 flex items-center justify-center"
              >
                <img
                  src={logo}
                  alt={`Cliente ${(index % logos.length) + 1}`}
                  className="max-w-full max-h-full object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientsCarousel;

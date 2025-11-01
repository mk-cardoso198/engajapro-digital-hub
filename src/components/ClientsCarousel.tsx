import client01 from '@/assets/clients/client-01.svg';
import client02 from '@/assets/clients/client-02.svg';
import client03 from '@/assets/clients/client-03.svg';
import client04 from '@/assets/clients/client-04.svg';
import client05 from '@/assets/clients/client-05.svg';

const ClientsCarousel = () => {
  const logos = [client01, client02, client03, client04, client05];
  
  // Duplicar logos para efeito infinito suave
  const allLogos = [...logos, ...logos, ...logos];

  return (
    <section className="w-full py-16 md:py-24 bg-black/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-foreground mb-12 md:mb-16">
          Alguns de nossos clientes
        </h2>
        
        <div className="relative">
          <div className="flex gap-8 md:gap-12 lg:gap-16 animate-infinite-scroll">
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

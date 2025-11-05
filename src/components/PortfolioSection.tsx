import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';

type Service = {
  id: string;
  title: string;
  description: string;
  back_image: string;
  front_image: string;
  display_order: number;
  active: boolean;
};

export default function PortfolioSection() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: 'start',
    slidesToScroll: 1,
    containScroll: 'trimSnaps',
    breakpoints: {
      '(min-width: 640px)': { slidesToScroll: 1 },
      '(min-width: 1024px)': { slidesToScroll: 1 },
    },
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    loadServices();

    // Subscribe to realtime changes
    const channel = supabase
      .channel('services-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'services',
        },
        () => {
          loadServices();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const loadServices = async () => {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('active', true)
      .order('display_order', { ascending: true });

    if (!error && data) {
      setServices(data);
    }
    setLoading(false);
  };

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  if (loading) {
    return (
      <section id="servicos" className="py-12 md:py-20 lg:py-32 bg-gradient-to-b from-blue-950/20 to-black">
        <div className="container mx-auto px-4">
          <div className="text-center text-white">Carregando serviços...</div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section id="servicos" className="py-12 md:py-20 lg:py-32 bg-gradient-to-b from-blue-950/20 to-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
              Nossos Serviços
            </h2>
            <p className="text-white/70 text-base md:text-lg max-w-2xl mx-auto px-4">
              Soluções completas de marketing digital para alavancar sua presença online
            </p>
          </div>

          {services.length === 0 ? (
            <div className="text-center text-white/70 py-12">
              Nenhum serviço disponível no momento.
            </div>
          ) : (
            <div className="relative max-w-7xl mx-auto">
              {/* Navigation Buttons - Repositioned to sides */}
              <Button
                variant="outline"
                size="icon"
                onClick={scrollPrev}
                disabled={!canScrollPrev}
                className="hidden lg:flex absolute -left-16 top-[40%] -translate-y-1/2 z-10 bg-white/10 border-white/20 text-white hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                aria-label="Serviço anterior"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>

              <Button
                variant="outline"
                size="icon"
                onClick={scrollNext}
                disabled={!canScrollNext}
                className="hidden lg:flex absolute -right-16 top-[40%] -translate-y-1/2 z-10 bg-white/10 border-white/20 text-white hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                aria-label="Próximo serviço"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>

              {/* Carousel */}
              <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex gap-6">
                  {services.map((service, index) => (
                    <div
                      key={service.id}
                      className="flex-[0_0_100%] sm:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(33.333%-16px)] min-w-0"
                    >
                      <button
                        onClick={() => setSelectedService(service)}
                        className="w-full group bg-gray-50 dark:bg-gray-800/50 rounded-3xl p-6 flex flex-col h-[320px] transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                      >
                        {/* Image Container */}
                        <div className="relative flex-grow flex items-center justify-center mb-4">
                          {/* Back Image */}
                          <img
                            src={service.back_image}
                            alt={`${service.title} showcase`}
                            className="absolute w-44 h-auto rounded-lg shadow-md transform -rotate-6 transition-all duration-400 ease-in-out group-hover:rotate-[-10deg] group-hover:scale-105"
                            loading="lazy"
                          />
                          {/* Front Image */}
                          <img
                            src={service.front_image}
                            alt={`${service.title} example`}
                            className="absolute w-44 h-auto rounded-lg shadow-lg transform rotate-3 transition-all duration-400 ease-in-out group-hover:rotate-[5deg] group-hover:scale-105"
                            loading="lazy"
                          />
                        </div>

                        {/* Service Title */}
                        <h3 className="text-left text-lg font-medium text-gray-800 dark:text-gray-100 mt-auto">
                          {service.title}
                        </h3>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dot Indicators */}
              <div className="flex justify-center gap-2 mt-8">
                {services.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => scrollTo(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === selectedIndex
                        ? 'w-8 bg-white'
                        : 'w-2 bg-white/30 hover:bg-white/50'
                    }`}
                    aria-label={`Ir para serviço ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Service Details Dialog */}
      <Dialog open={!!selectedService} onOpenChange={() => setSelectedService(null)}>
        <DialogContent className="sm:max-w-2xl bg-gray-900 border-gray-800">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white">
              {selectedService?.title}
            </DialogTitle>
            <DialogDescription className="text-white/70 text-base leading-relaxed mt-4">
              {selectedService?.description}
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-4 mt-4">
            <img
              src={selectedService?.back_image}
              alt={selectedService?.title}
              className="w-1/2 rounded-lg shadow-lg"
            />
            <img
              src={selectedService?.front_image}
              alt={selectedService?.title}
              className="w-1/2 rounded-lg shadow-lg"
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

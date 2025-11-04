import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const portfolioItems = [
  {
    title: 'Gestão de Redes Sociais',
    backImage: 'https://placehold.co/512x512/1e3a8a/3b82f6?text=Social+Media',
    frontImage: 'https://placehold.co/512x512/3b82f6/60a5fa?text=Engagement',
  },
  {
    title: 'Tráfego Pago',
    backImage: 'https://placehold.co/512x512/065f46/10b981?text=Paid+Ads',
    frontImage: 'https://placehold.co/512x512/10b981/34d399?text=ROI+5x',
  },
  {
    title: 'Marketing de Influência',
    backImage: 'https://placehold.co/512x512/9f1239/f43f5e?text=Influencers',
    frontImage: 'https://placehold.co/512x512/f43f5e/fb923c?text=Reach+2M',
  },
  {
    title: 'Produção de Conteúdo',
    backImage: 'https://placehold.co/512x512/7c2d12/dc2626?text=Content',
    frontImage: 'https://placehold.co/512x512/dc2626/a855f7?text=Video+Photo',
  },
  {
    title: 'Consultoria Estratégica',
    backImage: 'https://placehold.co/512x512/0c4a6e/0ea5e9?text=Strategy',
    frontImage: 'https://placehold.co/512x512/0ea5e9/22d3ee?text=Growth',
  },
  {
    title: 'Analytics & Insights',
    backImage: 'https://placehold.co/512x512/581c87/a855f7?text=Analytics',
    frontImage: 'https://placehold.co/512x512/a855f7/3b82f6?text=Data',
  },
  {
    title: 'Criação de Sites',
    backImage: 'https://placehold.co/512x512/0e7490/06b6d4?text=Websites',
    frontImage: 'https://placehold.co/512x512/06b6d4/22d3ee?text=Landing+Pages',
  },
  {
    title: 'Criação de Sistemas',
    backImage: 'https://placehold.co/512x512/4c1d95/6366f1?text=Systems',
    frontImage: 'https://placehold.co/512x512/6366f1/8b5cf6?text=Custom+Dev',
  },
  {
    title: 'Lojas Online',
    backImage: 'https://placehold.co/512x512/065f46/059669?text=E-commerce',
    frontImage: 'https://placehold.co/512x512/059669/14b8a6?text=Online+Store',
  },
];

export default function PortfolioSection() {
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

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  return (
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

        <div className="relative">
          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/10 border-white/20 text-white hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed -ml-4"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={scrollNext}
            disabled={!canScrollNext}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/10 border-white/20 text-white hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed -mr-4"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          {/* Carousel */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {portfolioItems.map((item, index) => (
                <div
                  key={index}
                  className="flex-[0_0_100%] sm:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(33.333%-16px)] min-w-0"
                >
                  <div className="group bg-gray-50 dark:bg-gray-800/50 rounded-3xl p-6 flex flex-col h-[320px] transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800">
                    {/* Image Container */}
                    <div className="relative flex-grow flex items-center justify-center mb-4">
                      {/* Back Image */}
                      <img
                        src={item.backImage}
                        alt={`${item.title} showcase`}
                        className="absolute w-44 h-auto rounded-lg shadow-md transform -rotate-6 transition-all duration-400 ease-in-out group-hover:rotate-[-10deg] group-hover:scale-105"
                        loading="lazy"
                      />
                      {/* Front Image */}
                      <img
                        src={item.frontImage}
                        alt={`${item.title} example`}
                        className="absolute w-44 h-auto rounded-lg shadow-lg transform rotate-3 transition-all duration-400 ease-in-out group-hover:rotate-[5deg] group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>

                    {/* Service Title */}
                    <h3 className="text-left text-lg font-medium text-gray-800 dark:text-gray-100 mt-auto">
                      {item.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

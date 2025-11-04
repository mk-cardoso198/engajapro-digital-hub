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

// Import service images
import socialMediaBack from '@/assets/services/social-media-back.png';
import socialMediaFront from '@/assets/services/social-media-front.png';
import paidTrafficBack from '@/assets/services/paid-traffic-back.png';
import paidTrafficFront from '@/assets/services/paid-traffic-front.png';
import influencerBack from '@/assets/services/influencer-back.png';
import influencerFront from '@/assets/services/influencer-front.png';
import contentBack from '@/assets/services/content-back.png';
import contentFront from '@/assets/services/content-front.png';
import consultingBack from '@/assets/services/consulting-back.png';
import consultingFront from '@/assets/services/consulting-front.png';
import analyticsBack from '@/assets/services/analytics-back.png';
import analyticsFront from '@/assets/services/analytics-front.png';
import websitesBack from '@/assets/services/websites-back.png';
import websitesFront from '@/assets/services/websites-front.png';
import systemsBack from '@/assets/services/systems-back.png';
import systemsFront from '@/assets/services/systems-front.png';
import ecommerceBack from '@/assets/services/ecommerce-back.png';
import ecommerceFront from '@/assets/services/ecommerce-front.png';

const portfolioItems = [
  {
    title: 'Gestão de Redes Sociais',
    backImage: socialMediaBack,
    frontImage: socialMediaFront,
    description: 'Transformamos suas redes sociais em canais de engajamento e vendas. Criamos estratégias personalizadas, gerenciamos publicações diárias, respondemos sua audiência e construímos uma comunidade leal ao redor da sua marca. Nossa equipe está sempre atenta às tendências para manter seu perfil relevante e atrativo.',
  },
  {
    title: 'Tráfego Pago',
    backImage: paidTrafficBack,
    frontImage: paidTrafficFront,
    description: 'Campanhas de anúncios otimizadas no Google Ads, Facebook Ads, Instagram Ads e TikTok Ads. Focamos em maximizar seu ROI através de segmentação inteligente, criativos impactantes e análise constante de métricas. Cada real investido é estrategicamente direcionado para gerar resultados mensuráveis.',
  },
  {
    title: 'Marketing de Influência',
    backImage: influencerBack,
    frontImage: influencerFront,
    description: 'Conectamos sua marca com influenciadores relevantes para seu nicho. Gerenciamos todo o processo: desde a seleção e negociação até a execução e mensuração de resultados. Criamos campanhas autênticas que geram engajamento real e expandem o alcance da sua marca exponencialmente.',
  },
  {
    title: 'Produção de Conteúdo',
    backImage: contentBack,
    frontImage: contentFront,
    description: 'Criamos conteúdo visual de alta qualidade: fotos profissionais, vídeos envolventes, motion graphics e animações. Nossa equipe criativa transforma sua mensagem em conteúdo que captura atenção, conta histórias e converte espectadores em clientes. Do conceito à produção final.',
  },
  {
    title: 'Consultoria Estratégica',
    backImage: consultingBack,
    frontImage: consultingFront,
    description: 'Desenvolvemos estratégias de marketing digital personalizadas para seu negócio. Analisamos seu mercado, concorrência e audiência para criar um plano de ação claro e efetivo. Oferecemos orientação contínua para garantir que sua marca esteja sempre à frente da competição.',
  },
  {
    title: 'Analytics & Insights',
    backImage: analyticsBack,
    frontImage: analyticsFront,
    description: 'Transformamos dados em decisões estratégicas. Monitoramos e analisamos todas as métricas importantes do seu negócio digital, gerando relatórios detalhados e insights acionáveis. Você entende exatamente o que está funcionando e onde investir para crescer ainda mais.',
  },
  {
    title: 'Criação de Sites',
    backImage: websitesBack,
    frontImage: websitesFront,
    description: 'Desenvolvemos sites modernos, responsivos e otimizados para conversão. Do landing page ao site institucional completo, criamos experiências digitais que representam sua marca com excelência. Cada projeto é pensado para gerar resultados, seja captar leads ou vender produtos.',
  },
  {
    title: 'Criação de Sistemas',
    backImage: systemsBack,
    frontImage: systemsFront,
    description: 'Criamos sistemas web personalizados para automatizar processos e otimizar sua operação. Dashboards, CRMs, ERPs e plataformas sob medida que resolvem os desafios específicos do seu negócio. Tecnologia que simplifica e potencializa seus resultados.',
  },
  {
    title: 'Lojas Online',
    backImage: ecommerceBack,
    frontImage: ecommerceFront,
    description: 'Desenvolvemos e-commerces completos e otimizados para vendas. Integramos com os principais meios de pagamento, sistemas de gestão de estoque e ferramentas de marketing. Sua loja online com design atrativo, navegação intuitiva e todo suporte técnico para vender mais.',
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
  const [selectedService, setSelectedService] = useState<typeof portfolioItems[0] | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

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
                {portfolioItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex-[0_0_100%] sm:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(33.333%-16px)] min-w-0"
                  >
                    <button
                      onClick={() => setSelectedService(item)}
                      className="w-full group bg-gray-50 dark:bg-gray-800/50 rounded-3xl p-6 flex flex-col h-[320px] transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                    >
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
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Dot Indicators */}
            <div className="flex justify-center gap-2 mt-8">
              {portfolioItems.map((_, index) => (
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
              src={selectedService?.backImage}
              alt={selectedService?.title}
              className="w-1/2 rounded-lg shadow-lg"
            />
            <img
              src={selectedService?.frontImage}
              alt={selectedService?.title}
              className="w-1/2 rounded-lg shadow-lg"
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

"use client";

import AutoScroll from "embla-carousel-auto-scroll";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import avenida from '@/assets/clients/avenida.png';
import bigodes from '@/assets/clients/bigodes.png';
import copaArena from '@/assets/clients/copa-arena.png';
import nalaje from '@/assets/clients/nalaje.png';
import cria from '@/assets/clients/cria-white.png';
import supercopa from '@/assets/clients/supercopa.png';

const logos = [
  {
    id: "avenida",
    description: "Avenida F.C.",
    image: avenida,
    className: "h-16 w-auto object-contain",
  },
  {
    id: "bigodes",
    description: "Bigodes FC",
    image: bigodes,
    className: "h-16 w-auto object-contain",
  },
  {
    id: "copa-arena",
    description: "Copa Arena Futsal",
    image: copaArena,
    className: "h-16 w-auto object-contain",
  },
  {
    id: "nalaje",
    description: "Nalaje",
    image: nalaje,
    className: "h-16 w-auto object-contain",
  },
  {
    id: "cria",
    description: "CRIA",
    image: cria,
    className: "h-16 w-auto object-contain",
  },
  {
    id: "supercopa",
    description: "Super Copa Itanhaém",
    image: supercopa,
    className: "h-16 w-auto object-contain",
  },
];

export default function ClientsSection() {
  return (
    <section className="py-32 bg-transparent">
      <div className="container flex flex-col items-center text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
          Alguns dos nossos clientes
        </h2>
        <p className="text-white/70 text-lg md:text-xl max-w-2xl">
          Empresas que confiam no nosso trabalho
        </p>
      </div>
      <div className="pt-12 md:pt-20">
        <div className="relative mx-auto flex items-center justify-center">
          <Carousel
            opts={{ loop: true }}
            plugins={[AutoScroll({ playOnInit: true, speed: 1 })]}
          >
            <CarouselContent className="ml-0">
              {logos.map((logo) => (
                <CarouselItem
                  key={logo.id}
                  className="flex basis-1/2 md:basis-1/3 lg:basis-1/4 justify-center pl-0"
                >
                  <div className="mx-10 flex shrink-0 items-center justify-center">
                    <img
                      src={logo.image}
                      alt={logo.description}
                      className={`${logo.className} opacity-80 hover:opacity-100 transition-opacity`}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-black to-transparent"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-black to-transparent"></div>
        </div>
      </div>
    </section>
  );
}

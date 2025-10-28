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
import cria from '@/assets/clients/cria.png';
import supercopa from '@/assets/clients/supercopa.png';

const logos = [
  {
    id: "avenida",
    description: "Avenida F.C.",
    image: avenida,
    className: "h-16 w-auto",
  },
  {
    id: "bigodes",
    description: "Bigodes FC",
    image: bigodes,
    className: "h-16 w-auto",
  },
  {
    id: "copa-arena",
    description: "Copa Arena Futsal",
    image: copaArena,
    className: "h-16 w-auto",
  },
  {
    id: "nalaje",
    description: "Nalaje",
    image: nalaje,
    className: "h-16 w-auto",
  },
  {
    id: "cria",
    description: "CRIA",
    image: cria,
    className: "h-12 w-auto",
  },
  {
    id: "supercopa",
    description: "Super Copa Itanhaém",
    image: supercopa,
    className: "h-16 w-auto",
  },
];

export default function ClientsSection() {
  return (
    <section className="py-20 md:py-32">
      <div className="container flex flex-col items-center text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Alguns dos nossos clientes
        </h2>
        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl">
          Parceiros que confiam em nosso trabalho
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
                  className="flex basis-1/2 justify-center pl-0 sm:basis-1/3 md:basis-1/4 lg:basis-1/6"
                >
                  <div className="mx-8 md:mx-12 flex shrink-0 items-center justify-center">
                    <img
                      src={logo.image}
                      alt={logo.description}
                      className={logo.className}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
}

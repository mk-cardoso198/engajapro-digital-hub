import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

// Fallback logos for when database is empty
import avenida from '@/assets/clients/avenida.png';
import bigodes from '@/assets/clients/bigodes.png';
import copaArena from '@/assets/clients/copa-arena.png';
import cria from '@/assets/clients/cria.png';
import nalaje from '@/assets/clients/nalaje.png';
import supercopa from '@/assets/clients/supercopa.png';

type Client = {
  id: string;
  name: string;
  logo_url: string;
  display_order: number;
};

const fallbackLogos = [
  { name: 'Avenida', logo_url: avenida },
  { name: 'Bigodes', logo_url: bigodes },
  { name: 'Copa Arena', logo_url: copaArena },
  { name: 'Cria', logo_url: cria },
  { name: 'Nalaje', logo_url: nalaje },
  { name: 'Supercopa', logo_url: supercopa },
];

const ClientsCarousel = () => {
  const [clients, setClients] = useState<{ name: string; logo_url: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadClients = async () => {
      const { data, error } = await supabase
        .from('clients')
        .select('id, name, logo_url, display_order')
        .eq('active', true)
        .order('display_order', { ascending: true });

      if (error || !data || data.length === 0) {
        // Use fallback logos if no clients in database
        setClients(fallbackLogos);
      } else {
        setClients(data);
      }
      setLoading(false);
    };

    loadClients();

    // Subscribe to realtime changes
    const channel = supabase
      .channel('clients-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'clients' },
        () => {
          loadClients();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (loading) {
    return (
      <section className="w-full py-16 md:py-24 bg-black/50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-foreground mb-12 md:mb-16">
            Alguns de nossos clientes
          </h2>
          <div className="flex justify-center">
            <div className="animate-pulse text-muted-foreground">Carregando...</div>
          </div>
        </div>
      </section>
    );
  }

  if (clients.length === 0) {
    return null;
  }

  return (
    <section className="w-full py-16 md:py-24 bg-black/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-foreground mb-12 md:mb-16">
          Alguns de nossos clientes
        </h2>
        
        {/* First Carousel - Moving Left */}
        <div className="relative overflow-hidden group mb-8">
          <div className="flex">
            {/* Track 1 */}
            <div 
              className="flex gap-8 md:gap-12 lg:gap-16 shrink-0 animate-marquee [animation-duration:20s] group-hover:[animation-play-state:paused] motion-reduce:animate-none"
              style={{ willChange: 'transform' }}
            >
              {clients.map((client, index) => (
                <div
                  key={`track1-${index}`}
                  className="flex-shrink-0 w-32 h-20 md:w-40 md:h-24 lg:w-48 lg:h-28 flex items-center justify-center"
                >
                  <img
                    src={client.logo_url}
                    alt={client.name}
                    className="max-w-full max-h-full object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              ))}
            </div>
            
            {/* Track 2 - Identical copy for seamless loop */}
            <div 
              className="flex gap-8 md:gap-12 lg:gap-16 shrink-0 animate-marquee [animation-duration:20s] group-hover:[animation-play-state:paused] motion-reduce:animate-none"
              style={{ willChange: 'transform' }}
            >
              {clients.map((client, index) => (
                <div
                  key={`track2-${index}`}
                  className="flex-shrink-0 w-32 h-20 md:w-40 md:h-24 lg:w-48 lg:h-28 flex items-center justify-center"
                >
                  <img
                    src={client.logo_url}
                    alt={client.name}
                    className="max-w-full max-h-full object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Second Carousel - Moving Right (Reverse) */}
        <div className="relative overflow-hidden group">
          <div className="flex">
            {/* Track 1 - Reverse */}
            <div 
              className="flex gap-8 md:gap-12 lg:gap-16 shrink-0 animate-marquee-reverse [animation-duration:25s] group-hover:[animation-play-state:paused] motion-reduce:animate-none"
              style={{ willChange: 'transform' }}
            >
              {[...clients].reverse().map((client, index) => (
                <div
                  key={`track1-reverse-${index}`}
                  className="flex-shrink-0 w-32 h-20 md:w-40 md:h-24 lg:w-48 lg:h-28 flex items-center justify-center"
                >
                  <img
                    src={client.logo_url}
                    alt={client.name}
                    className="max-w-full max-h-full object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              ))}
            </div>
            
            {/* Track 2 - Identical copy for seamless loop (Reverse) */}
            <div 
              className="flex gap-8 md:gap-12 lg:gap-16 shrink-0 animate-marquee-reverse [animation-duration:25s] group-hover:[animation-play-state:paused] motion-reduce:animate-none"
              style={{ willChange: 'transform' }}
            >
              {[...clients].reverse().map((client, index) => (
                <div
                  key={`track2-reverse-${index}`}
                  className="flex-shrink-0 w-32 h-20 md:w-40 md:h-24 lg:w-48 lg:h-28 flex items-center justify-center"
                >
                  <img
                    src={client.logo_url}
                    alt={client.name}
                    className="max-w-full max-h-full object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientsCarousel;

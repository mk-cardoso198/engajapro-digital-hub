import { LogoCarousel } from '@/components/ui/logo-carousel';
import { GradientHeading } from '@/components/ui/gradient-heading';
import type { Logo } from '@/components/ui/logo-carousel';
import Client01Svg from '@/assets/clients/client-01.svg';
import Client02Svg from '@/assets/clients/client-02.svg';
import Client03Svg from '@/assets/clients/client-03.svg';
import Client04Svg from '@/assets/clients/client-04.svg';
import Client05Svg from '@/assets/clients/client-05.svg';

const Client01 = (props: React.SVGProps<SVGSVGElement>) => (
  <img src={Client01Svg} alt="Cliente 1" className={props.className} />
);
const Client02 = (props: React.SVGProps<SVGSVGElement>) => (
  <img src={Client02Svg} alt="Cliente 2" className={props.className} />
);
const Client03 = (props: React.SVGProps<SVGSVGElement>) => (
  <img src={Client03Svg} alt="Cliente 3" className={props.className} />
);
const Client04 = (props: React.SVGProps<SVGSVGElement>) => (
  <img src={Client04Svg} alt="Cliente 4" className={props.className} />
);
const Client05 = (props: React.SVGProps<SVGSVGElement>) => (
  <img src={Client05Svg} alt="Cliente 5" className={props.className} />
);

const ClientsSection = () => {
  const logos: Logo[] = [
    { name: 'Cliente 1', id: 1, img: Client01 },
    { name: 'Cliente 2', id: 2, img: Client02 },
    { name: 'Cliente 3', id: 3, img: Client03 },
    { name: 'Cliente 4', id: 4, img: Client04 },
    { name: 'Cliente 5', id: 5, img: Client05 },
  ];

  return (
    <section className="w-full py-12 md:py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <GradientHeading size="md" weight="bold" variant="light">
            Alguns de nossos clientes
          </GradientHeading>
        </div>
        
        <div className="flex justify-center items-center">
          <LogoCarousel columnCount={5} logos={logos} />
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;

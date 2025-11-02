import { forwardRef, useRef } from "react";
import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import logoEngaja from "@/assets/logo-engaja-pro-center.svg";
import youtubeIcon from "@/assets/social/youtube.svg";
import googleIcon from "@/assets/social/google.svg";
import instagramIcon from "@/assets/social/instagram.svg";
import whatsappIcon from "@/assets/social/whatsapp.svg";
import tiktokIcon from "@/assets/social/tiktok.svg";
import facebookIcon from "@/assets/social/facebook.svg";

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-16 md:size-20 items-center justify-center rounded-full border-2 border-blue-500 bg-black/80 backdrop-blur-md p-3 shadow-[0_0_20px_rgba(59,130,246,0.5)]",
        className,
      )}
    >
      {children}
    </div>
  );
});

Circle.displayName = "Circle";

export default function DigitalPowerSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);
  const div6Ref = useRef<HTMLDivElement>(null);
  const div7Ref = useRef<HTMLDivElement>(null);

  return (
    <section id="digital-power" className="py-12 md:py-20 px-4 bg-gradient-to-b from-black to-blue-950/20">
      <div className="max-w-4xl mx-auto text-center mb-8 md:mb-16">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 md:mb-6 px-4">
          Usamos todo o poder das vias digitais ao seu favor
        </h2>
        <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto px-4">
          Use todo o poder das suas vias digitas para alavancar seu negocio e sua imagem, 
          com as metodologias e tecnicas da Engaja Pro você pode subir para um novo nível
        </p>
      </div>

      <div
        className="relative flex h-[300px] md:h-[450px] lg:h-[500px] w-full max-w-4xl mx-auto items-center justify-center overflow-hidden p-4 md:p-8 lg:p-10"
        ref={containerRef}
      >
        <div className="flex size-full flex-col max-w-sm md:max-w-md lg:max-w-lg max-h-[220px] md:max-h-[300px] lg:max-h-[350px] items-stretch justify-between gap-4 md:gap-8 lg:gap-10">
          <div className="flex flex-row items-center justify-between">
            <Circle ref={div1Ref}>
              <img src={whatsappIcon} alt="WhatsApp" className="w-full h-full object-contain" />
            </Circle>
            <Circle ref={div5Ref}>
              <img src={facebookIcon} alt="Facebook" className="w-full h-full object-contain" />
            </Circle>
          </div>
          <div className="flex flex-row items-center justify-between">
            <Circle ref={div2Ref}>
              <img src={instagramIcon} alt="Instagram" className="w-full h-full object-contain" />
            </Circle>
            <Circle ref={div4Ref} className="size-24 md:size-28 border-4 shadow-[0_0_30px_rgba(59,130,246,0.7)]">
              <img src={logoEngaja} alt="Engaja Pro" className="w-full h-full object-contain" />
            </Circle>
            <Circle ref={div6Ref}>
              <img src={tiktokIcon} alt="TikTok" className="w-full h-full object-contain" />
            </Circle>
          </div>
          <div className="flex flex-row items-center justify-between">
            <Circle ref={div3Ref}>
              <img src={googleIcon} alt="Google" className="w-full h-full object-contain" />
            </Circle>
            <Circle ref={div7Ref}>
              <img src={youtubeIcon} alt="YouTube" className="w-full h-full object-contain" />
            </Circle>
          </div>
        </div>

        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div1Ref}
          toRef={div4Ref}
          curvature={-75}
          endYOffset={-10}
          gradientStartColor="#3b82f6"
          gradientStopColor="#1d4ed8"
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div2Ref}
          toRef={div4Ref}
          gradientStartColor="#3b82f6"
          gradientStopColor="#1d4ed8"
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div3Ref}
          toRef={div4Ref}
          curvature={75}
          endYOffset={10}
          gradientStartColor="#3b82f6"
          gradientStopColor="#1d4ed8"
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div5Ref}
          toRef={div4Ref}
          curvature={-75}
          endYOffset={-10}
          reverse
          gradientStartColor="#3b82f6"
          gradientStopColor="#1d4ed8"
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div6Ref}
          toRef={div4Ref}
          reverse
          gradientStartColor="#3b82f6"
          gradientStopColor="#1d4ed8"
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div7Ref}
          toRef={div4Ref}
          curvature={75}
          endYOffset={10}
          reverse
          gradientStartColor="#3b82f6"
          gradientStopColor="#1d4ed8"
        />
      </div>
    </section>
  );
}

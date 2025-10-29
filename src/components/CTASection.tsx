import { RainbowButton } from '@/components/ui/rainbow-button';
import { MessageCircle } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="py-32 bg-transparent">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="p-12 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-2xl border border-white/10 shadow-2xl">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white leading-tight">
              Seu público está pronto para te notar.
            </h2>
            <p className="text-2xl md:text-3xl text-white/80 mb-12 font-light">
              A questão é: <span className="text-blue-400 font-semibold">você está pronto para se destacar?</span>
            </p>
            
            <RainbowButton 
              className="text-lg px-10 py-7 text-white font-semibold shadow-2xl hover:scale-105 transition-transform"
              onClick={() => window.open('https://wa.me/5511999999999', '_blank')}
            >
              <MessageCircle className="w-6 h-6 mr-2" />
              Falar com um Especialista
            </RainbowButton>
            
            <p className="mt-6 text-white/50 text-sm">
              Resposta em até 2 horas • Consultoria gratuita
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

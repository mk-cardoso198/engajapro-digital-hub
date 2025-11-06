import { RainbowButton } from '@/components/ui/rainbow-button';
import { MessageCircle } from 'lucide-react';

export default function CTASection() {
  return (
    <section id="contato" className="py-12 md:py-20 lg:py-32 bg-gradient-to-b from-blue-950/20 to-black">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="p-6 md:p-12 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-2xl border border-white/10 shadow-2xl">
            <h2 className="text-2xl md:text-4xl lg:text-6xl font-bold mb-4 md:mb-6 text-white leading-tight">
              Seu público está pronto para te notar.
            </h2>
            <p className="text-lg md:text-2xl lg:text-3xl text-white/80 mb-8 md:mb-12 font-light">
              A questão é: <span className="text-blue-400 font-semibold">você está pronto para se destacar?</span>
            </p>
            
            <button
              className="inline-flex items-center justify-center gap-2 text-base md:text-lg px-6 md:px-8 py-4 md:py-5 text-white font-semibold shadow-2xl hover:scale-105 transition-transform rounded-xl bg-green-600 hover:bg-green-500 border-2 border-green-500"
              onClick={() => window.open('https://wa.me/5513998028736?text=Ol%C3%A1%2C%20quero%20alavancar%20com%20a%20Engaja%20Pro%21', '_blank')}
            >
              <MessageCircle className="w-5 h-5 md:w-6 md:h-6" />
              Falar com um Especialista
            </button>
            
            <p className="mt-4 md:mt-6 text-white/50 text-xs md:text-sm">
              Resposta em até 2 horas • Consultoria gratuita
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

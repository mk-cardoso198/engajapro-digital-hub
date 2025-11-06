import { Mail, Phone, MapPin, Instagram, Linkedin, Youtube } from 'lucide-react';
import logoWhite from '@/assets/logo-engaja-pro-white.png';
import facebookIcon from '@/assets/social/facebook.svg';
import instagramIcon from '@/assets/social/instagram.svg';
import youtubeIcon from '@/assets/social/youtube.svg';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src={logoWhite} 
                alt="Engaja Pro" 
                className="h-12 w-12 object-contain"
              />
              <span className="font-bold text-xl text-foreground">Engaja Pro</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Transforme sua presença digital e alcance resultados extraordinários com estratégias de marketing que realmente funcionam.
            </p>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Início
                </a>
              </li>
              <li>
                <a href="#servicos" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Serviços
                </a>
              </li>
              <li>
                <a href="#projetos" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Portfólio
                </a>
              </li>
              <li>
                <a href="#contato" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Sobre
                </a>
              </li>
            </ul>
          </div>

          {/* Serviços */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Serviços</h3>
            <ul className="space-y-2">
              <li>
                <a href="#servicos" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Marketing Digital
                </a>
              </li>
              <li>
                <a href="#servicos" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Gestão de Redes Sociais
                </a>
              </li>
              <li>
                <a href="#servicos" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Tráfego Pago
                </a>
              </li>
              <li>
                <a href="#servicos" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Desenvolvimento Web
                </a>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <a 
                  href="tel:+5513998028736" 
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  (13) 99802-8736
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <a 
                  href="mailto:contato@engajapro.com" 
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  contato@engajapro.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground text-sm">
                  Santos, SP - Brasil
                </span>
              </li>
            </ul>

            {/* Redes Sociais */}
            <div className="mt-6">
              <h4 className="font-semibold text-foreground mb-3 text-sm">Siga-nos</h4>
              <div className="flex gap-3">
                <a
                  href="https://facebook.com/engajapro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors"
                  aria-label="Facebook"
                >
                  <img src={facebookIcon} alt="Facebook" className="w-4 h-4" />
                </a>
                <a
                  href="https://instagram.com/engajapro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors"
                  aria-label="Instagram"
                >
                  <img src={instagramIcon} alt="Instagram" className="w-4 h-4" />
                </a>
                <a
                  href="https://youtube.com/@engajapro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors"
                  aria-label="YouTube"
                >
                  <img src={youtubeIcon} alt="YouTube" className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            © {currentYear} Engaja Pro. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

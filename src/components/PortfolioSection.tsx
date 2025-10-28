import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, TrendingUp, Users } from 'lucide-react';

const portfolioItems = [
  {
    title: "Gestão de Redes Sociais",
    description: "Conteúdo estratégico que engaja e converte",
    icon: Sparkles,
    stats: "+300% de engajamento",
  },
  {
    title: "Campanhas de Tráfego Pago",
    description: "Anúncios otimizados para máximo ROI",
    icon: TrendingUp,
    stats: "5x retorno do investimento",
  },
  {
    title: "Branding & Identidade Visual",
    description: "Marcas memoráveis e impactantes",
    icon: Users,
    stats: "+50 clientes atendidos",
  },
];

export default function PortfolioSection() {
  return (
    <section className="py-20 md:py-32">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Nosso Portfólio
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
            Transformamos ideias em resultados concretos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioItems.map((item, index) => (
            <Card 
              key={index}
              className="group relative overflow-hidden border-border bg-card hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <CardContent className="p-8 relative">
                <div className="mb-6 inline-flex p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <item.icon className="h-8 w-8 text-primary" />
                </div>
                
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                
                <p className="text-muted-foreground mb-4">
                  {item.description}
                </p>
                
                <div className="pt-4 border-t border-border">
                  <span className="text-sm font-semibold text-accent">
                    {item.stats}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

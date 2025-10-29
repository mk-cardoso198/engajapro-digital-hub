import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, TrendingUp, Users, Video, Share2, BarChart3 } from 'lucide-react';

const portfolioItems = [
  {
    title: 'Gestão de Redes Sociais',
    description: 'Criação de conteúdo estratégico e gestão completa das suas redes sociais.',
    icon: Share2,
    stats: '+300% Engajamento',
  },
  {
    title: 'Tráfego Pago',
    description: 'Campanhas otimizadas em Meta Ads e Google Ads com ROI comprovado.',
    icon: Target,
    stats: '5x ROAS Médio',
  },
  {
    title: 'Marketing de Influência',
    description: 'Conexão com influenciadores relevantes para amplificar sua marca.',
    icon: Users,
    stats: '+2M Alcance',
  },
  {
    title: 'Produção de Conteúdo',
    description: 'Fotos, vídeos e design gráfico profissional para suas campanhas.',
    icon: Video,
    stats: '+500 Projetos',
  },
  {
    title: 'Consultoria Estratégica',
    description: 'Planejamento e estratégias personalizadas para crescimento sustentável.',
    icon: TrendingUp,
    stats: '+150 Clientes',
  },
  {
    title: 'Analytics & Insights',
    description: 'Análise de dados e relatórios detalhados para tomada de decisão.',
    icon: BarChart3,
    stats: 'Dados em Tempo Real',
  },
];

export default function PortfolioSection() {
  return (
    <section className="py-32 bg-transparent">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Nossos Serviços
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Soluções completas de marketing digital para alavancar sua presença online
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card 
                key={index}
                className="bg-black/80 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:border-blue-500/50 group"
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-colors">
                      <Icon className="w-6 h-6 text-blue-400" />
                    </div>
                    <span className="text-xs font-semibold text-blue-400 bg-blue-500/20 px-3 py-1 rounded-full">
                      {item.stats}
                    </span>
                  </div>
                  <CardTitle className="text-white text-xl">{item.title}</CardTitle>
                  <CardDescription className="text-white/60">
                    {item.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

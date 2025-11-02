import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';

const projects = [
  {
    title: 'Avenida F.C.',
    description: 'Gestão completa de redes sociais e criação de conteúdo estratégico para time de futebol.',
    category: 'Gestão de Redes Sociais',
    results: '+450% Engajamento'
  },
  {
    title: 'Copa Arena Futsal',
    description: 'Campanha de tráfego pago e produção de conteúdo para torneios de futsal.',
    category: 'Tráfego Pago',
    results: '8x ROAS'
  },
  {
    title: 'Bigodes FC',
    description: 'Branding completo e estratégia de marketing de influência.',
    category: 'Marketing de Influência',
    results: '+2.5M Alcance'
  },
  {
    title: 'Nalaje',
    description: 'Produção de conteúdo audiovisual e gestão de campanhas digitais.',
    category: 'Produção de Conteúdo',
    results: '+300 Projetos'
  },
  {
    title: 'Super Copa Itanhaém',
    description: 'Consultoria estratégica e analytics para evento esportivo regional.',
    category: 'Consultoria',
    results: '+180 Inscritos'
  },
  {
    title: 'CRIA',
    description: 'Estratégia digital completa e automação de marketing.',
    category: 'Analytics & Automation',
    results: '+220% Conversões'
  },
];

export default function ProjectsSection() {
  return (
    <section className="py-12 md:py-20 lg:py-32 bg-gradient-to-b from-black to-blue-950/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
            Nossos Projetos
          </h2>
          <p className="text-white/70 text-base md:text-lg max-w-2xl mx-auto px-4">
            Resultados reais que transformaram a presença digital dos nossos clientes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {projects.map((project, index) => (
            <Card 
              key={index}
              className="bg-black/80 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:border-blue-500/50 group overflow-hidden"
            >
              <div className="w-full h-48 bg-black flex items-center justify-center border-b border-white/10">
                <span className="text-white/40 text-2xl font-bold">EXEMPLO</span>
              </div>
              <CardHeader className="pt-6">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-white text-lg md:text-xl">{project.title}</CardTitle>
                  <ExternalLink className="w-4 h-4 md:w-5 md:h-5 text-white/40 group-hover:text-blue-400 transition-colors" />
                </div>
                <CardDescription className="text-white/60 text-sm md:text-base">
                  {project.description}
                </CardDescription>
                <div className="mt-2">
                  <span className="text-xs font-semibold text-blue-400 bg-blue-500/20 px-2 md:px-3 py-1 rounded-full">
                    {project.category}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-green-400 font-semibold text-sm md:text-base">
                  <span className="text-xl md:text-2xl">↗</span>
                  <span>{project.results}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

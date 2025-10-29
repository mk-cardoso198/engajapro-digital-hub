import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';

const projects = [
  {
    title: 'Avenida F.C.',
    description: 'Gestão completa de redes sociais e criação de conteúdo estratégico para time de futebol.',
    category: 'Gestão de Redes Sociais',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&h=400&fit=crop',
    results: '+450% Engajamento'
  },
  {
    title: 'Copa Arena Futsal',
    description: 'Campanha de tráfego pago e produção de conteúdo para torneios de futsal.',
    category: 'Tráfego Pago',
    image: 'https://images.unsplash.com/photo-1511886929837-354d827aae26?w=600&h=400&fit=crop',
    results: '8x ROAS'
  },
  {
    title: 'Bigodes FC',
    description: 'Branding completo e estratégia de marketing de influência.',
    category: 'Marketing de Influência',
    image: 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?w=600&h=400&fit=crop',
    results: '+2.5M Alcance'
  },
  {
    title: 'Nalaje',
    description: 'Produção de conteúdo audiovisual e gestão de campanhas digitais.',
    category: 'Produção de Conteúdo',
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&h=400&fit=crop',
    results: '+300 Projetos'
  },
  {
    title: 'Super Copa Itanhaém',
    description: 'Consultoria estratégica e analytics para evento esportivo regional.',
    category: 'Consultoria',
    image: 'https://images.unsplash.com/photo-1556817411-31ae72fa3ea0?w=600&h=400&fit=crop',
    results: '+180 Inscritos'
  },
  {
    title: 'CRIA',
    description: 'Estratégia digital completa e automação de marketing.',
    category: 'Analytics & Automation',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
    results: '+220% Conversões'
  },
];

export default function ProjectsSection() {
  return (
    <section className="py-32 bg-transparent">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Nossos Projetos
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Resultados reais que transformaram a presença digital dos nossos clientes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <Card 
              key={index}
              className="bg-black/80 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:border-blue-500/50 group overflow-hidden"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-xs font-semibold text-blue-400 bg-blue-500/20 px-3 py-1 rounded-full">
                    {project.category}
                  </span>
                </div>
              </div>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-white text-xl">{project.title}</CardTitle>
                  <ExternalLink className="w-5 h-5 text-white/40 group-hover:text-blue-400 transition-colors" />
                </div>
                <CardDescription className="text-white/60">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-green-400 font-semibold">
                  <span className="text-2xl">↗</span>
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

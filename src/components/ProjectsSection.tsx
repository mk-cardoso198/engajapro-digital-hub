import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

type Project = {
  id: string;
  title: string;
  description: string;
  category: string;
  results: string;
  archived: boolean;
  cover_image: string | null;
  gallery_images: string[] | null;
  project_url: string | null;
  tags: string[] | null;
  client_name: string | null;
  completion_date: string | null;
  highlight_color: string | null;
  display_order: number;
};

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const loadProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('archived', false)
        .order('display_order', { ascending: true });

      if (error) throw error;
      setProjects(data || []);
    } catch (error: any) {
      toast({
        title: 'Erro ao carregar projetos',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();

    // Subscribe to realtime updates
    const channel = supabase
      .channel('projects-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'projects'
      }, () => {
        loadProjects();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (loading) {
    return (
      <section id="projetos" className="py-12 md:py-20 lg:py-32 bg-gradient-to-b from-black to-blue-950/20">
        <div className="container mx-auto px-4 text-center text-white">
          <p>Carregando projetos...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="projetos" className="py-12 md:py-20 lg:py-32 bg-gradient-to-b from-black to-blue-950/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
            Nossos Projetos
          </h2>
          <p className="text-white/70 text-base md:text-lg max-w-2xl mx-auto px-4">
            Resultados reais que transformaram a presença digital dos nossos clientes
          </p>
        </div>

        {projects.length === 0 ? (
          <div className="text-center text-white/70">
            <p>Nenhum projeto disponível no momento.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {projects.map((project, index) => (
            <Link key={project.id} to={`/projeto/${project.id}`}>
              <Card 
                className="bg-black/80 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:border-blue-500/50 group overflow-hidden cursor-pointer h-full flex flex-col"
              >
              <div className="w-full h-48 bg-gradient-to-br from-blue-600/20 to-purple-600/20 flex items-center justify-center border-b border-white/10 relative overflow-hidden flex-shrink-0">
                {project.cover_image ? (
                  <img 
                    src={project.cover_image} 
                    alt={project.title} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <>
                    <div className="absolute inset-0 bg-black/40" />
                    <span className="text-white/60 text-xl font-semibold z-10">Em breve</span>
                  </>
                )}
              </div>
              <CardHeader className="pt-6 flex-1 flex flex-col">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-white text-lg md:text-xl line-clamp-1">{project.title}</CardTitle>
                  <ExternalLink className="w-4 h-4 md:w-5 md:h-5 text-white/40 group-hover:text-blue-400 transition-colors flex-shrink-0" />
                </div>
                <CardDescription className="text-white/60 text-sm md:text-base line-clamp-2 flex-1">
                  {project.description}
                </CardDescription>
                <div className="mt-2">
                  <span className="text-xs font-semibold text-blue-400 bg-blue-500/20 px-2 md:px-3 py-1 rounded-full">
                    {project.category}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center gap-2 text-green-400 font-semibold text-sm md:text-base line-clamp-1">
                  <span className="text-xl md:text-2xl flex-shrink-0">↗</span>
                  <span className="line-clamp-1">{project.results}</span>
                </div>
              </CardContent>
            </Card>
            </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

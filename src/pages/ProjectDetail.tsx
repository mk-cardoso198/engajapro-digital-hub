import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";


interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  results: string;
  cover_image: string | null;
  gallery_images: string[];
  client_name: string | null;
  tags: string[];
  project_url: string | null;
  highlight_color: string;
}

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProject = async () => {
      if (!id) return;

      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("id", id)
        .eq("archived", false)
        .single();

      if (error) {
        console.error("Error loading project:", error);
      } else {
        setProject(data);
      }
      setLoading(false);
    };

    loadProject();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Carregando projeto...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-lg">Projeto não encontrado</p>
        <Link to="/#portfolio">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para Portfólio
          </Button>
        </Link>
      </div>
    );
  }

  const allImages = [
    project.cover_image,
    ...(project.gallery_images || []),
  ].filter(Boolean);

  const whatsappMessage = `Olá! Vi o projeto "${project.title}" no portfólio e gostaria de conversar sobre um projeto similar.`;
  const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <Link to="/#portfolio">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Badge 
              className="text-sm px-4 py-1"
              style={{ 
                backgroundColor: `${project.highlight_color}20`,
                borderColor: project.highlight_color,
                color: project.highlight_color 
              }}
            >
              {project.category}
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              {project.title}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {project.description}
            </p>
            {project.client_name && (
              <p className="text-sm text-muted-foreground">
                Cliente: <span className="font-semibold">{project.client_name}</span>
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Image Carousel */}
      {allImages.length > 0 && (
        <section className="py-12">
          <div className="container max-w-5xl">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {allImages.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="relative aspect-video rounded-lg overflow-hidden border bg-muted">
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`${project.title} - Imagem ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {allImages.length > 1 && (
                <>
                  <CarouselPrevious className="left-4" />
                  <CarouselNext className="right-4" />
                </>
              )}
            </Carousel>
          </div>
        </section>
      )}

      {/* Main Content */}
      <section className="py-12 pb-24">
        <div className="container max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column - 2/3 */}
            <div className="lg:col-span-2 space-y-12">
              {/* About Section */}
              <div className="space-y-4">
                <h2 className="text-3xl font-bold">Sobre o Projeto</h2>
                <div className="prose prose-invert max-w-none">
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {project.results}
                  </p>
                </div>
              </div>

              {/* Features Section */}
              {project.tags && project.tags.length > 0 && (
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold">Funcionalidades</h2>
                  <ul className="space-y-3">
                    {project.tags.map((tag, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <ExternalLink 
                          className="h-5 w-5 mt-0.5 flex-shrink-0" 
                          style={{ color: project.highlight_color }}
                        />
                        <span className="text-lg text-muted-foreground">
                          {tag}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Project URL */}
              {project.project_url && (
                <div className="pt-6">
                  <a 
                    href={project.project_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Button size="lg" className="w-full sm:w-auto">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Visitar Projeto
                    </Button>
                  </a>
                </div>
              )}
            </div>

            {/* Right Column - 1/3 Sidebar */}
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-24 border-primary/20 bg-card/50 backdrop-blur">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-center">
                      Interessado em um projeto similar?
                    </h3>
                    <p className="text-sm text-muted-foreground text-center">
                      Vamos conversar sobre como posso ajudar seu negócio.
                    </p>
                  </div>
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                    <Button 
                      size="lg" 
                      className="w-full"
                      style={{ backgroundColor: project.highlight_color }}
                    >
                      Solicitar Orçamento
                    </Button>
                  </a>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetail;

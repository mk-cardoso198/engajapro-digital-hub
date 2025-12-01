import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, ExternalLink, Sparkles, CheckCircle2, MessageCircle, Home, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { motion } from "framer-motion";

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  results: string;
  cover_image: string;
  gallery_images: string[];
  tags: string[];
  client_name: string;
  completion_date?: string;
  project_url?: string;
  highlight_color: string;
}

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      if (!id) return;

      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Erro ao buscar projeto:", error);
      } else {
        setProject(data);
      }
      setLoading(false);
    };

    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-xl text-muted-foreground">
          Carregando projeto...
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-6 px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center">Projeto não encontrado</h2>
        <Link to="/#portfolio">
          <Button>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar ao Portfólio
          </Button>
        </Link>
      </div>
    );
  }

  const allImages = [project.cover_image, ...(project.gallery_images || [])].filter(Boolean);
  const whatsappMessage = `Olá! Vi o projeto ${project.title} e gostaria de solicitar um orçamento para algo similar.`;
  const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60"
      >
        <div className="container flex h-14 md:h-16 items-center px-4">
          <Link to="/#portfolio">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Voltar</span>
            </Button>
          </Link>
        </div>
      </motion.header>

      {/* Breadcrumb Navigation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="container px-4 py-4"
      >
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/" className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
                  <Home className="h-4 w-4" />
                  <span className="hidden sm:inline">Início</span>
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/#portfolio" className="text-muted-foreground hover:text-foreground">
                  Portfólio
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage className="max-w-[200px] truncate">
                {project.title}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </motion.div>

      {/* Hero Section with Gradient */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="relative overflow-hidden py-8 md:py-16 lg:py-24"
        style={{
          background: `linear-gradient(135deg, ${project.highlight_color}15 0%, transparent 100%)`,
        }}
      >
        <div className="container px-4">
          <div className="max-w-4xl mx-auto text-center space-y-4 md:space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Badge
                className="text-xs md:text-sm px-3 md:px-4 py-1.5 md:py-2 bg-card/50 backdrop-blur-xl border"
                style={{
                  borderColor: project.highlight_color,
                  color: project.highlight_color,
                }}
              >
                {project.category}
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent leading-tight"
            >
              {project.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto px-2"
            >
              {project.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center justify-center gap-4 text-sm text-muted-foreground"
            >
              {project.client_name && (
                <span className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4" style={{ color: project.highlight_color }} />
                  {project.client_name}
                </span>
              )}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Image Carousel */}
      {allImages.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="container px-4 py-8 md:py-12"
        >
          <Carousel
            opts={{
              align: "center",
              loop: true,
            }}
            className="w-full max-w-5xl mx-auto"
          >
            <CarouselContent>
              {allImages.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="relative aspect-video rounded-xl md:rounded-2xl overflow-hidden group">
                    <img
                      src={image}
                      alt={`${project.title} - Imagem ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2 md:left-4 h-8 w-8 md:h-10 md:w-10" />
            <CarouselNext className="right-2 md:right-4 h-8 w-8 md:h-10 md:w-10" />
          </Carousel>
        </motion.section>
      )}

      {/* Main Content Section */}
      <section className="container px-4 py-8 md:py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Content Column (2/3) */}
          <div className="lg:col-span-2 space-y-6 md:space-y-8">
            {/* Sobre o Projeto */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Card className="bg-card/50 backdrop-blur-xl border-2 hover:border-primary/50 transition-all duration-300">
                <CardContent className="p-5 md:p-8">
                  <div className="flex items-center gap-3 mb-4 md:mb-6">
                    <div
                      className="h-8 md:h-10 w-1 rounded-full"
                      style={{ backgroundColor: project.highlight_color }}
                    />
                    <h2 className="text-2xl md:text-3xl font-bold">Sobre o Projeto</h2>
                  </div>
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Funcionalidades/Tags */}
            {project.tags && project.tags.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                <div className="flex items-center gap-3 mb-4 md:mb-6">
                  <div
                    className="h-8 md:h-10 w-1 rounded-full"
                    style={{ backgroundColor: project.highlight_color }}
                  />
                  <h2 className="text-2xl md:text-3xl font-bold">Características</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  {project.tags.map((tag, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.9 + index * 0.05 }}
                    >
                      <Card className="bg-card/30 backdrop-blur-xl border hover:border-primary/50 transition-all duration-300 hover:scale-[1.02] group">
                        <CardContent className="p-3 md:p-4">
                          <div className="flex items-start gap-3">
                            <CheckCircle2
                              className="h-5 w-5 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform"
                              style={{ color: project.highlight_color }}
                            />
                            <p className="text-sm md:text-base leading-relaxed">{tag}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Resultados */}
            {project.results && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
              >
                <Card
                  className="bg-card/50 backdrop-blur-xl border-2 hover:shadow-2xl transition-all duration-300"
                  style={{
                    borderColor: `${project.highlight_color}40`,
                    boxShadow: `0 10px 40px -10px ${project.highlight_color}30`,
                  }}
                >
                  <CardContent className="p-5 md:p-8">
                    <div className="flex items-center gap-3 mb-4 md:mb-6">
                      <div
                        className="h-8 md:h-10 w-1 rounded-full"
                        style={{ backgroundColor: project.highlight_color }}
                      />
                      <h2 className="text-2xl md:text-3xl font-bold">Resultados</h2>
                    </div>
                    <p className="text-base md:text-lg leading-relaxed">{project.results}</p>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Link para o Projeto */}
            {project.project_url && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
              >
                <a href={project.project_url} target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full group"
                    style={{
                      borderColor: project.highlight_color,
                      color: project.highlight_color,
                    }}
                  >
                    <ExternalLink className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                    Visitar Projeto
                  </Button>
                </a>
              </motion.div>
            )}
          </div>

          {/* Sidebar CTA (1/3) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="lg:col-span-1"
          >
            <div className="lg:sticky lg:top-24">
              <Card
                className="bg-card/50 backdrop-blur-xl border-2 hover:shadow-2xl transition-all duration-500"
                style={{
                  borderColor: `${project.highlight_color}40`,
                  boxShadow: `0 20px 60px -15px ${project.highlight_color}30`,
                }}
              >
                <CardContent className="p-5 md:p-8 space-y-4 md:space-y-6">
                  <div className="text-center space-y-3 md:space-y-4">
                    <div
                      className="w-14 h-14 md:w-16 md:h-16 rounded-2xl mx-auto flex items-center justify-center"
                      style={{
                        backgroundColor: `${project.highlight_color}20`,
                      }}
                    >
                      <MessageCircle
                        className="h-7 w-7 md:h-8 md:w-8"
                        style={{ color: project.highlight_color }}
                      />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold">
                      Interessado em um projeto similar?
                    </h3>
                    <p className="text-sm md:text-base text-muted-foreground">
                      Entre em contato conosco e vamos criar algo incrível para o seu negócio!
                    </p>
                  </div>
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="block">
                    <Button
                      size="lg"
                      className="w-full text-base md:text-lg group relative overflow-hidden"
                      style={{
                        backgroundColor: project.highlight_color,
                        color: "#000",
                      }}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        <MessageCircle className="h-5 w-5 group-hover:scale-110 transition-transform" />
                        Solicitar Orçamento
                      </span>
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity bg-foreground"
                      />
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

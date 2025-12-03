import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, ImagePlus, CheckCircle, XCircle } from "lucide-react";

const services = [
  "Tráfego Pago",
  "Produção de Conteúdo",
  "Criação de Sites",
  "Automação Inteligente",
  "Consultoria Estratégica",
  "Lojas Online",
  "Gestão de Redes Sociais",
  "Criação de Sistemas",
  "Identidade Visual"
];

interface GenerationStatus {
  service: string;
  imageType: "back" | "front";
  status: "pending" | "generating" | "success" | "error";
  url?: string;
  error?: string;
}

export function GenerateServiceImages() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [statuses, setStatuses] = useState<GenerationStatus[]>([]);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const generateAllImages = async () => {
    setIsGenerating(true);
    setProgress(0);
    
    const totalImages = services.length * 2;
    const initialStatuses: GenerationStatus[] = [];
    
    services.forEach(service => {
      initialStatuses.push({ service, imageType: "back", status: "pending" });
      initialStatuses.push({ service, imageType: "front", status: "pending" });
    });
    
    setStatuses(initialStatuses);
    
    let completed = 0;
    
    for (const service of services) {
      for (const imageType of ["back", "front"] as const) {
        // Update status to generating
        setStatuses(prev => prev.map(s => 
          s.service === service && s.imageType === imageType 
            ? { ...s, status: "generating" } 
            : s
        ));
        
        try {
          console.log(`Generating ${imageType} image for ${service}...`);
          
          const { data, error } = await supabase.functions.invoke("generate-service-images", {
            body: { serviceTitle: service, imageType }
          });
          
          if (error) throw new Error(error.message);
          if (data.error) throw new Error(data.error);
          
          // Update status to success
          setStatuses(prev => prev.map(s => 
            s.service === service && s.imageType === imageType 
              ? { ...s, status: "success", url: data.url } 
              : s
          ));
          
          // Update service in database
          const columnName = imageType === "back" ? "back_image" : "front_image";
          const { error: updateError } = await supabase
            .from("services")
            .update({ [columnName]: data.url })
            .eq("title", service);
          
          if (updateError) {
            console.error(`Failed to update ${service} ${imageType}:`, updateError);
          }
          
        } catch (err) {
          console.error(`Error generating ${imageType} for ${service}:`, err);
          setStatuses(prev => prev.map(s => 
            s.service === service && s.imageType === imageType 
              ? { ...s, status: "error", error: err instanceof Error ? err.message : "Unknown error" } 
              : s
          ));
        }
        
        completed++;
        setProgress((completed / totalImages) * 100);
        
        // Small delay between requests to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }
    
    setIsGenerating(false);
    toast({
      title: "Geração concluída!",
      description: `${statuses.filter(s => s.status === "success").length} imagens geradas com sucesso.`
    });
  };

  const getStatusIcon = (status: GenerationStatus["status"]) => {
    switch (status) {
      case "generating":
        return <Loader2 className="h-4 w-4 animate-spin text-blue-500" />;
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "error":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <div className="h-4 w-4 rounded-full bg-gray-500" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ImagePlus className="h-5 w-5" />
          Gerar Imagens dos Serviços
        </CardTitle>
        <CardDescription>
          Gera novas imagens com IA para todos os serviços com estilo visual consistente (dark theme com elementos neon azul)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button 
          onClick={generateAllImages} 
          disabled={isGenerating}
          className="w-full"
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Gerando imagens...
            </>
          ) : (
            <>
              <ImagePlus className="mr-2 h-4 w-4" />
              Gerar Todas as Imagens (18 imagens)
            </>
          )}
        </Button>
        
        {isGenerating && (
          <div className="space-y-2">
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-muted-foreground text-center">
              {Math.round(progress)}% concluído
            </p>
          </div>
        )}
        
        {statuses.length > 0 && (
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {statuses.map((status, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-2 rounded-lg bg-secondary/50"
              >
                <div className="flex items-center gap-2">
                  {getStatusIcon(status.status)}
                  <span className="text-sm">
                    {status.service} - {status.imageType === "back" ? "Fundo" : "Frente"}
                  </span>
                </div>
                {status.url && (
                  <a 
                    href={status.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs text-blue-500 hover:underline"
                  >
                    Ver
                  </a>
                )}
                {status.error && (
                  <span className="text-xs text-red-500">{status.error}</span>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

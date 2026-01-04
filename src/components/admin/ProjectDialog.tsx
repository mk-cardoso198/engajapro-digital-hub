import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import ImageUpload from './ImageUpload';
import { X } from 'lucide-react';

type Project = {
  id: string;
  title: string;
  description: string;
  category: string;
  results: string;
  archived: boolean;
  cover_image?: string;
  gallery_images?: string[];
  project_url?: string;
  tags?: string[];
  client_name?: string;
  completion_date?: string;
  highlight_color?: string;
  display_order?: number;
};

type ProjectDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: Project | null;
  onSuccess: () => void;
};

export default function ProjectDialog({
  open,
  onOpenChange,
  project,
  onSuccess,
}: ProjectDialogProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    results: '',
    cover_image: '',
    gallery_images: [] as string[],
    project_url: '',
    tags: [] as string[],
    client_name: '',
    completion_date: '',
    highlight_color: '#3b82f6',
    display_order: 0,
  });
  const [tagInput, setTagInput] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title,
        description: project.description,
        category: project.category,
        results: project.results,
        cover_image: project.cover_image || '',
        gallery_images: project.gallery_images || [],
        project_url: project.project_url || '',
        tags: project.tags || [],
        client_name: project.client_name || '',
        completion_date: project.completion_date || '',
        highlight_color: project.highlight_color || '#3b82f6',
        display_order: project.display_order || 0,
      });
    } else {
      setFormData({
        title: '',
        description: '',
        category: '',
        results: '',
        cover_image: '',
        gallery_images: [],
        project_url: '',
        tags: [],
        client_name: '',
        completion_date: '',
        highlight_color: '#3b82f6',
        display_order: 0,
      });
    }
  }, [project]);

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({ ...formData, tags: [...formData.tags, tagInput.trim()] });
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setFormData({ ...formData, tags: formData.tags.filter(t => t !== tag) });
  };

  const handleAddGalleryImage = (url: string) => {
    if (!url) return;

    setFormData((prev) => {
      if (prev.gallery_images.length >= 5) return prev;
      return {
        ...prev,
        gallery_images: [...prev.gallery_images, url].slice(0, 5),
      };
    });
  };

  const handleRemoveGalleryImage = (index: number) => {
    setFormData({
      ...formData,
      gallery_images: formData.gallery_images.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const dataToSave = {
        ...formData,
        cover_image: formData.cover_image || null,
        project_url: formData.project_url || null,
        client_name: formData.client_name || null,
        completion_date: formData.completion_date || null,
      };

      if (project) {
        const { error } = await supabase
          .from('projects')
          .update(dataToSave)
          .eq('id', project.id);

        if (error) throw error;

        toast({
          title: 'Projeto atualizado',
          description: 'As alterações foram salvas com sucesso',
        });
      } else {
        const { error } = await supabase
          .from('projects')
          .insert([dataToSave]);

        if (error) throw error;

        toast({
          title: 'Projeto criado',
          description: 'O novo projeto foi adicionado com sucesso',
        });
      }

      onSuccess();
      onOpenChange(false);
    } catch (error: any) {
      toast({
        title: 'Erro ao salvar projeto',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl bg-gray-900 border-gray-800 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white">
            {project ? 'Editar Projeto' : 'Novo Projeto'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-white">Título *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                className="bg-gray-800/50 border-white/20 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category" className="text-white">Categoria *</Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
                className="bg-gray-800/50 border-white/20 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="display_order" className="text-white">Posição de Exibição</Label>
              <Input
                id="display_order"
                type="number"
                min="0"
                value={formData.display_order}
                onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                className="bg-gray-800/50 border-white/20 text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="client_name" className="text-white">Nome do Cliente</Label>
              <Input
                id="client_name"
                value={formData.client_name}
                onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                className="bg-gray-800/50 border-white/20 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="completion_date" className="text-white">Data de Conclusão</Label>
              <Input
                id="completion_date"
                type="date"
                value={formData.completion_date}
                onChange={(e) => setFormData({ ...formData, completion_date: e.target.value })}
                className="bg-gray-800/50 border-white/20 text-white"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-white">Imagem de Capa</Label>
            <ImageUpload
              bucket="project-images"
              currentImage={formData.cover_image}
              onUploadComplete={(url) => setFormData({ ...formData, cover_image: url })}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-white">Galeria de Imagens ({formData.gallery_images.length}/5)</Label>
            
            {/* Imagens já adicionadas */}
            {formData.gallery_images.length > 0 && (
              <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                {formData.gallery_images.map((img, index) => (
                  <div key={index} className="relative group">
                    <img 
                      src={img} 
                      alt={`Galeria ${index + 1}`} 
                      className="w-full h-20 object-cover rounded border border-white/20" 
                    />
                    <Button
                      type="button"
                      size="icon"
                      variant="destructive"
                      className="absolute top-1 right-1 h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleRemoveGalleryImage(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
            
            {/* Botão para adicionar mais imagens */}
            {formData.gallery_images.length < 5 && (
              <div className="mt-2">
                <ImageUpload
                  bucket="project-images"
                  onUploadComplete={handleAddGalleryImage}
                  multiple
                  showPreview={false}
                  resetAfterUpload
                  maxFiles={5 - formData.gallery_images.length}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Você pode adicionar até {5 - formData.gallery_images.length} imagens
                </p>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="project_url" className="text-white">URL do Projeto</Label>
            <Input
              id="project_url"
              type="url"
              value={formData.project_url}
              onChange={(e) => setFormData({ ...formData, project_url: e.target.value })}
              placeholder="https://"
              className="bg-gray-800/50 border-white/20 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-white">Descrição *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              rows={4}
              className="bg-gray-800/50 border-white/20 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="results" className="text-white">Resultados *</Label>
            <Textarea
              id="results"
              value={formData.results}
              onChange={(e) => setFormData({ ...formData, results: e.target.value })}
              required
              rows={3}
              className="bg-gray-800/50 border-white/20 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-white">Tags</Label>
            <div className="flex gap-2">
              <Input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                placeholder="Digite uma tag e pressione Enter"
                className="bg-gray-800/50 border-white/20 text-white"
              />
              <Button type="button" onClick={handleAddTag} variant="outline" className="bg-white/10 border-white/20 text-white">
                Adicionar
              </Button>
            </div>
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm flex items-center gap-2">
                    {tag}
                    <button type="button" onClick={() => handleRemoveTag(tag)} className="hover:text-blue-300">
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="highlight_color" className="text-white">Cor de Destaque</Label>
            <div className="flex gap-2 items-center">
              <Input
                id="highlight_color"
                type="color"
                value={formData.highlight_color}
                onChange={(e) => setFormData({ ...formData, highlight_color: e.target.value })}
                className="w-20 h-10 bg-gray-800/50 border-white/20"
              />
              <Input
                type="text"
                value={formData.highlight_color}
                onChange={(e) => setFormData({ ...formData, highlight_color: e.target.value })}
                className="bg-gray-800/50 border-white/20 text-white"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {loading ? 'Salvando...' : 'Salvar'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

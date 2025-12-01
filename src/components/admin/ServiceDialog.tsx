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

type Service = {
  id: string;
  title: string;
  short_description: string | null;
  long_description: string | null;
  back_image: string;
  front_image: string;
  icon_image?: string | null;
  display_order: number;
  active: boolean;
};

type ServiceDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  service: Service | null;
  onSuccess: () => void;
};

export default function ServiceDialog({
  open,
  onOpenChange,
  service,
  onSuccess,
}: ServiceDialogProps) {
  const [formData, setFormData] = useState({
    title: '',
    short_description: '',
    long_description: '',
    back_image: '',
    front_image: '',
    icon_image: '',
    display_order: 1,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (service) {
      setFormData({
        title: service.title,
        short_description: service.short_description || '',
        long_description: service.long_description || '',
        back_image: service.back_image,
        front_image: service.front_image,
        icon_image: service.icon_image || '',
        display_order: service.display_order,
      });
    } else {
      setFormData({
        title: '',
        short_description: '',
        long_description: '',
        back_image: '',
        front_image: '',
        icon_image: '',
        display_order: 1,
      });
    }
  }, [service]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.back_image || !formData.front_image) {
      toast({
        title: 'Imagens obrigatórias',
        description: 'Por favor, faça upload das imagens de fundo e frontal',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    try {
      const dataToSave = {
        ...formData,
        icon_image: formData.icon_image || null,
      };

      if (service) {
        const { error } = await supabase
          .from('services')
          .update(dataToSave)
          .eq('id', service.id);

        if (error) throw error;

        toast({
          title: 'Serviço atualizado',
          description: 'As alterações foram salvas com sucesso',
        });
      } else {
        const { error } = await supabase
          .from('services')
          .insert([dataToSave]);

        if (error) throw error;

        toast({
          title: 'Serviço criado',
          description: 'O novo serviço foi adicionado com sucesso',
        });
      }

      onSuccess();
      onOpenChange(false);
    } catch (error: any) {
      toast({
        title: 'Erro ao salvar serviço',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl bg-gray-900 border-gray-800 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white">
            {service ? 'Editar Serviço' : 'Novo Serviço'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-white">Título</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              className="bg-gray-800/50 border-white/20 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="display_order" className="text-white">
              Posição (ordem de exibição)
            </Label>
            <Input
              id="display_order"
              type="number"
              min="1"
              value={formData.display_order}
              onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
              required
              className="bg-gray-800/50 border-white/20 text-white"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-white">Imagem de Fundo *</Label>
              <ImageUpload
                bucket="service-images"
                currentImage={formData.back_image}
                onUploadComplete={(url) => setFormData({ ...formData, back_image: url })}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-white">Imagem Frontal *</Label>
              <ImageUpload
                bucket="service-images"
                currentImage={formData.front_image}
                onUploadComplete={(url) => setFormData({ ...formData, front_image: url })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-white">Ícone do Serviço (opcional)</Label>
            <ImageUpload
              bucket="service-images"
              currentImage={formData.icon_image}
              onUploadComplete={(url) => setFormData({ ...formData, icon_image: url })}
              accept="image/png,image/svg+xml,image/jpeg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="short_description" className="text-white">
              Descrição Curta (máx. 50 caracteres)
            </Label>
            <Input
              id="short_description"
              value={formData.short_description}
              onChange={(e) => setFormData({ ...formData, short_description: e.target.value.slice(0, 50) })}
              required
              maxLength={50}
              placeholder="Descrição breve para o card"
              className="bg-gray-800/50 border-white/20 text-white"
            />
            <p className="text-xs text-white/50">{formData.short_description.length}/50 caracteres</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="long_description" className="text-white">
              Descrição Completa
            </Label>
            <Textarea
              id="long_description"
              value={formData.long_description}
              onChange={(e) => setFormData({ ...formData, long_description: e.target.value })}
              required
              rows={6}
              placeholder="Descrição detalhada do serviço"
              className="bg-gray-800/50 border-white/20 text-white"
            />
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

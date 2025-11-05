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

type Service = {
  id: string;
  title: string;
  description: string;
  back_image: string;
  front_image: string;
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
    description: '',
    back_image: '',
    front_image: '',
    display_order: 0,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (service) {
      setFormData({
        title: service.title,
        description: service.description,
        back_image: service.back_image,
        front_image: service.front_image,
        display_order: service.display_order,
      });
    } else {
      setFormData({
        title: '',
        description: '',
        back_image: '',
        front_image: '',
        display_order: 0,
      });
    }
  }, [service]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (service) {
        // Update existing service
        const { error } = await supabase
          .from('services')
          .update(formData)
          .eq('id', service.id);

        if (error) throw error;

        toast({
          title: 'Serviço atualizado',
          description: 'As alterações foram salvas com sucesso',
        });
      } else {
        // Create new service
        const { error } = await supabase
          .from('services')
          .insert([{ ...formData, active: true }]);

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
      <DialogContent className="sm:max-w-2xl bg-gray-900 border-gray-800 max-h-[90vh] overflow-y-auto">
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
            <Label htmlFor="description" className="text-white">Descrição</Label>
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
            <Label htmlFor="back_image" className="text-white">URL Imagem de Fundo</Label>
            <Input
              id="back_image"
              type="url"
              value={formData.back_image}
              onChange={(e) => setFormData({ ...formData, back_image: e.target.value })}
              required
              className="bg-gray-800/50 border-white/20 text-white"
              placeholder="https://..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="front_image" className="text-white">URL Imagem Frontal</Label>
            <Input
              id="front_image"
              type="url"
              value={formData.front_image}
              onChange={(e) => setFormData({ ...formData, front_image: e.target.value })}
              required
              className="bg-gray-800/50 border-white/20 text-white"
              placeholder="https://..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="display_order" className="text-white">Ordem de Exibição</Label>
            <Input
              id="display_order"
              type="number"
              value={formData.display_order}
              onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
              required
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

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
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import ImageUpload from './ImageUpload';

type Client = {
  id: string;
  name: string;
  logo_url: string;
  display_order: number;
  active: boolean;
  row_position: number;
};

type ClientDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  client: Client | null;
  onSuccess: () => void;
};

export default function ClientDialog({
  open,
  onOpenChange,
  client,
  onSuccess,
}: ClientDialogProps) {
  const [formData, setFormData] = useState({
    name: '',
    logo_url: '',
    display_order: 0,
    row_position: 1,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (client) {
      setFormData({
        name: client.name,
        logo_url: client.logo_url,
        display_order: client.display_order,
        row_position: client.row_position || 1,
      });
    } else {
      setFormData({
        name: '',
        logo_url: '',
        display_order: 0,
        row_position: 1,
      });
    }
  }, [client]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.logo_url) {
      toast({
        title: 'Logo obrigatório',
        description: 'Por favor, faça upload do logo do cliente',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    try {
      if (client) {
        const { error } = await supabase
          .from('clients')
          .update(formData)
          .eq('id', client.id);

        if (error) throw error;

        toast({
          title: 'Cliente atualizado',
          description: 'As alterações foram salvas com sucesso',
        });
      } else {
        const { error } = await supabase
          .from('clients')
          .insert([formData]);

        if (error) throw error;

        toast({
          title: 'Cliente criado',
          description: 'O novo cliente foi adicionado com sucesso',
        });
      }

      onSuccess();
      onOpenChange(false);
    } catch (error: any) {
      toast({
        title: 'Erro ao salvar cliente',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-gray-900 border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-foreground">
            {client ? 'Editar Cliente' : 'Novo Cliente'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-foreground">Nome do Cliente *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              placeholder="Ex: Empresa ABC"
              className="bg-gray-800/50 border-border text-foreground"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="display_order" className="text-foreground">Posição de Exibição</Label>
            <Input
              id="display_order"
              type="number"
              min="0"
              value={formData.display_order}
              onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
              className="bg-gray-800/50 border-border text-foreground"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-foreground">Fileira do Carrossel *</Label>
            <div className="flex gap-2">
              <Button
                type="button"
                variant={formData.row_position === 1 ? "default" : "outline"}
                onClick={() => setFormData({ ...formData, row_position: 1 })}
                className={formData.row_position === 1 
                  ? "flex-1 bg-primary hover:bg-primary/90" 
                  : "flex-1 bg-gray-800/50 border-border text-foreground hover:bg-gray-700/50"
                }
              >
                Fileira de Cima
              </Button>
              <Button
                type="button"
                variant={formData.row_position === 2 ? "default" : "outline"}
                onClick={() => setFormData({ ...formData, row_position: 2 })}
                className={formData.row_position === 2 
                  ? "flex-1 bg-primary hover:bg-primary/90" 
                  : "flex-1 bg-gray-800/50 border-border text-foreground hover:bg-gray-700/50"
                }
              >
                Fileira de Baixo
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Escolha em qual fileira do carrossel este logo será exibido
            </p>
          </div>

          <div className="space-y-2">
            <Label className="text-foreground">Logo do Cliente *</Label>
            <ImageUpload
              bucket="client-logos"
              currentImage={formData.logo_url}
              onUploadComplete={(url) => setFormData({ ...formData, logo_url: url })}
              accept="image/png,image/jpeg,image/webp,image/svg+xml"
            />
            <p className="text-xs text-muted-foreground">
              Recomendado: PNG ou SVG com fundo transparente
            </p>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="bg-secondary/10 border-border text-foreground hover:bg-secondary/20"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {loading ? 'Salvando...' : 'Salvar'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

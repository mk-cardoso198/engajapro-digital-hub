import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash2, Eye, EyeOff } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import ServiceDialog from './ServiceDialog';

type Service = {
  id: string;
  title: string;
  description: string;
  back_image: string;
  front_image: string;
  display_order: number;
  active: boolean;
};

export default function ServicesManager() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      toast({
        title: 'Erro ao carregar serviços',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      setServices(data || []);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este serviço?')) return;

    const { error } = await supabase
      .from('services')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: 'Erro ao excluir serviço',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Serviço excluído',
        description: 'O serviço foi removido com sucesso',
      });
      loadServices();
    }
  };

  const handleToggleActive = async (service: Service) => {
    const { error } = await supabase
      .from('services')
      .update({ active: !service.active })
      .eq('id', service.id);

    if (error) {
      toast({
        title: 'Erro ao atualizar serviço',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: service.active ? 'Serviço desativado' : 'Serviço ativado',
        description: `O serviço foi ${service.active ? 'desativado' : 'ativado'} com sucesso`,
      });
      loadServices();
    }
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setDialogOpen(true);
  };

  const handleAdd = () => {
    setEditingService(null);
    setDialogOpen(true);
  };

  if (loading) {
    return <div className="text-white">Carregando serviços...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Gerenciar Serviços</h2>
        <Button onClick={handleAdd} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Novo Serviço
        </Button>
      </div>

      <div className="grid gap-4">
        {services.map((service) => (
          <div
            key={service.id}
            className={`bg-gray-900/50 border border-white/10 rounded-xl p-6 ${
              !service.active ? 'opacity-60' : ''
            }`}
          >
            <div className="flex gap-4">
              <div className="flex gap-2 flex-shrink-0">
                <img
                  src={service.back_image}
                  alt={`${service.title} back`}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <img
                  src={service.front_image}
                  alt={`${service.title} front`}
                  className="w-20 h-20 rounded-lg object-cover"
                />
              </div>

              <div className="flex-grow">
                <h3 className="text-xl font-semibold text-white mb-2">
                  {service.title}
                  {!service.active && (
                    <span className="ml-2 text-sm text-yellow-500">(Inativo)</span>
                  )}
                </h3>
                <p className="text-white/90 text-sm line-clamp-2">{service.description}</p>
                <p className="text-white/70 text-xs mt-2">Ordem: {service.display_order}</p>
              </div>

              <div className="flex gap-2 flex-shrink-0">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => handleEdit(service)}
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => handleToggleActive(service)}
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  {service.active ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => handleDelete(service.id)}
                  className="bg-red-500/10 border-red-500/20 text-red-500 hover:bg-red-500/20"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}

        {services.length === 0 && (
          <div className="text-center py-12 text-white/70">
            Nenhum serviço cadastrado. Clique em "Novo Serviço" para começar.
          </div>
        )}
      </div>

      <ServiceDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        service={editingService}
        onSuccess={loadServices}
      />
    </div>
  );
}

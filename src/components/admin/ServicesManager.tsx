import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash2, Eye, EyeOff } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import ServiceDialog from './ServiceDialog';

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div
            key={service.id}
            className={`group relative bg-gray-900/50 border border-white/10 rounded-xl overflow-hidden transition-all hover:border-white/30 hover:shadow-xl ${
              !service.active ? 'opacity-60' : ''
            }`}
          >
            {/* Images Grid */}
            <div className="grid grid-cols-2 gap-1 aspect-square bg-gray-800">
              <div className="col-span-2 overflow-hidden">
                <img
                  src={service.back_image}
                  alt={`${service.title} - back`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="overflow-hidden">
                <img
                  src={service.front_image}
                  alt={`${service.title} - front`}
                  className="w-full h-full object-cover"
                />
              </div>
              {service.icon_image && (
                <div className="overflow-hidden flex items-center justify-center bg-gray-900">
                  <img
                    src={service.icon_image}
                    alt={`${service.title} - icon`}
                    className="w-12 h-12 object-contain"
                  />
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-lg font-semibold text-white line-clamp-1">
                  {service.title}
                  {!service.active && (
                    <span className="ml-2 text-xs text-yellow-500">(Inativo)</span>
                  )}
                </h3>
                <span className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded-full whitespace-nowrap">
                  #{service.display_order}
                </span>
              </div>

              <p className="text-white/70 text-sm line-clamp-2">
                {service.short_description || service.long_description || 'Sem descrição'}
              </p>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(service)}
                  className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <Pencil className="h-3 w-3 mr-1" />
                  Editar
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleToggleActive(service)}
                  className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  {service.active ? (
                    <>
                      <EyeOff className="h-3 w-3 mr-1" />
                      Ocultar
                    </>
                  ) : (
                    <>
                      <Eye className="h-3 w-3 mr-1" />
                      Ativar
                    </>
                  )}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDelete(service.id)}
                  className="bg-red-500/10 border-red-500/20 text-red-500 hover:bg-red-500/20"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        ))}

        {services.length === 0 && (
          <div className="col-span-full text-center py-12 text-white/70">
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

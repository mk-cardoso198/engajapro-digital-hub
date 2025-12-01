import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash2, Eye, EyeOff } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import ClientDialog from './ClientDialog';

type Client = {
  id: string;
  name: string;
  logo_url: string;
  display_order: number;
  active: boolean;
};

export default function ClientsManager() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);

  useEffect(() => {
    loadClients();
  }, []);

  const loadClients = async () => {
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      toast({
        title: 'Erro ao carregar clientes',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      setClients(data || []);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este cliente?')) return;

    const { error } = await supabase
      .from('clients')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: 'Erro ao excluir cliente',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Cliente excluído',
        description: 'O cliente foi removido com sucesso',
      });
      loadClients();
    }
  };

  const handleToggleActive = async (client: Client) => {
    const { error } = await supabase
      .from('clients')
      .update({ active: !client.active })
      .eq('id', client.id);

    if (error) {
      toast({
        title: 'Erro ao atualizar cliente',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: client.active ? 'Cliente ocultado' : 'Cliente ativado',
        description: `O cliente foi ${client.active ? 'ocultado' : 'ativado'} com sucesso`,
      });
      loadClients();
    }
  };

  const handleEdit = (client: Client) => {
    setEditingClient(client);
    setDialogOpen(true);
  };

  const handleAdd = () => {
    setEditingClient(null);
    setDialogOpen(true);
  };

  if (loading) {
    return <div className="text-foreground">Carregando clientes...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Gerenciar Clientes</h2>
          <p className="text-muted-foreground text-sm mt-1">
            Logos exibidos na seção "Alguns de nossos clientes"
          </p>
        </div>
        <Button onClick={handleAdd} className="bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Novo Cliente
        </Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {clients.map((client) => (
          <div
            key={client.id}
            className={`group relative bg-gray-900/50 border border-border rounded-xl overflow-hidden transition-all hover:border-primary/50 hover:shadow-xl ${
              !client.active ? 'opacity-50' : ''
            }`}
          >
            {/* Logo Preview */}
            <div className="aspect-square w-full overflow-hidden bg-gray-800 flex items-center justify-center p-4">
              <img
                src={client.logo_url}
                alt={client.name}
                className="max-w-full max-h-full object-contain"
              />
            </div>

            {/* Content */}
            <div className="p-3 space-y-2">
              <div className="flex items-center justify-between gap-1">
                <h3 className="text-sm font-medium text-foreground truncate flex-1" title={client.name}>
                  {client.name}
                </h3>
                <span className="px-1.5 py-0.5 bg-primary/20 text-primary text-xs rounded-full whitespace-nowrap">
                  #{client.display_order}
                </span>
              </div>

              {!client.active && (
                <span className="text-xs text-yellow-500">(Oculto)</span>
              )}

              {/* Action Buttons */}
              <div className="flex gap-1 pt-1">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(client)}
                  className="flex-1 h-7 text-xs bg-secondary/10 border-border text-foreground hover:bg-secondary/20"
                >
                  <Pencil className="h-3 w-3" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleToggleActive(client)}
                  className="flex-1 h-7 text-xs bg-secondary/10 border-border text-foreground hover:bg-secondary/20"
                >
                  {client.active ? (
                    <EyeOff className="h-3 w-3" />
                  ) : (
                    <Eye className="h-3 w-3" />
                  )}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDelete(client.id)}
                  className="h-7 text-xs bg-destructive/10 border-destructive/20 text-destructive hover:bg-destructive/20"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        ))}

        {clients.length === 0 && (
          <div className="col-span-full text-center py-12 text-muted-foreground">
            Nenhum cliente cadastrado. Clique em "Novo Cliente" para começar.
          </div>
        )}
      </div>

      <ClientDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        client={editingClient}
        onSuccess={loadClients}
      />
    </div>
  );
}

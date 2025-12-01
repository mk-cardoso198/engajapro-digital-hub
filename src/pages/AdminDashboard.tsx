import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import ProjectsManager from '@/components/admin/ProjectsManager';
import ServicesManager from '@/components/admin/ServicesManager';
import ClientsManager from '@/components/admin/ClientsManager';
import logoEngaja from '@/assets/logo-engaja-pro-white.png';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/admin-login');
        return;
      }

      const { data: roles } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', session.user.id)
        .eq('role', 'admin')
        .maybeSingle();

      if (!roles) {
        toast({
          title: 'Acesso negado',
          description: 'Você não tem permissões de administrador',
          variant: 'destructive',
        });
        navigate('/');
        return;
      }

      setIsAdmin(true);
      setLoading(false);
    };

    checkAdmin();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: 'Logout realizado',
      description: 'Até logo!',
    });
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-950 to-black flex items-center justify-center">
        <div className="text-white text-xl">Carregando...</div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 to-black">
      <header className="border-b border-white/10 bg-gray-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={logoEngaja} alt="Engaja Pro" className="h-10" />
            <h1 className="text-xl font-bold text-white">Painel Administrativo</h1>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sair
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="projects" className="w-full">
          <TabsList className="bg-gray-900/50 border border-white/10 mb-8">
            <TabsTrigger value="projects" className="data-[state=active]:bg-blue-600">
              Projetos
            </TabsTrigger>
            <TabsTrigger value="services" className="data-[state=active]:bg-blue-600">
              Serviços
            </TabsTrigger>
            <TabsTrigger value="clients" className="data-[state=active]:bg-blue-600">
              Clientes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="projects">
            <ProjectsManager />
          </TabsContent>

          <TabsContent value="services">
            <ServicesManager />
          </TabsContent>

          <TabsContent value="clients">
            <ClientsManager />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

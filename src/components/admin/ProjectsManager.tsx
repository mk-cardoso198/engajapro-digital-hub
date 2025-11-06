import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash2, Archive, ArchiveRestore, Eye, EyeOff } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import ProjectDialog from './ProjectDialog';

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

export default function ProjectsManager() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: 'Erro ao carregar projetos',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      setProjects(data || []);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este projeto?')) return;

    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: 'Erro ao excluir projeto',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Projeto excluído',
        description: 'O projeto foi removido com sucesso',
      });
      loadProjects();
    }
  };

  const handleArchive = async (project: Project) => {
    const { error } = await supabase
      .from('projects')
      .update({ archived: !project.archived })
      .eq('id', project.id);

    if (error) {
      toast({
        title: 'Erro ao arquivar projeto',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: project.archived ? 'Projeto desarquivado' : 'Projeto arquivado',
        description: `O projeto foi ${project.archived ? 'desarquivado' : 'arquivado'} com sucesso`,
      });
      loadProjects();
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setDialogOpen(true);
  };

  const handleAdd = () => {
    setEditingProject(null);
    setDialogOpen(true);
  };

  if (loading) {
    return <div className="text-white">Carregando projetos...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Gerenciar Projetos</h2>
        <Button onClick={handleAdd} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Novo Projeto
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className={`group relative bg-gray-900/50 border border-white/10 rounded-xl overflow-hidden transition-all hover:border-white/30 hover:shadow-xl ${
              project.archived ? 'opacity-60' : ''
            }`}
          >
            {/* Cover Image */}
            <div className="aspect-video w-full overflow-hidden bg-gray-800">
              {project.cover_image ? (
                <img
                  src={project.cover_image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white/30">
                  Sem imagem
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white line-clamp-1">
                    {project.title}
                    {project.archived && (
                      <span className="ml-2 text-xs text-yellow-500">(Arquivado)</span>
                    )}
                  </h3>
                </div>
                <div className="flex gap-1 flex-shrink-0">
                  <span className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded-full whitespace-nowrap">
                    Pos. {project.display_order || 0}
                  </span>
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full whitespace-nowrap">
                    {project.category}
                  </span>
                </div>
              </div>

              <p className="text-white/70 text-sm line-clamp-2">{project.description}</p>

              {project.client_name && (
                <p className="text-white/50 text-xs">Cliente: {project.client_name}</p>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(project)}
                  className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <Pencil className="h-3 w-3 mr-1" />
                  Editar
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleArchive(project)}
                  className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  {project.archived ? (
                    <>
                      <Eye className="h-3 w-3 mr-1" />
                      Ativar
                    </>
                  ) : (
                    <>
                      <EyeOff className="h-3 w-3 mr-1" />
                      Arquivar
                    </>
                  )}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDelete(project.id)}
                  className="bg-red-500/10 border-red-500/20 text-red-500 hover:bg-red-500/20"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        ))}

        {projects.length === 0 && (
          <div className="col-span-full text-center py-12 text-white/70">
            Nenhum projeto cadastrado. Clique em "Novo Projeto" para começar.
          </div>
        )}
      </div>

      <ProjectDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        project={editingProject}
        onSuccess={loadProjects}
      />
    </div>
  );
}

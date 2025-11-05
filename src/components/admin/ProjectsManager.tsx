import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash2, Archive, ArchiveRestore } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import ProjectDialog from './ProjectDialog';

type Project = {
  id: string;
  title: string;
  description: string;
  category: string;
  results: string;
  archived: boolean;
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

      <div className="grid gap-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className={`bg-gray-900/50 border border-white/10 rounded-xl p-6 ${
              project.archived ? 'opacity-60' : ''
            }`}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {project.title}
                  {project.archived && (
                    <span className="ml-2 text-sm text-yellow-500">(Arquivado)</span>
                  )}
                </h3>
                <p className="text-white/70 text-sm mb-2">{project.category}</p>
                <p className="text-white/90">{project.description}</p>
                <p className="text-white/70 mt-2 text-sm">
                  <strong>Resultados:</strong> {project.results}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => handleEdit(project)}
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => handleArchive(project)}
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  {project.archived ? (
                    <ArchiveRestore className="h-4 w-4" />
                  ) : (
                    <Archive className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => handleDelete(project.id)}
                  className="bg-red-500/10 border-red-500/20 text-red-500 hover:bg-red-500/20"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}

        {projects.length === 0 && (
          <div className="text-center py-12 text-white/70">
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

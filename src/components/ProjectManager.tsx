import { useState } from 'react';
import { Project } from '../types';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Save, FolderOpen, Trash2, Download } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface ProjectManagerProps {
  currentProject: Project;
  onSave: (project: Project) => void;
  onLoad: (project: Project) => void;
  onNew: () => void;
  onExport: () => void;
}

export function ProjectManager({ currentProject, onSave, onLoad, onNew, onExport }: ProjectManagerProps) {
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showLoadDialog, setShowLoadDialog] = useState(false);
  const [projectName, setProjectName] = useState(currentProject.name);
  const [savedProjects, setSavedProjects] = useState<Project[]>([]);

  const handleSave = () => {
    const updatedProject = {
      ...currentProject,
      name: projectName,
      updatedAt: new Date().toISOString()
    };
    
    const existing = savedProjects.findIndex(p => p.id === updatedProject.id);
    if (existing >= 0) {
      setSavedProjects(prev => prev.map((p, i) => i === existing ? updatedProject : p));
    } else {
      setSavedProjects(prev => [...prev, updatedProject]);
    }
    
    onSave(updatedProject);
    setShowSaveDialog(false);
    toast.success('Проект сохранён');
  };

  const handleLoad = (project: Project) => {
    onLoad(project);
    setShowLoadDialog(false);
    toast.success('Проект загружен');
  };

  const handleDelete = (projectId: string) => {
    setSavedProjects(prev => prev.filter(p => p.id !== projectId));
    toast.success('Проект удалён');
  };

  const handleExport = () => {
    onExport();
    toast.success('Проект экспортирован');
  };

  return (
    <>
      <div className="flex flex-wrap gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setShowSaveDialog(true)}
          className="hover:bg-tech-green/10 hover:text-tech-green hover:border-tech-green/50 transition-all"
        >
          <Save className="mr-2 h-4 w-4" />
          Сохранить
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setShowLoadDialog(true)}
          className="hover:bg-tech-blue/10 hover:text-tech-blue hover:border-tech-blue/50 transition-all"
        >
          <FolderOpen className="mr-2 h-4 w-4" />
          Загрузить
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onNew}
          className="hover:bg-destructive/10 hover:text-destructive hover:border-destructive/50 transition-all"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Очистить
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleExport}
          className="hover:bg-tech-cyan/10 hover:text-tech-cyan hover:border-tech-cyan/50 transition-all"
        >
          <Download className="mr-2 h-4 w-4" />
          Экспорт
        </Button>
      </div>

      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Сохранить проект</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label>Название проекта</label>
              <Input
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Введите название..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSaveDialog(false)}>
              Отмена
            </Button>
            <Button onClick={handleSave}>
              Сохранить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showLoadDialog} onOpenChange={setShowLoadDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Загрузить проект</DialogTitle>
          </DialogHeader>
          <div className="space-y-2 py-4 max-h-[400px] overflow-y-auto">
            {savedProjects.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                Нет сохранённых проектов
              </div>
            ) : (
              savedProjects.map(project => (
                <div key={project.id} className="flex items-center gap-2 p-3 border rounded-lg">
                  <div className="flex-1 min-w-0">
                    <div className="truncate">{project.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(project.updatedAt).toLocaleDateString('ru-RU')}
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleLoad(project)}
                  >
                    Загрузить
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDelete(project.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowLoadDialog(false)}>
              Закрыть
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

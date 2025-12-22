'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import type { ProjectWithMembers } from '@/types/projects';


interface ProjectsContextType {
  // Estado del dialog
  isDialogOpen: boolean;
  
  // Qué proyecto estamos editando (null = crear nuevo)
  currentProject: ProjectWithMembers | null;
  
  // Funciones para abrir/cerrar
  openCreateDialog: () => void;
  openEditDialog: (project: ProjectWithMembers) => void;
  closeDialog: () => void;
}

const ProjectsContext = createContext<ProjectsContextType | undefined>(undefined);

export function ProjectsProvider({ children }: { children: ReactNode }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<ProjectWithMembers | null>(null);

  const openCreateDialog = () => {
    setCurrentProject(null); // null = modo crear
    setIsDialogOpen(true);
  };

  const openEditDialog = (project: ProjectWithMembers) => {
    setCurrentProject(project); // tiene proyecto = modo editar
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setCurrentProject(null);
  };

  return (
    <ProjectsContext.Provider
      value={{
        isDialogOpen,
        currentProject,
        openCreateDialog,
        openEditDialog,
        closeDialog,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
}

// Hook para usar el contexto
export function useProjectsDialog() {
  const context = useContext(ProjectsContext);
  if (!context) {
    throw new Error('useProjectsDialog debe usarse dentro de ProjectsProvider');
  }
  return context;
}
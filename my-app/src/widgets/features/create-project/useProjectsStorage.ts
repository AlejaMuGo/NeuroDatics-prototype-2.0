import { useState, useEffect } from 'react';
import type { Project } from '@/widgets/entities/project';

const STORAGE_KEY = 'neurodatics_projects';

const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Helados colombianos',
    createdAt: '14/12/2025',
    sensors: ['EyeTracker'],
    participants: 3
  },
  {
    id: '2',
    name: 'Publicidad Coca-cola',
    createdAt: '28/11/2025',
    sensors: ['EEG', 'GSR', 'EyeTracker'],
    participants: 1
  }
];

export const useProjectsStorage = () => {
  const [projects, setProjects] = useState<Project[]>(() => {
    // Load from localStorage on initial render
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return Array.isArray(parsed) && parsed.length > 0 ? parsed : mockProjects;
      }
    } catch (error) {
      console.error('Error loading projects from localStorage:', error);
    }
    return mockProjects;
  });

  // Save to localStorage whenever projects change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    } catch (error) {
      console.error('Error saving projects to localStorage:', error);
    }
  }, [projects]);

  const addProject = (project: Project) => {
    setProjects(prev => [project, ...prev]);
  };

  const removeProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  return {
    projects,
    addProject,
    removeProject
  };
};

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from '@/widgets/shared/ui/organisms/Header';
import { HomePage } from '@/pages/home/ui/HomePage';
import { ProjectsPage } from '@/pages/projects/ui/ProjectsPage';
import { DashboardPage } from '@/pages/dashboard/ui/DashboardPage';
import { ReportsPage } from '@/pages/reports/ui';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/proyectos" element={<ProjectsPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/reportes" element={<ReportsPage />} />
      </Routes>
    </BrowserRouter>
  );
};

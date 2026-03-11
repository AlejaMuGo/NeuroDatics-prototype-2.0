import { ProjectSelectionCard } from '@/widgets/shared/ui/organisms/ProjectSelectionCard';
import { ReportsEmptyContainer } from '@/widgets/shared/ui/organisms/ReportsEmptyContainer';
import { ReportConfigurationCard } from '@/widgets/shared/ui/organisms/ReportConfigurationCard';
import { ReportContentCard } from '@/widgets/shared/ui/organisms/ReportContentCard';
import { ReportPreview } from '@/widgets/shared/ui/organisms/ReportPreview';
import { ExportOptionsCard } from '@/widgets/shared/ui/organisms/ExportOptionsCard';
import { useSelectedProject } from '@/widgets/features/select-project';
import { useReportType } from '@/widgets/features/select-report-type/useReportType';
import { useReportContent } from '@/widgets/features/select-report-content/useReportContent';
import { useExportOptions } from '@/widgets/features/export-report-options/useExportOptions';
import { useSelectedSensors } from '@/widgets/features/select-sensors/useSelectedSensors';
import type { Project } from '@/widgets/entities/project';


// Mock data
const mockProjects: Project[] = [
  { 
    id: '1', 
    name: 'Publicidad Coca-cola',
    createdAt: '28/11/2025',
    sensors: ['EEG', 'GSR', 'EyeTracker']
  },
  { 
    id: '2', 
    name: 'Helados Colombianos',
    createdAt: '15/10/2025',
    sensors: ['EyeTracker']
  },
  { 
    id: '3', 
    name: 'Experimento atardecer',
    createdAt: '03/12/2025',
    sensors: ['GSR', 'EyeTracker']
  }
];

export const ReportsPage = () => {
  const { selectedProject, selectProject, hasSelection } = useSelectedProject(mockProjects);
  const { reportType, setReportType, hasReportType } = useReportType();
  const { content, toggleContent, selectedCount, hasContent } = useReportContent();
  const { options, toggleOption } = useExportOptions();
  const { selectedSensors, toggleSensor, clearSensors } = useSelectedSensors();
  
  const handleReportTypeChange = (type: typeof reportType) => {
    setReportType(type);
    // Clear sensors when changing report type
    if (type !== 'by-sensor') {
      clearSensors();
    }
  };
  
  const handleDownload = () => {
    console.log('Descargando reporte PDF...', {
      project: selectedProject?.name,
      reportType,
      selectedSensors,
      content,
      options
    });
  };
  
  const canDownload = hasReportType && (reportType !== 'by-sensor' || selectedSensors.length > 0);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-8 py-10">
        {/* Header Section */}
        <div className="mb-10">
          <h1 className="text-3xl font-semibold text-gray-900 mb-3 tracking-tight">
            Reportes
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Genera y descarga reportes en PDF de tus proyectos, incluyendo gráficas, estadísticas y análisis de sensores.
          </p>
        </div>
        
        {/* Project Selection Card */}
        <div className="mb-8">
          <ProjectSelectionCard
            projects={mockProjects}
            selectedProject={selectedProject}
            onProjectChange={selectProject}
          />
        </div>
        
        {/* Report Configuration Card */}
          {hasSelection && (
            <div className="mb-8 animate-in fade-in slide-in-from-top-4 duration-300">
              <ReportConfigurationCard
                reportType={reportType}
                onReportTypeChange={handleReportTypeChange}
                availableSensors={selectedProject?.sensors || []}
                selectedSensors={selectedSensors}
                onSensorToggle={toggleSensor}
              />
            </div>
          )}
        
        {/* Report Content Card */}
        {hasReportType && (
          <div className="mb-8 animate-in fade-in slide-in-from-top-4 duration-300">
            <ReportContentCard
              enabled={hasReportType}
              content={content}
              onToggleContent={toggleContent}
            />
            
            {/* Report Preview */}
            {hasContent && (
              <div className="pl-14 pr-8">
                <ReportPreview selectedCount={selectedCount} />
              </div>
            )}
          </div>
        )}
        
        {/* Export Options Card */}
        {hasReportType && (
          <div className="mb-8 animate-in fade-in slide-in-from-top-4 duration-300" style={{ animationDelay: '100ms' }}>
            <ExportOptionsCard
              enabled={hasReportType}
              options={options}
              onToggleOption={toggleOption}
              onDownload={handleDownload}
              canDownload={canDownload}
            />
          </div>
        )}
        
        {/* Empty State */}
        {!hasSelection && (
          <div className="transition-all duration-300">
            <ReportsEmptyContainer />
          </div>
        )}
      </div>
    </div>
  );
};

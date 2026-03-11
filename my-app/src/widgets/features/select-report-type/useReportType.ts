import { useState } from 'react';
import type { ReportType } from '@/widgets/entities/report';

export const useReportType = () => {
  const [reportType, setReportType] = useState<ReportType>(null);
  
  return {
    reportType,
    setReportType,
    hasReportType: reportType !== null
  };
};

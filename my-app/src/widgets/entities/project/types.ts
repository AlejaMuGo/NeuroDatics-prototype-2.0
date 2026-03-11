import type { SensorType } from '@/widgets/shared/ui/atoms/SensorBadge';

export interface Project {
  id: string;
  name: string;
  createdAt: string;
  sensors: SensorType[];
  participants?: number;
}

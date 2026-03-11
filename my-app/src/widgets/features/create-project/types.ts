export type SensorType = 'EEG' | 'GSR' | 'EyeTracker';

export interface ParticipantData {
  id: string;
  sex: 'Masculino' | 'Femenino' | 'Otro' | null;
  age: string;
}

export interface AOI {
  id: string;
  name: string;
  color: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Stimulus {
  id: string;
  name: string;
  aois: AOI[];
}

export interface ProjectFormData {
  projectName: string;
  folderPath: string;
  sensors: SensorType[];
  participants: ParticipantData[];
  stimuli: Stimulus[];
}

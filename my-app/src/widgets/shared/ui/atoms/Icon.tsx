import type { ComponentType } from "react";
import {
  Folder,
  FolderOpen,
  ChevronDown,
  User,
  type LucideProps,
} from "lucide-react";

export type IconName = "folder" | "folder-open" | "chevron-down" | "user";

interface IconProps {
  name: IconName;
  className?: string;
  size?: number;
}

/**
 * Mapa centralizado de íconos (Lucide).
 * Para agregar uno nuevo:
 * 1) Importa el icono de lucide-react arriba
 * 2) Agrégalo a iconMap
 * 3) Incluye el name en IconName
 */
const iconMap: Record<IconName, ComponentType<LucideProps>> = {
  folder: Folder,
  "folder-open": FolderOpen,
  "chevron-down": ChevronDown,
  user: User,
};

export const Icon = ({ name, className = "", size = 24 }: IconProps) => {
  const LucideIcon = iconMap[name];
  return <LucideIcon size={size} className={className} />;
};
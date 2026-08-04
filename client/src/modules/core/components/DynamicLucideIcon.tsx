import React from 'react';
import * as LucideIcons from 'lucide-react';

interface DynamicLucideIconProps {
  name: string;
  className?: string;
  size?: number | string;
  strokeWidth?: number;
}

export const DynamicLucideIcon: React.FC<DynamicLucideIconProps> = ({
  name,
  className = "w-5 h-5",
  size,
  strokeWidth = 2
}) => {
  if (!name || typeof name !== 'string') {
    const Fallback = LucideIcons.CircleHelp || LucideIcons.HelpCircle;
    return <Fallback className={className} size={size} strokeWidth={strokeWidth} />;
  }

  const cleanName = name.trim();

  // Normalize string: convert kebab-case or space-separated to PascalCase (e.g., shield-check -> ShieldCheck)
  const pascalName = cleanName
    .replace(/(?:^|[-_ ]+)(\w)/g, (_, c) => c.toUpperCase())
    .replace(/[^a-zA-Z0-9]/g, '');

  const IconComponent =
    (LucideIcons as any)[cleanName] ||
    (LucideIcons as any)[pascalName] ||
    (LucideIcons as any)[`Lucide${pascalName}`];

  if (IconComponent && (typeof IconComponent === 'function' || typeof IconComponent === 'object')) {
    return <IconComponent className={className} size={size} strokeWidth={strokeWidth} />;
  }

  const CircleHelpFallback = LucideIcons.CircleHelp || LucideIcons.HelpCircle;
  return <CircleHelpFallback className={className} size={size} strokeWidth={strokeWidth} />;
};

export default DynamicLucideIcon;

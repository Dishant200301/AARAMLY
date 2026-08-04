import React, { useState } from 'react';
import * as LucideIcons from 'lucide-react';

interface LucideIconPickerProps {
  value: string;
  onChange: (iconName: string) => void;
  label?: string;
}

const POPULAR_ICONS = [
  'Package', 'ShieldCheck', 'Heart', 'Leaf', 'Sparkles', 'Droplets', 'Sun',
  'Flame', 'RefreshCw', 'Truck', 'Ruler', 'CheckCircle2', 'Award', 'Star',
  'Zap', 'Wind', 'Layers', 'Smile', 'Feather', 'Activity', 'BadgeCheck',
  'Box', 'Clock', 'Compass', 'Gift', 'Info', 'Lock', 'RotateCcw', 'Scissors',
  'Shield', 'ShoppingBag', 'Tag', 'ThumbsUp', 'Truck', 'WashingMachine',
  'CircleHelp'
];

export const LucideIconPicker: React.FC<LucideIconPickerProps> = ({
  value,
  onChange,
  label = 'Lucide Icon'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const currentIconName = value || 'Sparkles';

  const cleanName = currentIconName.trim();
  const pascalName = cleanName
    .replace(/(?:^|[-_ ]+)(\w)/g, (_, c) => c.toUpperCase())
    .replace(/[^a-zA-Z0-9]/g, '');

  const CurrentIcon =
    (LucideIcons as any)[cleanName] ||
    (LucideIcons as any)[pascalName] ||
    LucideIcons.CircleHelp;

  const filteredIcons = POPULAR_ICONS.filter((icon) =>
    icon.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-1.5 font-sans">
      {label && <label className="block text-xs font-semibold text-neutral-700">{label}</label>}
      <div className="relative">
        <div className="flex items-center gap-2">
          {/* Active Icon Preview Badge */}
          <div className="w-10 h-10 rounded-lg bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-800 shrink-0">
            <CurrentIcon className="w-5 h-5" />
          </div>

          {/* Text Input for Custom Icon Name */}
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="e.g. ShieldCheck, Package, Heart"
            className="flex-1 px-3 py-2 text-xs border border-neutral-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition"
          />

          {/* Icon Selector Button */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="px-3 py-2 text-xs bg-neutral-900 text-white font-medium rounded-lg hover:bg-neutral-800 transition cursor-pointer"
          >
            {isOpen ? 'Close' : 'Browse Icons'}
          </button>
        </div>

        {/* Dropdown Grid Picker */}
        {isOpen && (
          <div className="absolute left-0 right-0 top-12 z-50 p-3 bg-white rounded-xl border border-neutral-200 shadow-xl space-y-3">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search icons (e.g. Wash, Heart, Shield)..."
              className="w-full px-3 py-1.5 text-xs border border-neutral-200 rounded-md outline-none focus:border-black"
            />
            <div className="grid grid-cols-6 gap-2 max-h-48 overflow-y-auto p-1">
              {filteredIcons.map((iconName) => {
                const IconComp = (LucideIcons as any)[iconName] || LucideIcons.CircleHelp;
                const isSelected = value === iconName;
                return (
                  <button
                    key={iconName}
                    type="button"
                    title={iconName}
                    onClick={() => {
                      onChange(iconName);
                      setIsOpen(false);
                    }}
                    className={`flex flex-col items-center justify-center p-2 rounded-lg border text-xs transition cursor-pointer ${
                      isSelected
                        ? 'bg-black text-white border-black font-bold'
                        : 'bg-neutral-50 hover:bg-neutral-100 text-neutral-700 border-neutral-200'
                    }`}
                  >
                    <IconComp className="w-4 h-4 mb-1" />
                    <span className="text-[9px] truncate w-full text-center">{iconName}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LucideIconPicker;

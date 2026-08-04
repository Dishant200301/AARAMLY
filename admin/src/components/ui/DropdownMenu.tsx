import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface DropdownItem {
  id?: string;
  label: string;
  icon?: React.ElementType;
  badge?: string;
  disabled?: boolean;
  danger?: boolean;
  onClick?: () => void;
}

interface DropdownMenuProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  align?: 'left' | 'right';
  width?: string;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  trigger,
  items,
  align = 'right',
  width = 'w-56',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={containerRef}>
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {trigger}
      </div>

      {isOpen && (
        <div
          className={`absolute ${align === 'right' ? 'right-0' : 'left-0'} mt-2 ${width} bg-white rounded-lg shadow-lg border border-neutral-200 py-1.5 z-50 animate-in fade-in-80 zoom-in-95 duration-100 font-sans`}
        >
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id || index}
                disabled={item.disabled}
                onClick={() => {
                  if (item.onClick) item.onClick();
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium transition-colors cursor-pointer ${
                  item.disabled
                    ? 'opacity-40 cursor-not-allowed text-neutral-400'
                    : item.danger
                    ? 'text-rose-600 hover:bg-rose-50'
                    : 'text-neutral-800 hover:bg-neutral-100 hover:text-black'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  {Icon && <Icon className={`w-3.5 h-3.5 ${item.danger ? 'text-rose-600' : 'text-neutral-500'}`} />}
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] font-semibold bg-neutral-100 text-neutral-700 border border-neutral-200 px-1.5 py-0.5 rounded-md">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

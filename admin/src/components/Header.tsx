import React from 'react';
import { Search, Bell, ExternalLink, LogOut, User, ChevronDown, Shield, Sliders } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { DropdownMenu } from './ui/DropdownMenu';

interface HeaderProps {
  title: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
  const { user, logout } = useAuth();

  const userInitials = user?.name ? user.name.substring(0, 2).toUpperCase() : 'AD';

  const dropdownItems = [
    {
      label: user?.name || 'Admin User',
      icon: User,
      badge: user?.role || 'Super Admin',
      disabled: true,
    },
    {
      label: 'View Storefront',
      icon: ExternalLink,
      onClick: () => window.open('http://localhost:5173', '_blank'),
    },
    {
      label: 'Sign Out',
      icon: LogOut,
      danger: true,
      onClick: logout,
    },
  ];

  return (
    <header className="h-14 bg-white border-b border-neutral-200 px-6 flex items-center justify-between sticky top-0 z-20 font-sans">
      {/* Vercel Title / Breadcrumb */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-neutral-400 font-medium hidden sm:inline">aaramly</span>
        <span className="text-xs text-neutral-300 hidden sm:inline">/</span>
        <h2 className="text-sm font-semibold text-black capitalize tracking-tight flex items-center gap-2">
          {title}
        </h2>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-3">
        {/* Global Search with Vercel / Shortcut badge */}
        <div className="relative w-60 hidden md:block">
          <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search catalog..."
            className="w-full bg-neutral-50 hover:bg-neutral-100/80 text-xs text-black pl-8 pr-8 py-1.5 rounded-md border border-neutral-200 focus:outline-none focus:border-black focus:bg-white transition-all placeholder:text-neutral-400 font-normal"
          />
          <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono text-neutral-400 bg-white border border-neutral-200 px-1.5 py-0.5 rounded shadow-2xs">
            /
          </kbd>
        </div>

        {/* View Store Live Button */}
        <a
          href="http://localhost:5173"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 text-xs font-medium text-black bg-white hover:bg-neutral-100 px-3 py-1.5 rounded-md transition-all border border-neutral-200 shadow-2xs"
        >
          <span>View Storefront</span>
          <ExternalLink className="w-3 h-3 text-neutral-500" />
        </a>

        {/* Notifications */}
        <button className="relative p-1.5 text-neutral-600 hover:text-black rounded-md hover:bg-neutral-100 transition-colors cursor-pointer">
          <Bell className="w-4 h-4" />
          <span className="w-1.5 h-1.5 rounded-full bg-black absolute top-1.5 right-1.5 ring-2 ring-white"></span>
        </button>

        {/* User Profile & Dropdown Menu */}
        <div className="pl-2 border-l border-neutral-200">
          <DropdownMenu
            align="right"
            items={dropdownItems}
            trigger={
              <button className="flex items-center gap-2 hover:bg-neutral-100 p-1.5 rounded-md transition-colors cursor-pointer group">
                <div className="w-6 h-6 rounded-full bg-neutral-900 text-white font-semibold text-[10px] flex items-center justify-center border border-neutral-800">
                  {userInitials}
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-xs font-medium text-black leading-none">{user?.name || 'Admin'}</p>
                </div>
                <ChevronDown className="w-3 h-3 text-neutral-400 group-hover:text-black transition-colors" />
              </button>
            }
          />
        </div>
      </div>
    </header>
  );
};

import { Bell, List } from '@phosphor-icons/react';
import { useAuth } from '../../context/AuthContext';
import { Avatar } from '../ui/Avatar';

export function Topbar({ title, subtitle, onMenuOpen }) {
  const { user } = useAuth();

  return (
    <header
      className="flex items-center justify-between px-4 sm:px-6 lg:px-10 sticky top-0 z-20 h-[72px] bg-white/80 backdrop-blur-xl border-b border-[#E4E4E7] font-['Manrope',sans-serif]"
    >
      {/* Left: hamburger (mobile) + page title */}
      <div className="flex items-center gap-3 sm:gap-4 min-w-0">
        {/* Hamburger — mobile only */}
        <button
          onClick={onMenuOpen}
          className="lg:hidden p-2 text-[#09090B] border-2 border-transparent hover:border-[#18181B] hover:bg-[#F4F4F5] transition-all rounded-none shrink-0"
          title="Open menu"
        >
          <List size={22} weight="bold" />
        </button>

        <div className="min-w-0">
          <h1 className="text-lg sm:text-xl md:text-2xl font-['Outfit',sans-serif] font-black uppercase tracking-widest text-[#09090B] leading-none truncate">
            {title}
          </h1>
          {subtitle && (
            <p className="text-[10px] text-[#71717A] font-bold uppercase tracking-[0.2em] mt-1.5 hidden sm:block">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Right: actions */}
      <div className="flex items-center gap-3 lg:gap-6 shrink-0">
        <button 
          className="p-2 bg-transparent text-[#09090B] border-2 border-transparent hover:border-[#18181B] hover:bg-[#F4F4F5] transition-all rounded-none"
          title="Notifications"
        >
          <Bell size={20} weight="bold" />
        </button>
        <div className="w-px h-8 bg-[#E4E4E7]" />
        <div className="flex items-center gap-3 cursor-pointer group">
          <Avatar name={user?.name} size="sm" />
          <div className="hidden sm:block">
            <p className="text-sm font-bold text-[#09090B] leading-tight group-hover:text-[#FF4500] transition-colors">
              {user?.name}
            </p>
            <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#71717A] mt-0.5 hidden md:block">
              {user?.email}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
import { Bell, Search } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Avatar } from '../ui/Avatar';

export function Topbar({ title, subtitle }) {
  const { user } = useAuth();

  return (
    <header className="h-16 flex items-center justify-between px-6 border-b border-[#1E2D45] bg-[#0B0F1A]/80 backdrop-blur-sm sticky top-0 z-30">
      {/* Left: page title */}
      <div>
        <h1 className="text-base font-semibold text-white font-sans leading-tight">{title}</h1>
        {subtitle && <p className="text-xs text-slate-500 font-mono">{subtitle}</p>}
      </div>

      {/* Right: actions */}
      <div className="flex items-center gap-3">
        <button className="p-2 rounded-[9px] text-slate-500 hover:text-slate-200 hover:bg-white/5 transition-all">
          <Bell size={17} />
        </button>
        <div className="w-px h-5 bg-[#1E2D45]" />
        <div className="flex items-center gap-2.5">
          <Avatar name={user?.name} size="sm" />
          <div className="hidden sm:block">
            <p className="text-xs font-semibold text-slate-200 leading-tight">{user?.name}</p>
            <p className="text-[10px] font-mono text-slate-600">{user?.email}</p>
          </div>
        </div>
      </div>
    </header>
  );
}

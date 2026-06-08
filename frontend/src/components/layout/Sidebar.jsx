import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  BarChart3,
  Activity,
  LogOut,
  Settings,
  Zap,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Avatar } from '../ui/Avatar';
import { cn } from '../../utils/helpers';
import { toast } from '../ui/Toast';

const NAV_ITEMS = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/leads', icon: Users, label: 'Leads' },
  { to: '/analytics', icon: BarChart3, label: 'Analytics' },
  { to: '/activity', icon: Activity, label: 'Activity' },
];

function NavItem({ to, icon: Icon, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          'group flex items-center gap-3 px-3 py-2.5 rounded-[10px] text-sm font-medium',
          'transition-all duration-200 relative',
          isActive
            ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25'
            : 'text-slate-500 hover:text-slate-200 hover:bg-white/5 border border-transparent'
        )
      }
    >
      {({ isActive }) => (
        <>
          <Icon
            size={17}
            strokeWidth={isActive ? 2.2 : 1.8}
            className={isActive ? 'text-emerald-400' : 'text-slate-500 group-hover:text-slate-300'}
          />
          <span className="font-sans">{label}</span>
          {isActive && (
            <ChevronRight
              size={13}
              className="ml-auto text-emerald-500/60"
            />
          )}
        </>
      )}
    </NavLink>
  );
}

export function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <aside
      className="fixed left-0 top-0 bottom-0 bg-[#0D1117] border-r border-[#1E2D45] flex flex-col z-40"
      style={{ width: '240px' }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-[#1E2D45]">
        <div className="w-8 h-8 rounded-[9px] bg-gradient-to-br from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/30">
          <Zap size={16} strokeWidth={2.5} className="text-white" />
        </div>
        <div>
          <span className="text-sm font-bold text-white font-sans tracking-tight">Gatherly</span>
          <span className="block text-[10px] font-mono text-emerald-500/70 tracking-widest uppercase">CRM</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        <p className="text-[10px] font-mono text-slate-600 uppercase tracking-widest px-3 mb-2">Menu</p>
        {NAV_ITEMS.map((item) => (
          <NavItem key={item.to} {...item} />
        ))}
      </nav>

      {/* User footer */}
      <div className="px-3 py-4 border-t border-[#1E2D45] space-y-2">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-[10px] bg-[#111827] border border-[#1E2D45]">
          <Avatar name={user?.name} size="sm" />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-slate-200 truncate">{user?.name}</p>
            <p className="text-[10px] font-mono text-slate-600 truncate">{user?.role}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-[10px] text-xs text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 font-sans"
        >
          <LogOut size={14} />
          Sign out
        </button>
      </div>
    </aside>
  );
}

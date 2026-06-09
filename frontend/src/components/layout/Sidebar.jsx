import { NavLink, useNavigate } from 'react-router-dom';
import {
  SquaresFour,
  Users,
  ChartBar,
  PulseIcon,
  SignOut,
  X,
} from '@phosphor-icons/react';
import { useAuth } from '../../context/AuthContext';
import { Avatar } from '../ui/Avatar';
import { cn } from '../../utils/helpers';
import { toast } from '../ui/Toast';

const NAV_ITEMS = [
  { to: '/dashboard', icon: SquaresFour, label: 'Dashboard' },
  { to: '/leads', icon: Users, label: 'Leads' },
  { to: '/analytics', icon: ChartBar, label: 'Analytics' },
  { to: '/activity', icon: PulseIcon, label: 'Activity' },
];

function NavItem({ to, icon: Icon, label, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        cn(
          'group flex items-center gap-4 py-3.5 pr-6 pl-5 text-[11px] font-bold uppercase tracking-[0.1em]',
          'transition-all duration-200 relative select-none rounded-none border-l-4',
          isActive
            ? 'bg-[#F4F4F5] text-[#09090B] border-[#FF4500]'
            : 'text-[#71717A] hover:text-[#09090B] hover:bg-[#F4F4F5] border-transparent'
        )
      }
    >
      {({ isActive }) => (
        <>
          <Icon
            size={20}
            weight={isActive ? "fill" : "bold"}
            className={cn(
              'shrink-0 transition-colors duration-200',
              isActive ? 'text-[#FF4500]' : 'text-[#71717A] group-hover:text-[#09090B]'
            )}
          />
          <span>{label}</span>
        </>
      )}
    </NavLink>
  );
}

export function Sidebar({ open, onClose }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const handleNavClick = () => {
    // Close sidebar on mobile after navigation
    if (onClose) onClose();
  };

  return (
    <>
      {/* Mobile overlay backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          'fixed left-0 top-0 bottom-0 flex flex-col z-40 bg-white border-r border-[#E4E4E7] font-[\'Manrope\',sans-serif] transition-transform duration-300',
          // On mobile: slide in/out. On lg+: always visible
          open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
        style={{ width: '264px' }}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-6 py-6 border-b border-[#E4E4E7]">
          <div>
            <span className="text-2xl font-['Outfit',sans-serif] font-black tracking-tight text-[#09090B] uppercase">Gatherly</span>
            <span className="block text-[9px] font-bold text-[#71717A] tracking-[0.2em] uppercase mt-0.5">CRM System</span>
          </div>
          {/* Close button — mobile only */}
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 text-[#71717A] hover:text-[#09090B] hover:bg-[#F4F4F5] border border-transparent hover:border-[#E4E4E7] transition-all rounded-none"
          >
            <X size={20} weight="bold" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-6 space-y-1 overflow-y-auto">
          <p className="text-[10px] font-bold text-[#71717A] uppercase tracking-[0.2em] px-6 mb-4">Menu</p>
          {NAV_ITEMS.map((item) => (
            <NavItem key={item.to} {...item} onClick={handleNavClick} />
          ))}
        </nav>

        {/* User footer */}
        <div className="p-6 border-t border-[#E4E4E7] space-y-4 bg-white">
          <div className="flex items-center gap-3 p-3 bg-[#F4F4F5] border border-[#E4E4E7] hover:border-[#18181B] transition-colors rounded-none cursor-pointer">
            <Avatar name={user?.name} size="sm" className="border border-[#18181B]" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-[#09090B] truncate leading-tight">{user?.name}</p>
              <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#71717A] truncate mt-0.5">{user?.role}</p>
            </div>
          </div>
          
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 text-[11px] font-bold uppercase tracking-widest text-[#09090B] border border-transparent hover:border-[#18181B] hover:bg-[#F4F4F5] hover:shadow-[4px_4px_0px_0px_#18181B] transition-all duration-200 rounded-none group"
          >
            <SignOut size={18} weight="bold" className="text-[#71717A] group-hover:text-[#EF4444] transition-colors" />
            Sign out
          </button>
        </div>
      </aside>
    </>
  );
}
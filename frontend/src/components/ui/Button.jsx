import { cn } from '../../utils/helpers';
import { Loader2 } from 'lucide-react';

const variants = {
  primary: `
    bg-gradient-to-r from-emerald-500 to-teal-400 text-white
    hover:from-emerald-400 hover:to-teal-300
    shadow-lg shadow-emerald-500/20
    active:scale-[0.97]
  `,
  secondary: `
    bg-[#161D2E] border border-[#1E2D45] text-slate-200
    hover:bg-[#1C2538] hover:border-[#243352]
  `,
  ghost: `
    bg-transparent text-slate-300 hover:bg-white/5 hover:text-white
  `,
  danger: `
    bg-red-500/10 border border-red-500/30 text-red-400
    hover:bg-red-500/20 hover:border-red-500/50
  `,
  outline: `
    border border-emerald-500/40 text-emerald-400 bg-transparent
    hover:bg-emerald-500/10 hover:border-emerald-500/60
  `,
};

const sizes = {
  sm: 'px-3 py-1.5 text-xs rounded-[8px] gap-1.5',
  md: 'px-4 py-2 text-sm rounded-[10px] gap-2',
  lg: 'px-6 py-2.5 text-sm rounded-[12px] gap-2',
  xl: 'px-8 py-3.5 text-base rounded-[14px] gap-2.5',
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon: Icon,
  iconRight,
  className = '',
  ...props
}) {
  return (
    <button
      disabled={disabled || loading}
      className={cn(
        'inline-flex items-center justify-center font-medium font-sans',
        'transition-all duration-200 cursor-pointer',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
        'select-none whitespace-nowrap',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {loading ? (
        <Loader2 size={14} className="animate-spin" />
      ) : Icon ? (
        <Icon size={14} strokeWidth={2.2} />
      ) : null}
      {children}
      {iconRight && !loading && <iconRight size={14} strokeWidth={2.2} />}
    </button>
  );
}

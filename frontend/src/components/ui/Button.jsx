import { cn } from '../../utils/helpers';
import { CircleNotch } from '@phosphor-icons/react';

const variants = {
  primary: `
    bg-[#FF4500] border border-[#FF4500] text-white
    hover:border-[#18181B] hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_#18181B]
    active:translate-y-0 active:shadow-none
  `,
  secondary: `
    bg-transparent border border-[#18181B] text-[#18181B]
    hover:bg-[#F4F4F5] hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_#18181B]
    active:translate-y-0 active:shadow-none
  `,
  ghost: `
    bg-transparent border border-transparent text-[#71717A]
    hover:bg-[#F4F4F5] hover:text-[#09090B]
  `,
  danger: `
    bg-[#EF4444] border border-[#EF4444] text-white
    hover:border-[#18181B] hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_#18181B]
    active:translate-y-0 active:shadow-none
  `,
  outline: `
    bg-[#F4F4F5] border border-[#E4E4E7] text-[#09090B]
    hover:bg-white hover:border-[#18181B] hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_#18181B]
    active:translate-y-0 active:shadow-none
  `,
};

const sizes = {
  sm: 'px-4 py-2 text-[10px] rounded-none gap-1.5',
  md: 'px-6 py-3 text-xs rounded-none gap-2',
  lg: 'px-8 py-3.5 text-sm rounded-none gap-2',
  xl: 'px-10 py-4 text-base rounded-none gap-2.5',
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon: Icon,
  iconRight: IconRight,
  className = '',
  ...props
}) {
  return (
    <button
      disabled={disabled || loading}
      className={cn(
        'inline-flex items-center justify-center font-bold uppercase tracking-widest',
        'transition-all duration-200 cursor-pointer',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
        'disabled:hover:translate-y-0 disabled:hover:shadow-none',
        'select-none whitespace-nowrap',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {loading ? (
        <CircleNotch size={18} weight="bold" className="animate-spin" />
      ) : Icon ? (
        <Icon size={18} weight="bold" />
      ) : null}
      {children}
      {IconRight && !loading && <IconRight size={18} weight="bold" />}
    </button>
  );
}
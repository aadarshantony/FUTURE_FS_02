import { getInitials } from '../../utils/helpers';
import { cn } from '../../utils/helpers';

const sizes = {
  xs: 'w-6 h-6 text-[9px]',
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
  xl: 'w-16 h-16 text-xl',
};

const COLORS = [
  'bg-[#18181B] text-white border border-[#18181B]',
  'bg-[#FF4500] text-white border border-[#FF4500]',
  'bg-white text-[#09090B] border border-[#18181B]',
  'bg-[#F4F4F5] text-[#09090B] border border-[#18181B]',
];

function getColorIndex(name = '') {
  let sum = 0;
  for (const char of name) sum += char.charCodeAt(0);
  return sum % COLORS.length;
}

export function Avatar({ name = '', size = 'md', className = '' }) {
  const initials = getInitials(name);
  const themeConfig = COLORS[getColorIndex(name)];
  
  return (
    <div
      className={cn(
        'rounded-none flex items-center justify-center font-["Outfit",sans-serif] font-black uppercase tracking-widest shrink-0',
        themeConfig,
        sizes[size],
        className
      )}
    >
      {initials}
    </div>
  );
}
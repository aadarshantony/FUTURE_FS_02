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
  'from-emerald-500 to-teal-500',
  'from-violet-500 to-purple-500',
  'from-blue-500 to-cyan-500',
  'from-pink-500 to-rose-500',
  'from-amber-500 to-orange-500',
];

function getColorIndex(name = '') {
  let sum = 0;
  for (const char of name) sum += char.charCodeAt(0);
  return sum % COLORS.length;
}

export function Avatar({ name = '', size = 'md', className = '' }) {
  const initials = getInitials(name);
  const gradient = COLORS[getColorIndex(name)];
  return (
    <div
      className={cn(
        'rounded-full flex items-center justify-center font-semibold font-sans',
        'bg-gradient-to-br text-white shrink-0',
        gradient,
        sizes[size],
        className
      )}
    >
      {initials}
    </div>
  );
}

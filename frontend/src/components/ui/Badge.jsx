import { STATUS_CONFIG, SOURCE_LABELS } from '../../utils/constants';
import { cn } from '../../utils/helpers';

export function StatusBadge({ status, size = 'sm' }) {
  // Assuming STATUS_CONFIG provides standard Tailwind colors, we map them here
  // but enforce the strict brutalist shape and typography.
  const config = STATUS_CONFIG[status] || {
    label: status,
    color: 'text-[#71717A]',
    bg: 'bg-[#F4F4F5]',
    border: 'border-[#E4E4E7]',
    dot: 'bg-[#71717A]',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 font-bold uppercase tracking-[0.2em] border rounded-none',
        config.color,
        config.bg,
        config.border,
        size === 'sm' ? 'text-[9px] px-2 py-1' : 'text-[10px] px-3 py-1.5'
      )}
    >
      <span className={cn('inline-block w-2 h-2 rounded-none shrink-0', config.dot)} />
      {config.label}
    </span>
  );
}

export function SourceBadge({ source }) {
  return (
    <span className={cn(
      'inline-flex items-center text-[9px] font-bold uppercase tracking-[0.2em] px-2 py-1',
      'rounded-none bg-[#F4F4F5] text-[#71717A] border border-[#E4E4E7]',
      'hover:border-[#18181B] hover:text-[#09090B] transition-colors cursor-default'
    )}>
      {SOURCE_LABELS[source] || source}
    </span>
  );
}
import { STATUS_CONFIG, SOURCE_LABELS } from '../../utils/constants';
import { cn } from '../../utils/helpers';

export function StatusBadge({ status, size = 'sm' }) {
  const config = STATUS_CONFIG[status] || {
    label: status,
    color: 'text-slate-400',
    bg: 'bg-slate-400/10',
    border: 'border-slate-400/30',
    dot: 'bg-slate-400',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 font-mono font-medium border rounded-full',
        'uppercase tracking-wider',
        config.color,
        config.bg,
        config.border,
        size === 'sm' ? 'text-[10px] px-2 py-0.5' : 'text-xs px-3 py-1'
      )}
    >
      <span className={cn('inline-block w-1.5 h-1.5 rounded-full', config.dot)} />
      {config.label}
    </span>
  );
}

export function SourceBadge({ source }) {
  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-mono font-medium uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-700/50 text-slate-400 border border-slate-700/60">
      {SOURCE_LABELS[source] || source}
    </span>
  );
}

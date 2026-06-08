import { cn } from '../../utils/helpers';

export function Card({ children, className = '', hover = false, glow = false, ...props }) {
  return (
    <div
      className={cn(
        'bg-[#111827] border border-[#1E2D45] rounded-[14px]',
        'transition-all duration-200',
        hover && 'hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/5 cursor-pointer',
        glow && 'shadow-lg shadow-emerald-500/10',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '' }) {
  return (
    <div className={cn('flex items-center justify-between px-5 py-4 border-b border-[#1E2D45]', className)}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className = '' }) {
  return (
    <h3 className={cn('text-sm font-semibold text-slate-100 font-sans', className)}>
      {children}
    </h3>
  );
}

export function CardBody({ children, className = '' }) {
  return (
    <div className={cn('p-5', className)}>
      {children}
    </div>
  );
}

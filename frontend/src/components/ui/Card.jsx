import { cn } from '../../utils/helpers';

export function Card({ children, className = '', hover = false, glow = false, ...props }) {
  // Note: 'glow' prop is kept for compatibility but styled to match the brutalist theme
  return (
    <div
      className={cn(
        'bg-white border border-[#E4E4E7] rounded-none',
        'transition-all duration-200',
        hover && 'hover:border-[#18181B] hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_#18181B] cursor-pointer',
        glow && 'shadow-[4px_4px_0px_0px_#E4E4E7]',
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
    <div className={cn('flex items-center justify-between px-6 py-5 border-b border-[#E4E4E7] bg-[#F4F4F5]', className)}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className = '' }) {
  return (
    <h3 className={cn("text-sm font-['Outfit',sans-serif] font-black uppercase tracking-widest text-[#09090B]", className)}>
      {children}
    </h3>
  );
}

export function CardBody({ children, className = '' }) {
  return (
    <div className={cn('p-6', className)}>
      {children}
    </div>
  );
}
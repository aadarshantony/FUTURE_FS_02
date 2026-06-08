import { forwardRef } from 'react';
import { cn } from '../../utils/helpers';

export const Input = forwardRef(function Input(
  { label, error, hint, icon: Icon, className = '', containerClass = '', ...props },
  ref
) {
  return (
    <div className={cn('flex flex-col gap-1.5', containerClass)}>
      {label && (
        <label className="text-xs font-medium text-slate-400 font-mono tracking-wide uppercase">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
            <Icon size={15} strokeWidth={2} />
          </div>
        )}
        <input
          ref={ref}
          className={cn(
            'w-full bg-[#111827] border border-[#1E2D45]',
            'text-slate-100 placeholder:text-slate-600',
            'font-sans text-sm rounded-[10px]',
            'px-3.5 py-2.5 transition-all duration-200',
            'focus:border-emerald-500/60 focus:ring-2 focus:ring-emerald-500/15',
            'hover:border-[#243352]',
            Icon ? 'pl-9' : '',
            error ? 'border-red-500/50 focus:border-red-500/70 focus:ring-red-500/15' : '',
            className
          )}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-red-400 font-mono">{error}</p>}
      {hint && !error && <p className="text-xs text-slate-600">{hint}</p>}
    </div>
  );
});

export const Textarea = forwardRef(function Textarea(
  { label, error, hint, className = '', containerClass = '', ...props },
  ref
) {
  return (
    <div className={cn('flex flex-col gap-1.5', containerClass)}>
      {label && (
        <label className="text-xs font-medium text-slate-400 font-mono tracking-wide uppercase">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        rows={3}
        className={cn(
          'w-full bg-[#111827] border border-[#1E2D45]',
          'text-slate-100 placeholder:text-slate-600',
          'font-sans text-sm rounded-[10px]',
          'px-3.5 py-2.5 transition-all duration-200 resize-none',
          'focus:border-emerald-500/60 focus:ring-2 focus:ring-emerald-500/15',
          'hover:border-[#243352]',
          error ? 'border-red-500/50' : '',
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-red-400 font-mono">{error}</p>}
      {hint && !error && <p className="text-xs text-slate-600">{hint}</p>}
    </div>
  );
});

export const Select = forwardRef(function Select(
  { label, error, children, className = '', containerClass = '', ...props },
  ref
) {
  return (
    <div className={cn('flex flex-col gap-1.5', containerClass)}>
      {label && (
        <label className="text-xs font-medium text-slate-400 font-mono tracking-wide uppercase">
          {label}
        </label>
      )}
      <select
        ref={ref}
        className={cn(
          'w-full bg-[#111827] border border-[#1E2D45]',
          'text-slate-100',
          'font-sans text-sm rounded-[10px]',
          'px-3.5 py-2.5 transition-all duration-200',
          'focus:border-emerald-500/60 focus:ring-2 focus:ring-emerald-500/15',
          'hover:border-[#243352] cursor-pointer',
          error ? 'border-red-500/50' : '',
          className
        )}
        {...props}
      >
        {children}
      </select>
      {error && <p className="text-xs text-red-400 font-mono">{error}</p>}
    </div>
  );
});

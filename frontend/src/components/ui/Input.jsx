import { forwardRef } from 'react';
import { cn } from '../../utils/helpers';

export const Input = forwardRef(function Input(
  { label, error, hint, icon: Icon, className = '', containerClass = '', ...props },
  ref
) {
  return (
    <div className={cn('flex flex-col gap-1.5', containerClass)}>
      {label && (
        <label className="block uppercase text-xs tracking-[0.2em] font-bold text-zinc-500">
          {label}
        </label>
      )}
      <div className="relative group">
        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-[#18181B] pointer-events-none transition-colors">
            <Icon size={18} weight="bold" />
          </div>
        )}
        <input
          ref={ref}
          className={cn(
            'w-full bg-[#F4F4F5] border border-[#E4E4E7]',
            'text-[#09090B] font-bold placeholder-zinc-400',
            'text-sm rounded-none',
            'px-4 py-3.5 transition-all duration-200',
            'focus:outline-none focus:border-[#18181B] focus:bg-white',
            'hover:border-[#18181B]',
            Icon ? 'pl-11' : '',
            error ? 'border-[#EF4444] focus:border-[#EF4444]' : '',
            className
          )}
          {...props}
        />
      </div>
      {error && <p className="text-[#EF4444] text-xs font-bold mt-1">{error}</p>}
      {hint && !error && <p className="text-xs font-bold text-[#71717A] mt-1">{hint}</p>}
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
        <label className="block uppercase text-xs tracking-[0.2em] font-bold text-zinc-500">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        rows={3}
        className={cn(
          'w-full bg-[#F4F4F5] border border-[#E4E4E7]',
          'text-[#09090B] font-bold placeholder-zinc-400',
          'text-sm rounded-none',
          'px-4 py-3.5 transition-all duration-200 resize-none',
          'focus:outline-none focus:border-[#18181B] focus:bg-white',
          'hover:border-[#18181B]',
          error ? 'border-[#EF4444] focus:border-[#EF4444]' : '',
          className
        )}
        {...props}
      />
      {error && <p className="text-[#EF4444] text-xs font-bold mt-1">{error}</p>}
      {hint && !error && <p className="text-xs font-bold text-[#71717A] mt-1">{hint}</p>}
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
        <label className="block uppercase text-xs tracking-[0.2em] font-bold text-zinc-500">
          {label}
        </label>
      )}
      <select
        ref={ref}
        className={cn(
          'w-full bg-[#F4F4F5] border border-[#E4E4E7]',
          'text-[#09090B] font-bold',
          'text-sm rounded-none',
          'px-4 py-3.5 transition-all duration-200',
          'focus:outline-none focus:border-[#18181B] focus:bg-white',
          'hover:border-[#18181B] cursor-pointer',
          error ? 'border-[#EF4444] focus:border-[#EF4444]' : '',
          className
        )}
        {...props}
      >
        {children}
      </select>
      {error && <p className="text-[#EF4444] text-xs font-bold mt-1">{error}</p>}
    </div>
  );
});
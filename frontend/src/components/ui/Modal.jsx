import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from '@phosphor-icons/react';
import { cn } from '../../utils/helpers';

const sizes = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
};

export function Modal({ open, onClose, title, children, size = 'md', className = '' }) {
  const overlayRef = useRef(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6"
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#09090B]/60 backdrop-blur-sm animate-fade-in"
      />

      {/* Modal panel */}
      <div
        className={cn(
          'relative w-full bg-white font-["Manrope",sans-serif]',
          'rounded-none border-2 border-[#18181B]',
          'shadow-[8px_8px_0px_0px_#18181B]',
          'animate-slide-up',
          sizes[size],
          className
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 md:px-8 py-5 border-b-2 border-[#18181B] bg-[#F4F4F5]">
          <h2 className="text-lg md:text-xl font-['Outfit',sans-serif] font-black uppercase tracking-widest text-[#09090B]">{title}</h2>
          <button
            onClick={onClose}
            data-testid="close-modal-btn"
            className="text-[#09090B] bg-transparent hover:bg-white border-2 border-transparent hover:border-[#18181B] p-1.5 rounded-none transition-all"
          >
            <X size={20} weight="bold" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 md:px-8 py-6 md:py-8 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 10rem)' }}>
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}
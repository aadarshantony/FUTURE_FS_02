import { useEffect, useState } from 'react';
import { CheckCircle, XCircle, Warning, Info, X } from '@phosphor-icons/react';
import { cn } from '../../utils/helpers';

const ICONS = {
  success: CheckCircle,
  error: XCircle,
  warning: Warning,
  info: Info,
};

const ICON_COLORS = {
  success: 'text-[#10B981]',
  error: 'text-[#EF4444]',
  warning: 'text-[#F59E0B]',
  info: 'text-[#3B82F6]',
};

let toastListeners = [];
let toastQueue = [];
let toastId = 0;

export function toast(message, type = 'info', duration = 4000) {
  const id = ++toastId;
  const entry = { id, message, type, duration };
  toastQueue = [...toastQueue, entry];
  toastListeners.forEach((fn) => fn([...toastQueue]));
  setTimeout(() => {
    toastQueue = toastQueue.filter((t) => t.id !== id);
    toastListeners.forEach((fn) => fn([...toastQueue]));
  }, duration);
}

toast.success = (msg, d) => toast(msg, 'success', d);
toast.error = (msg, d) => toast(msg, 'error', d);
toast.warning = (msg, d) => toast(msg, 'warning', d);
toast.info = (msg, d) => toast(msg, 'info', d);

export function Toaster() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    toastListeners.push(setToasts);
    return () => {
      toastListeners = toastListeners.filter((fn) => fn !== setToasts);
    };
  }, []);

  const dismiss = (id) => {
    toastQueue = toastQueue.filter((t) => t.id !== id);
    setToasts([...toastQueue]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-4 max-w-sm w-full font-['Manrope',sans-serif]">
      {toasts.map((t) => {
        const Icon = ICONS[t.type] || Info;
        return (
          <div
            key={t.id}
            className={cn(
              'flex items-start gap-4 px-5 py-4 bg-white border border-[#18181B] rounded-none',
              'shadow-[4px_4px_0px_0px_#18181B] animate-slide-right',
            )}
            data-testid={`toast-${t.type}`}
          >
            <Icon 
              size={24} 
              weight="fill" 
              className={cn('shrink-0', ICON_COLORS[t.type])} 
            />
            <p className="text-sm font-bold text-[#09090B] flex-1 pt-0.5 leading-snug">
              {t.message}
            </p>
            <button
              onClick={() => dismiss(t.id)}
              data-testid="toast-dismiss-btn"
              className="text-[#71717A] hover:text-[#18181B] shrink-0 transition-colors pt-0.5"
            >
              <X size={16} weight="bold" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
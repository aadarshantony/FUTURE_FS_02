import { useEffect, useState } from 'react';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';
import { cn } from '../../utils/helpers';

const ICONS = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
};

const STYLES = {
  success: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300',
  error: 'border-red-500/40 bg-red-500/10 text-red-300',
  warning: 'border-amber-500/40 bg-amber-500/10 text-amber-300',
  info: 'border-blue-500/40 bg-blue-500/10 text-blue-300',
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
    <div className="fixed bottom-5 right-5 z-[100] flex flex-col gap-2 max-w-sm w-full">
      {toasts.map((t) => {
        const Icon = ICONS[t.type];
        return (
          <div
            key={t.id}
            className={cn(
              'flex items-start gap-3 px-4 py-3 rounded-[12px] border',
              'shadow-lg backdrop-blur-md animate-slide-right',
              'bg-[#0D1117]/95',
              STYLES[t.type]
            )}
          >
            <Icon size={16} className="mt-0.5 shrink-0" />
            <p className="text-sm font-sans flex-1 leading-snug">{t.message}</p>
            <button onClick={() => dismiss(t.id)} className="opacity-60 hover:opacity-100 shrink-0">
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
}

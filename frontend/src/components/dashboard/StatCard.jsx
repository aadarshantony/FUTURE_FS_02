import { cn } from '../../utils/helpers';

export function StatCard({ icon: Icon, label, value, sub, color = 'emerald', trend }) {
  const colorMap = {
    emerald: {
      icon: 'text-emerald-400 bg-emerald-500/10',
      glow: 'shadow-emerald-500/10',
      border: 'hover:border-emerald-500/30',
      gradient: 'from-emerald-500/5 to-transparent',
    },
    blue: {
      icon: 'text-blue-400 bg-blue-500/10',
      glow: 'shadow-blue-500/10',
      border: 'hover:border-blue-500/30',
      gradient: 'from-blue-500/5 to-transparent',
    },
    violet: {
      icon: 'text-violet-400 bg-violet-500/10',
      glow: 'shadow-violet-500/10',
      border: 'hover:border-violet-500/30',
      gradient: 'from-violet-500/5 to-transparent',
    },
    amber: {
      icon: 'text-amber-400 bg-amber-500/10',
      glow: 'shadow-amber-500/10',
      border: 'hover:border-amber-500/30',
      gradient: 'from-amber-500/5 to-transparent',
    },
    red: {
      icon: 'text-red-400 bg-red-500/10',
      glow: 'shadow-red-500/10',
      border: 'hover:border-red-500/30',
      gradient: 'from-red-500/5 to-transparent',
    },
  };

  const c = colorMap[color] || colorMap.emerald;

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-[14px] border border-[#1E2D45] bg-[#111827]',
        'p-5 transition-all duration-300',
        'hover:shadow-xl hover:-translate-y-0.5 cursor-default',
        c.glow && `shadow-lg ${c.glow}`,
        c.border,
      )}
    >
      {/* Gradient accent */}
      <div className={cn('absolute top-0 right-0 w-32 h-32 rounded-full -translate-y-1/2 translate-x-1/2 bg-gradient-to-br opacity-40', c.gradient)} />

      <div className="flex items-start justify-between relative">
        <div>
          <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-2">{label}</p>
          <p className="text-3xl font-bold text-white font-sans tracking-tight">{value}</p>
          {sub && <p className="text-xs text-slate-500 mt-1 font-mono">{sub}</p>}
        </div>
        <div className={cn('w-10 h-10 rounded-[10px] flex items-center justify-center shrink-0', c.icon)}>
          <Icon size={18} strokeWidth={2} />
        </div>
      </div>

      {trend != null && (
        <div className="mt-3 flex items-center gap-1.5">
          <div className={cn(
            'text-xs font-mono font-medium',
            trend >= 0 ? 'text-emerald-400' : 'text-red-400'
          )}>
            {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}%
          </div>
          <span className="text-xs text-slate-600 font-mono">vs last month</span>
        </div>
      )}
    </div>
  );
}

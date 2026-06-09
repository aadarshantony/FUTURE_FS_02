import { cn } from '../../utils/helpers';

export function StatCard({ icon: Icon, label, value, sub, color = 'zinc', trend }) {
  const colorMap = {
    primary: {
      icon: 'text-white',
      iconBg: 'bg-[#FF4500] border border-[#FF4500]',
    },
    success: {
      icon: 'text-white',
      iconBg: 'bg-[#10B981] border border-[#10B981]',
    },
    danger: {
      icon: 'text-white',
      iconBg: 'bg-[#EF4444] border border-[#EF4444]',
    },
    warning: {
      icon: 'text-white',
      iconBg: 'bg-[#F59E0B] border border-[#F59E0B]',
    },
    zinc: {
      icon: 'text-[#09090B]',
      iconBg: 'bg-[#F4F4F5] border border-[#E4E4E7]',
    },
    // Legacy mapping support
    emerald: {
      icon: 'text-white',
      iconBg: 'bg-[#10B981] border border-[#10B981]',
    },
    blue: {
      icon: 'text-white',
      iconBg: 'bg-[#3B82F6] border border-[#3B82F6]',
    },
    violet: {
      icon: 'text-white',
      iconBg: 'bg-[#8B5CF6] border border-[#8B5CF6]',
    },
    amber: {
      icon: 'text-white',
      iconBg: 'bg-[#F59E0B] border border-[#F59E0B]',
    },
    red: {
      icon: 'text-white',
      iconBg: 'bg-[#EF4444] border border-[#EF4444]',
    },
  };

  const c = colorMap[color] || colorMap.zinc;

  return (
    <div
      className="relative bg-white border border-[#E4E4E7] p-6 lg:p-8 rounded-none transition-all duration-200 hover:border-[#18181B] hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_#18181B] group cursor-default font-['Manrope',sans-serif]"
    >
      {/* Top row */}
      <div className="flex items-start justify-between mb-6 lg:mb-8">
        <div className={cn('w-12 h-12 flex items-center justify-center shrink-0 rounded-none', c.iconBg)}>
          {Icon && <Icon size={24} weight="bold" className={c.icon} />}
        </div>
        {trend != null && (
          <div className={cn(
            'text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-none border',
            trend >= 0 
              ? 'text-[#10B981] bg-[#10B981]/10 border-[#10B981]/20' 
              : 'text-[#EF4444] bg-[#EF4444]/10 border-[#EF4444]/20'
          )}>
            {trend >= 0 ? '+' : ''}{trend}%
          </div>
        )}
      </div>

      {/* Value */}
      <p className="text-3xl md:text-4xl font-['Outfit',sans-serif] font-black text-[#09090B] tracking-tighter leading-none mb-2">
        {value}
      </p>

      {/* Label */}
      <p className="text-[10px] text-[#71717A] font-bold uppercase tracking-[0.2em]">
        {label}
      </p>

      {/* Sub */}
      {sub && (
        <p className="text-[10px] text-[#09090B] font-bold uppercase tracking-[0.1em] mt-4 pt-4 border-t border-[#E4E4E7]">
          {sub}
        </p>
      )}
    </div>
  );
}
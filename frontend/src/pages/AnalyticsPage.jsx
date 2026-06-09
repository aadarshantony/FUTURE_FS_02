import { CurrencyDollar, TrendUp, Target, Users, ChartBar } from '@phosphor-icons/react';
import { analyticsService } from '../services/analytics.service';
import { useFetch } from '../hooks/useFetch';
import { StatCard } from '../components/dashboard/StatCard';
import {
  MonthlyGrowthChart,
  StatusDistributionChart,
  SourceBarChart,
} from '../components/analytics/Charts';
import { SkeletonStats, SkeletonCard } from '../components/ui/Skeleton';
import { formatCurrency } from '../utils/helpers';

function RevenueCard({ revenue, loading }) {
  if (loading) return <SkeletonStats />;
  return (
    <div className="bg-white border border-[#E4E4E7] p-6 lg:p-8 rounded-none hover:border-[#18181B] transition-colors" data-testid="revenue-overview-card">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-[#FF4500] flex items-center justify-center shrink-0">
          <CurrencyDollar size={24} weight="bold" className="text-white" />
        </div>
        <div>
          <h2 className="text-xl font-['Outfit',sans-serif] font-black tracking-tight text-[#09090B] uppercase">Revenue Overview</h2>
          <p className="text-[10px] text-[#71717A] font-bold tracking-[0.2em] uppercase mt-1">Converted leads only</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
        {[
          { label: 'Total Revenue', value: formatCurrency(revenue?.totalRevenue), color: 'text-[#09090B]' },
          { label: 'Closed Deals', value: revenue?.deals ?? 0, color: 'text-[#09090B]' },
          { label: 'Avg Deal Size', value: formatCurrency(revenue?.averageDealValue), color: 'text-[#09090B]' },
        ].map(({ label, value, color }) => (
          <div key={label} className="p-6 bg-[#F4F4F5] border border-[#E4E4E7] hover:border-[#18181B] transition-colors rounded-none">
            <p className={`text-3xl md:text-4xl font-['Outfit',sans-serif] font-black ${color} tracking-tighter`}>{value}</p>
            <p className="text-[10px] text-[#71717A] font-bold uppercase tracking-[0.2em] mt-2">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AnalyticsPage() {
  const { data: analytics, loading: analyticsLoading } = useFetch(analyticsService.getDashboard);
  const { data: revenue, loading: revenueLoading } = useFetch(analyticsService.getRevenue);

  const overview = analytics?.overview || {};

  return (
    <div className="space-y-6 font-['Manrope',sans-serif] text-[#09090B] animate-fade-in" data-testid="analytics-page">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {analyticsLoading ? (
          Array(4).fill(0).map((_, i) => <SkeletonStats key={i} />)
        ) : (
          <>
            <StatCard icon={Users} label="Total Leads" value={overview.totalLeads ?? 0} color="zinc" />
            <StatCard icon={Target} label="Converted" value={overview.convertedLeads ?? 0} sub={`${overview.conversionRate ?? 0}% rate`} color="success" />
            <StatCard icon={TrendUp} label="Lost" value={overview.lostLeads ?? 0} color="danger" />
            <StatCard icon={ChartBar} label="Conversion Rate" value={`${overview.conversionRate ?? 0}%`} color="primary" />
          </>
        )}
      </div>

      {/* Revenue */}
      <RevenueCard revenue={revenue} loading={revenueLoading} />

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {analyticsLoading ? (
          Array(4).fill(0).map((_, i) => <SkeletonCard key={i} className="rounded-none" />)
        ) : (
          <>
            <div className="border border-[#E4E4E7] bg-white rounded-none p-4 hover:border-[#18181B] transition-colors">
              <MonthlyGrowthChart data={analytics?.monthlyGrowth} />
            </div>
            <div className="border border-[#E4E4E7] bg-white rounded-none p-4 hover:border-[#18181B] transition-colors">
              <StatusDistributionChart data={analytics?.statusStats} />
            </div>
            <div className="lg:col-span-2 border border-[#E4E4E7] bg-white rounded-none p-4 hover:border-[#18181B] transition-colors">
              <SourceBarChart data={analytics?.sourceStats} />
            </div>
          </>
        )}
      </div>

      {/* Status table */}
      {!analyticsLoading && analytics?.statusStats && (
        <div className="bg-white border border-[#E4E4E7] rounded-none hover:border-[#18181B] transition-colors">
          <div className="px-6 py-5 border-b border-[#E4E4E7]">
            <h3 className="text-sm font-['Outfit',sans-serif] font-black uppercase tracking-widest text-[#09090B]">Status Breakdown</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#E4E4E7] bg-[#F4F4F5]">
                  {['Status', 'Count', 'Share'].map((h) => (
                    <th key={h} className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-[0.2em] text-[#71717A]">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {analytics.statusStats.map((s) => {
                  const total = overview.totalLeads || 1;
                  const pct = ((s.count / total) * 100).toFixed(1);
                  return (
                    <tr key={s._id} className="border-b border-[#E4E4E7] last:border-0 hover:bg-[#F4F4F5] transition-colors">
                      <td className="px-6 py-4 text-sm font-bold text-[#09090B] uppercase tracking-wider">
                        {s._id.replace(/_/g, ' ')}
                      </td>
                      <td className="px-6 py-4 text-sm font-['Outfit',sans-serif] font-black text-[#09090B]">{s.count}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="flex-1 h-2 bg-[#E4E4E7] rounded-none overflow-hidden max-w-[150px]">
                            <div
                              className="h-full bg-[#FF4500] rounded-none"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                          <span className="text-xs font-bold text-[#71717A] w-12 shrink-0">{pct}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
import { DollarSign, TrendingUp, Target, Users, BarChart3 } from 'lucide-react';
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
import { Card, CardHeader, CardTitle, CardBody } from '../components/ui/Card';

function RevenueCard({ revenue, loading }) {
  if (loading) return <SkeletonStats />;
  return (
    <Card glow>
      <CardBody className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-[9px] bg-amber-500/10 flex items-center justify-center">
            <DollarSign size={16} className="text-amber-400" />
          </div>
          <p className="text-xs font-mono text-slate-500 uppercase tracking-widest">Revenue Overview</p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Total Revenue', value: formatCurrency(revenue?.totalRevenue), color: 'text-emerald-400' },
            { label: 'Closed Deals', value: revenue?.deals ?? 0, color: 'text-blue-400' },
            { label: 'Avg Deal Size', value: formatCurrency(revenue?.averageDealValue), color: 'text-amber-400' },
          ].map(({ label, value, color }) => (
            <div key={label} className="text-center p-3 rounded-[10px] bg-[#161D2E] border border-[#1E2D45]">
              <p className={`text-xl font-bold ${color} font-sans`}>{value}</p>
              <p className="text-[10px] font-mono text-slate-600 mt-0.5 uppercase tracking-wider">{label}</p>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}

export default function AnalyticsPage() {
  const { data: analytics, loading: analyticsLoading } = useFetch(analyticsService.getDashboard);
  const { data: revenue, loading: revenueLoading } = useFetch(analyticsService.getRevenue);

  const overview = analytics?.overview || {};

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {analyticsLoading ? (
          Array(4).fill(0).map((_, i) => <SkeletonStats key={i} />)
        ) : (
          <>
            <StatCard icon={Users} label="Total Leads" value={overview.totalLeads ?? 0} color="blue" />
            <StatCard icon={Target} label="Converted" value={overview.convertedLeads ?? 0} sub={`${overview.conversionRate ?? 0}% rate`} color="emerald" />
            <StatCard icon={TrendingUp} label="Lost" value={overview.lostLeads ?? 0} color="red" />
            <StatCard
              icon={BarChart3}
              label="Conversion Rate"
              value={`${overview.conversionRate ?? 0}%`}
              color="violet"
            />
          </>
        )}
      </div>

      {/* Revenue */}
      <RevenueCard revenue={revenue} loading={revenueLoading} />

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {analyticsLoading ? (
          Array(4).fill(0).map((_, i) => <SkeletonCard key={i} />)
        ) : (
          <>
            <MonthlyGrowthChart data={analytics?.monthlyGrowth} />
            <StatusDistributionChart data={analytics?.statusStats} />
            <div className="lg:col-span-2">
              <SourceBarChart data={analytics?.sourceStats} />
            </div>
          </>
        )}
      </div>

      {/* Status table */}
      {!analyticsLoading && analytics?.statusStats && (
        <Card>
          <CardHeader>
            <CardTitle>Status Breakdown</CardTitle>
          </CardHeader>
          <CardBody className="p-0">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1E2D45]">
                  {['Status', 'Count', 'Share'].map((h) => (
                    <th key={h} className="px-5 py-3 text-left text-[10px] font-mono text-slate-600 uppercase tracking-widest">
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
                    <tr key={s._id} className="border-b border-[#1E2D45] last:border-0 hover:bg-white/2 transition-colors">
                      <td className="px-5 py-3 text-sm text-slate-300 font-mono capitalize">
                        {s._id.replace(/_/g, ' ')}
                      </td>
                      <td className="px-5 py-3 text-sm font-bold text-white">{s.count}</td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-1.5 bg-[#1E2D45] rounded-full overflow-hidden max-w-32">
                            <div
                              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                          <span className="text-xs font-mono text-slate-500">{pct}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </CardBody>
        </Card>
      )}
    </div>
  );
}

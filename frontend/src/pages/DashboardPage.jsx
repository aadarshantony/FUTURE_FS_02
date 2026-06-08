import { Link } from 'react-router-dom';
import {
  Users, TrendingUp, DollarSign, Target,
  ArrowRight, Clock,
} from 'lucide-react';
import { analyticsService } from '../services/analytics.service';
import { leadsService } from '../services/leads.service';
import { activitiesService } from '../services/activities.service';
import { useFetch } from '../hooks/useFetch';
import { StatCard } from '../components/dashboard/StatCard';
import { MonthlyGrowthChart, StatusDistributionChart } from '../components/analytics/Charts';
import { SkeletonStats, SkeletonCard } from '../components/ui/Skeleton';
import { StatusBadge } from '../components/ui/Badge';
import { Avatar } from '../components/ui/Avatar';
import { formatCurrency, formatRelativeTime } from '../utils/helpers';
import { ACTIVITY_ACTION_CONFIG } from '../utils/constants';

function RecentActivityItem({ activity }) {
  const config = ACTIVITY_ACTION_CONFIG[activity.action] || { label: activity.action, color: 'text-slate-400' };
  return (
    <div className="flex items-start gap-3 py-3 border-b border-[#1E2D45] last:border-0">
      <div className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 mt-0.5">
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-slate-300 leading-snug">{activity.description}</p>
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className={`text-[10px] font-mono ${config.color}`}>{config.label}</span>
          <span className="text-[10px] text-slate-700">·</span>
          <span className="text-[10px] text-slate-600 font-mono">{formatRelativeTime(activity.createdAt)}</span>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { data: analytics, loading: analyticsLoading } = useFetch(analyticsService.getDashboard);
  const { data: revenue, loading: revenueLoading } = useFetch(analyticsService.getRevenue);
  const { data: leadsData, loading: leadsLoading } = useFetch(() =>
    leadsService.getAll({ limit: 5, sortBy: 'createdAt', sortOrder: 'desc' })
  );
  const { data: activities, loading: activitiesLoading } = useFetch(activitiesService.getRecent);

  const overview = analytics?.overview || {};
  const recentLeads = leadsData?.leads || [];
  const recentActivities = (activities || []).slice(0, 8);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {analyticsLoading || revenueLoading ? (
          Array(4).fill(0).map((_, i) => <SkeletonStats key={i} />)
        ) : (
          <>
            <StatCard
              icon={Users}
              label="Total Leads"
              value={overview.totalLeads ?? 0}
              sub="All time"
              color="blue"
            />
            <StatCard
              icon={Target}
              label="Converted"
              value={overview.convertedLeads ?? 0}
              sub={`${overview.conversionRate ?? 0}% rate`}
              color="emerald"
            />
            <StatCard
              icon={TrendingUp}
              label="Lost Leads"
              value={overview.lostLeads ?? 0}
              sub="Need attention"
              color="red"
            />
            <StatCard
              icon={DollarSign}
              label="Total Revenue"
              value={formatCurrency(revenue?.totalRevenue)}
              sub={`${revenue?.deals ?? 0} closed deals`}
              color="amber"
            />
          </>
        )}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          {analyticsLoading ? <SkeletonCard /> : <MonthlyGrowthChart data={analytics?.monthlyGrowth} />}
        </div>
        <div>
          {analyticsLoading ? <SkeletonCard /> : <StatusDistributionChart data={analytics?.statusStats} />}
        </div>
      </div>

      {/* Recent Leads + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Recent Leads */}
        <div className="lg:col-span-2 bg-[#111827] border border-[#1E2D45] rounded-[14px]">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#1E2D45]">
            <h3 className="text-sm font-semibold text-slate-100">Recent Leads</h3>
            <Link
              to="/leads"
              className="flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300 font-mono transition-colors"
            >
              View all <ArrowRight size={12} />
            </Link>
          </div>
          <div className="p-2">
            {leadsLoading ? (
              <div className="p-4 space-y-3">{Array(4).fill(0).map((_, i) => <SkeletonCard key={i} className="h-12" />)}</div>
            ) : recentLeads.length === 0 ? (
              <p className="text-center text-slate-600 text-sm font-mono py-8">No leads yet</p>
            ) : (
              recentLeads.map((lead) => (
                <div
                  key={lead._id}
                  className="flex items-center gap-3 px-3 py-3 rounded-[10px] hover:bg-white/3 transition-colors"
                >
                  <Avatar name={lead.fullName} size="sm" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-200 truncate">{lead.fullName}</p>
                    <p className="text-xs text-slate-600 font-mono truncate">{lead.company || lead.email}</p>
                  </div>
                  <StatusBadge status={lead.status} />
                  {lead.dealValue > 0 && (
                    <span className="text-xs font-mono text-emerald-400 font-medium shrink-0">
                      {formatCurrency(lead.dealValue)}
                    </span>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-[#111827] border border-[#1E2D45] rounded-[14px]">
          <div className="flex items-center gap-2 px-5 py-4 border-b border-[#1E2D45]">
            <Clock size={14} className="text-emerald-400" />
            <h3 className="text-sm font-semibold text-slate-100">Recent Activity</h3>
          </div>
          <div className="px-5 py-2 max-h-80 overflow-y-auto">
            {activitiesLoading ? (
              <div className="space-y-3 py-3">{Array(4).fill(0).map((_, i) => <div key={i} className="skeleton h-10" />)}</div>
            ) : recentActivities.length === 0 ? (
              <p className="text-center text-slate-600 text-sm font-mono py-8">No activity yet</p>
            ) : (
              recentActivities.map((a) => <RecentActivityItem key={a._id} activity={a} />)
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

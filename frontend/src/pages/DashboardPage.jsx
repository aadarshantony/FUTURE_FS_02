import { Link } from 'react-router-dom';
import {
  Users, TrendUp, CurrencyDollar, Target,
  ArrowRight, Clock,
} from '@phosphor-icons/react';
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
  const config = ACTIVITY_ACTION_CONFIG[activity.action] || { label: activity.action, color: 'text-[#71717A]' };
  return (
    <div 
      className="flex items-start gap-4 py-4 border-b border-[#E4E4E7] last:border-0 hover:bg-[#F4F4F5] transition-colors"
      data-testid={`activity-item-${activity._id}`}
    >
      <div className="w-2.5 h-2.5 rounded-none bg-[#FF4500] mt-1 shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-[#09090B] leading-snug">{activity.description}</p>
        <div className="flex items-center gap-2 mt-1.5">
          <span className={`text-[10px] uppercase font-bold tracking-[0.2em] ${config.color}`}>{config.label}</span>
          <span className="text-[10px] text-[#E4E4E7] font-bold">/</span>
          <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#71717A]">{formatRelativeTime(activity.createdAt)}</span>
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
    <div className="space-y-6 font-['Manrope',sans-serif] animate-fade-in" data-testid="dashboard-page">
      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {analyticsLoading || revenueLoading ? (
          Array(4).fill(0).map((_, i) => <SkeletonStats key={i} />)
        ) : (
          <>
            <StatCard
              icon={Users}
              label="Total Leads"
              value={overview.totalLeads ?? 0}
              sub="All time"
              color="zinc"
              data-testid="stat-card-total-leads"
            />
            <StatCard
              icon={Target}
              label="Converted"
              value={overview.convertedLeads ?? 0}
              sub={`${overview.conversionRate ?? 0}% rate`}
              color="success"
              data-testid="stat-card-converted"
            />
            <StatCard
              icon={TrendUp}
              label="Lost Leads"
              value={overview.lostLeads ?? 0}
              sub="Need attention"
              color="danger"
              data-testid="stat-card-lost-leads"
            />
            <StatCard
              icon={CurrencyDollar}
              label="Total Revenue"
              value={formatCurrency(revenue?.totalRevenue)}
              sub={`${revenue?.deals ?? 0} closed deals`}
              color="primary"
              data-testid="stat-card-revenue"
            />
          </>
        )}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2" data-testid="monthly-growth-chart-container">
          {analyticsLoading ? <SkeletonCard /> : <MonthlyGrowthChart data={analytics?.monthlyGrowth} />}
        </div>
        <div data-testid="status-distribution-chart-container">
          {analyticsLoading ? <SkeletonCard /> : <StatusDistributionChart data={analytics?.statusStats} />}
        </div>
      </div>

      {/* Recent Leads + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Leads */}
        <div className="lg:col-span-2 bg-white border border-[#E4E4E7] rounded-none hover:border-[#18181B] transition-colors" data-testid="recent-leads-section">
          <div className="flex items-center justify-between px-6 py-5 border-b border-[#E4E4E7]">
            <h3 className="text-sm font-['Outfit',sans-serif] font-black uppercase tracking-widest text-[#09090B]">Recent Leads</h3>
            <Link
              to="/leads"
              className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] font-bold text-[#FF4500] hover:text-[#E03C00] transition-colors"
              data-testid="view-all-leads-link"
            >
              View all <ArrowRight size={14} weight="bold" />
            </Link>
          </div>
          <div className="p-0">
            {leadsLoading ? (
              <div className="p-6 space-y-4">{Array(4).fill(0).map((_, i) => <SkeletonCard key={i} className="h-16 rounded-none" />)}</div>
            ) : recentLeads.length === 0 ? (
              <p className="text-center text-[#71717A] text-sm font-bold py-12" data-testid="no-leads-message">No leads yet</p>
            ) : (
              recentLeads.map((lead) => (
                <div
                  key={lead._id}
                  className="flex items-center gap-4 px-6 py-4 border-b border-[#E4E4E7] last:border-0 hover:bg-[#F4F4F5] transition-colors"
                  data-testid={`recent-lead-item-${lead._id}`}
                >
                  <Avatar name={lead.fullName} size="sm" className="rounded-none border border-[#18181B]" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-[#09090B] truncate">{lead.fullName}</p>
                    <p className="text-[10px] text-[#71717A] font-bold uppercase tracking-[0.1em] truncate mt-0.5">{lead.company || lead.email}</p>
                  </div>
                  <StatusBadge status={lead.status} />
                  {lead.dealValue > 0 && (
                    <span className="text-sm font-['Outfit',sans-serif] font-black text-[#FF4500] shrink-0">
                      {formatCurrency(lead.dealValue)}
                    </span>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-white border border-[#E4E4E7] rounded-none hover:border-[#18181B] transition-colors" data-testid="recent-activity-section">
          <div className="flex items-center gap-3 px-6 py-5 border-b border-[#E4E4E7]">
            <Clock size={18} weight="bold" className="text-[#FF4500]" />
            <h3 className="text-sm font-['Outfit',sans-serif] font-black uppercase tracking-widest text-[#09090B]">Recent Activity</h3>
          </div>
          <div className="px-6 py-2 max-h-[400px] overflow-y-auto">
            {activitiesLoading ? (
              <div className="space-y-4 py-4">{Array(4).fill(0).map((_, i) => <div key={i} className="h-14 bg-[#F4F4F5] animate-pulse" />)}</div>
            ) : recentActivities.length === 0 ? (
              <p className="text-center text-[#71717A] text-sm font-bold py-12" data-testid="no-activity-message">No activity yet</p>
            ) : (
              recentActivities.map((a) => <RecentActivityItem key={a._id} activity={a} />)
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
import { Activity, GitCommit } from 'lucide-react';
import { activitiesService } from '../services/activities.service';
import { useFetch } from '../hooks/useFetch';
import { Skeleton } from '../components/ui/Skeleton';
import { formatRelativeTime, formatDate } from '../utils/helpers';
import { ACTIVITY_ACTION_CONFIG } from '../utils/constants';

const COLOR_MAP = {
  lead_created: 'bg-emerald-500',
  lead_updated: 'bg-blue-500',
  lead_deleted: 'bg-red-500',
  status_changed: 'bg-amber-500',
  note_added: 'bg-violet-500',
  assigned: 'bg-pink-500',
};

function ActivityTimelineItem({ activity, isLast }) {
  const config = ACTIVITY_ACTION_CONFIG[activity.action] || { label: activity.action, color: 'text-slate-400' };
  const dotColor = COLOR_MAP[activity.action] || 'bg-slate-500';

  return (
    <div className="flex gap-4">
      {/* Timeline line */}
      <div className="flex flex-col items-center">
        <div className={`w-2.5 h-2.5 rounded-full mt-1 shrink-0 shadow-sm ${dotColor}`} />
        {!isLast && <div className="w-px flex-1 bg-[#1E2D45] mt-1.5" />}
      </div>

      {/* Content */}
      <div className="flex-1 pb-5">
        <div className="bg-[#111827] border border-[#1E2D45] rounded-[12px] px-4 py-3 hover:border-[#243352] transition-colors">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <p className="text-sm text-slate-200 leading-snug">{activity.description}</p>
              {activity.metadata && Object.keys(activity.metadata).length > 0 && (
                <div className="flex gap-2 flex-wrap mt-1.5">
                  {activity.metadata.oldStatus && (
                    <span className="text-[10px] font-mono text-slate-600 bg-[#161D2E] px-2 py-0.5 rounded-full border border-[#1E2D45]">
                      {activity.metadata.oldStatus} → {activity.metadata.newStatus}
                    </span>
                  )}
                </div>
              )}
            </div>
            <span className="text-[10px] font-mono text-slate-600 shrink-0 mt-0.5">
              {formatRelativeTime(activity.createdAt)}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span className={`text-[10px] font-mono font-medium ${config.color}`}>{config.label}</span>
            {activity.lead && (
              <>
                <span className="text-[10px] text-slate-700">·</span>
                <span className="text-[10px] text-slate-600 font-mono">
                  Lead: {activity.lead?.fullName || activity.lead}
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ActivityPage() {
  const { data: activities, loading } = useFetch(activitiesService.getRecent);

  // Group by date
  const grouped = {};
  (activities || []).forEach((a) => {
    const key = formatDate(a.createdAt);
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(a);
  });
  const groupKeys = Object.keys(grouped);

  return (
    <div className="max-w-2xl space-y-6 animate-fade-in">
      {/* Header summary */}
      <div className="flex items-center gap-3 p-4 bg-[#111827] border border-[#1E2D45] rounded-[14px]">
        <div className="w-9 h-9 rounded-[10px] bg-emerald-500/10 flex items-center justify-center">
          <Activity size={18} className="text-emerald-400" />
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-100">Activity Timeline</p>
          <p className="text-xs text-slate-600 font-mono">
            {activities ? `${activities.length} recent events` : 'Loading...'}
          </p>
        </div>
      </div>

      {loading ? (
        <div className="space-y-4">
          {Array(6).fill(0).map((_, i) => (
            <div key={i} className="flex gap-4">
              <div className="flex flex-col items-center">
                <Skeleton className="w-2.5 h-2.5 rounded-full" />
                <Skeleton className="w-px h-16 mt-1" />
              </div>
              <Skeleton className="flex-1 h-20 mb-5" />
            </div>
          ))}
        </div>
      ) : groupKeys.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-12 h-12 rounded-full bg-[#111827] border border-[#1E2D45] flex items-center justify-center mx-auto mb-3">
            <GitCommit size={20} className="text-slate-600" />
          </div>
          <p className="text-slate-600 text-sm font-mono">No activity recorded yet</p>
        </div>
      ) : (
        <div>
          {groupKeys.map((date) => (
            <div key={date} className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px flex-1 bg-[#1E2D45]" />
                <span className="text-[10px] font-mono font-medium text-slate-600 uppercase tracking-wider px-2">
                  {date}
                </span>
                <div className="h-px flex-1 bg-[#1E2D45]" />
              </div>
              {grouped[date].map((activity, i) => (
                <ActivityTimelineItem
                  key={activity._id}
                  activity={activity}
                  isLast={i === grouped[date].length - 1 && date === groupKeys[groupKeys.length - 1]}
                />
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

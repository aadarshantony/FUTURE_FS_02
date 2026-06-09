import { PulseIcon, GitCommit } from '@phosphor-icons/react';
import { activitiesService } from '../services/activities.service';
import { useFetch } from '../hooks/useFetch';
import { Skeleton } from '../components/ui/Skeleton';
import { formatRelativeTime, formatDate } from '../utils/helpers';
import { ACTIVITY_ACTION_CONFIG } from '../utils/constants';

const DOT_COLORS = {
  lead_created: 'bg-[#10B981]',
  lead_updated: 'bg-[#3B82F6]',
  lead_deleted: 'bg-[#EF4444]',
  status_changed: 'bg-[#F59E0B]',
  note_added: 'bg-[#FF4500]',
  assigned: 'bg-[#18181B]',
};

function ActivityTimelineItem({ activity, isLast }) {
  const config = ACTIVITY_ACTION_CONFIG[activity.action] || { label: activity.action, color: 'text-[#71717A]' };
  const dotColor = DOT_COLORS[activity.action] || 'bg-[#18181B]';

  return (
    <div className="flex gap-6">
      {/* Timeline line */}
      <div className="flex flex-col items-center">
        <div className={`w-3 h-3 rounded-none mt-1.5 shrink-0 ${dotColor}`} />
        {!isLast && <div className="w-px flex-1 bg-[#E4E4E7] mt-2" />}
      </div>

      {/* Content */}
      <div className="flex-1 pb-8">
        <div
          className="bg-white border border-[#E4E4E7] rounded-none px-6 py-5 transition-colors hover:border-[#18181B] shadow-sm hover:shadow-[4px_4px_0px_0px_#18181B]"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <p className="text-sm font-bold text-[#09090B] leading-snug">{activity.description}</p>
              {activity.metadata && Object.keys(activity.metadata).length > 0 && (
                <div className="flex gap-2 flex-wrap mt-3">
                  {activity.metadata.oldStatus && (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#09090B] bg-[#F4F4F5] px-3 py-1.5 rounded-none border border-[#E4E4E7]">
                      {activity.metadata.oldStatus.replace(/_/g, ' ')} → {activity.metadata.newStatus.replace(/_/g, ' ')}
                    </span>
                  )}
                </div>
              )}
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#71717A] shrink-0 mt-1">
              {formatRelativeTime(activity.createdAt)}
            </span>
          </div>
          <div className="flex items-center gap-3 mt-4 pt-4 border-t border-[#E4E4E7]">
            <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${config.color}`}>{config.label}</span>
            {activity.lead && (
              <>
                <span className="text-[10px] text-[#E4E4E7] font-bold">/</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#09090B]">
                  {activity.lead?.fullName || activity.lead}
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

  const grouped = {};
  (activities || []).forEach((a) => {
    const key = formatDate(a.createdAt);
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(a);
  });
  const groupKeys = Object.keys(grouped);

  return (
    <div className="w-full max-w-3xl mx-auto space-y-8 font-['Manrope',sans-serif] text-[#09090B] animate-fade-in" data-testid="activity-page">
      {/* Header */}
      <div className="flex items-center gap-5 p-6 bg-white border border-[#E4E4E7] rounded-none shadow-[4px_4px_0px_0px_#E4E4E7]">
        <div className="w-12 h-12 bg-[#FF4500] flex items-center justify-center shrink-0">
          <PulseIcon size={24} weight="bold" className="text-white" />
        </div>
        <div>
          <h1 className="text-xl font-['Outfit',sans-serif] font-black uppercase tracking-widest text-[#09090B]">Activity Timeline</h1>
          <p className="text-[10px] text-[#71717A] font-bold uppercase tracking-[0.2em] mt-1">
            {activities ? `${activities.length} recent events` : 'Loading...'}
          </p>
        </div>
      </div>

      {loading ? (
        <div className="space-y-6">
          {Array(6).fill(0).map((_, i) => (
            <div key={i} className="flex gap-6">
              <div className="flex flex-col items-center">
                <Skeleton className="w-3 h-3 rounded-none" />
                <Skeleton className="w-px h-24 mt-2 rounded-none" />
              </div>
              <Skeleton className="flex-1 h-32 mb-8 rounded-none" />
            </div>
          ))}
        </div>
      ) : groupKeys.length === 0 ? (
        <div className="text-center py-24 bg-white border border-[#E4E4E7] rounded-none hover:border-[#18181B] transition-colors">
          <div className="w-16 h-16 bg-[#F4F4F5] border border-[#E4E4E7] rounded-none flex items-center justify-center mx-auto mb-6">
            <GitCommit size={28} weight="bold" className="text-[#18181B]" />
          </div>
          <p className="text-sm font-bold uppercase tracking-widest text-[#71717A]">No activity recorded yet</p>
        </div>
      ) : (
        <div className="pt-4">
          {groupKeys.map((date) => (
            <div key={date} className="mb-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px flex-1 bg-[#E4E4E7]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#09090B] px-2">
                  {date}
                </span>
                <div className="h-px flex-1 bg-[#E4E4E7]" />
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
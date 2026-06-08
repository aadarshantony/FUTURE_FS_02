import { useState } from 'react';
import {
  Phone, Mail, Building2, Globe, Pencil, Trash2,
  StickyNote, Clock, DollarSign, User, ChevronDown, ChevronUp, Send,
} from 'lucide-react';
import { useFetch } from '../../hooks/useFetch';
import { useMutation } from '../../hooks/useMutation';
import { activitiesService } from '../../services/activities.service';
import { leadsService } from '../../services/leads.service';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { StatusBadge, SourceBadge } from '../ui/Badge';
import { Avatar } from '../ui/Avatar';
import { Skeleton } from '../ui/Skeleton';
import { Textarea } from '../ui/Input';
import { formatCurrency, formatDate, formatRelativeTime } from '../../utils/helpers';
import { ACTIVITY_ACTION_CONFIG } from '../../utils/constants';
import { toast } from '../ui/Toast';

function ActivityItem({ activity }) {
  const config = ACTIVITY_ACTION_CONFIG[activity.action] || { label: activity.action, color: 'text-slate-400' };
  return (
    <div className="flex gap-3 py-3 border-b border-[#1E2D45] last:border-0">
      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-xs text-slate-300">{activity.description}</p>
        <div className="flex items-center gap-2 mt-0.5">
          <span className={`text-[10px] font-mono ${config.color}`}>{config.label}</span>
          <span className="text-[10px] text-slate-600">·</span>
          <span className="text-[10px] text-slate-600 font-mono">{formatRelativeTime(activity.createdAt)}</span>
        </div>
      </div>
    </div>
  );
}

export function LeadDetailModal({ open, onClose, lead, onEdit, onDelete }) {
  const [noteText, setNoteText] = useState('');
  const [showNotes, setShowNotes] = useState(false);

  const { data: activities, loading: actLoading, refetch: refetchActivities } = useFetch(
    () => lead?._id
      ? activitiesService.getByLead(lead._id)
      : Promise.resolve({ data: { data: [] } }),
    [lead?._id, open]
  );

  const { mutate: addNote, loading: addingNote } = useMutation((content) =>
    leadsService.addNote(lead._id, content)
  );

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!noteText.trim()) return;
    try {
      await addNote(noteText.trim());
      setNoteText('');
      toast.success('Note added');
      refetchActivities();
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (!lead) return null;

  return (
    <Modal open={open} onClose={onClose} title="Lead Details" size="lg">
      <div className="space-y-5">
        {/* Header */}
        <div className="flex items-start gap-4">
          <Avatar name={lead.fullName} size="lg" />
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-semibold text-white">{lead.fullName}</h2>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <StatusBadge status={lead.status} />
              <SourceBadge source={lead.source} />
            </div>
          </div>
          <div className="flex gap-2 shrink-0">
            <Button variant="secondary" size="sm" icon={Pencil} onClick={() => onEdit?.(lead)}>Edit</Button>
            <Button variant="danger" size="sm" icon={Trash2} onClick={() => onDelete?.(lead)}>Delete</Button>
          </div>
        </div>

        {/* Info grid */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: Mail, label: 'Email', value: lead.email },
            { icon: Phone, label: 'Phone', value: lead.phone || '—' },
            { icon: Building2, label: 'Company', value: lead.company || '—' },
            { icon: DollarSign, label: 'Deal Value', value: formatCurrency(lead.dealValue) },
            { icon: Clock, label: 'Created', value: formatDate(lead.createdAt) },
            { icon: User, label: 'Assigned To', value: lead.assignedTo?.name || 'Unassigned' },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-3 p-3 rounded-[10px] bg-[#161D2E] border border-[#1E2D45]">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
                <Icon size={13} className="text-emerald-400" />
              </div>
              <div>
                <p className="text-[10px] font-mono text-slate-600 uppercase tracking-wider">{label}</p>
                <p className="text-xs text-slate-200 font-medium">{value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Notes section */}
        <div className="border border-[#1E2D45] rounded-[12px] overflow-hidden">
          <button
            className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/3 transition-colors"
            onClick={() => setShowNotes(!showNotes)}
          >
            <div className="flex items-center gap-2">
              <StickyNote size={14} className="text-emerald-400" />
              <span className="text-sm font-medium text-slate-200">Notes ({lead.notes?.length || 0})</span>
            </div>
            {showNotes ? <ChevronUp size={14} className="text-slate-500" /> : <ChevronDown size={14} className="text-slate-500" />}
          </button>
          {showNotes && (
            <div className="border-t border-[#1E2D45] p-4 space-y-3">
              {lead.notes?.length === 0 && (
                <p className="text-xs text-slate-600 text-center py-2 font-mono">No notes yet</p>
              )}
              {lead.notes?.map((note, i) => (
                <div key={i} className="bg-[#161D2E] rounded-[8px] p-3 border border-[#1E2D45]">
                  <p className="text-xs text-slate-300 leading-relaxed">{note.content}</p>
                  <p className="text-[10px] text-slate-600 font-mono mt-1.5">{formatRelativeTime(note.createdAt)}</p>
                </div>
              ))}
              <form onSubmit={handleAddNote} className="flex gap-2 pt-1">
                <Textarea
                  placeholder="Add a note..."
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  rows={2}
                  className="flex-1"
                />
                <Button type="submit" size="sm" icon={Send} loading={addingNote} className="self-end">
                  Add
                </Button>
              </form>
            </div>
          )}
        </div>

        {/* Activity log */}
        <div>
          <p className="text-xs font-mono text-slate-600 uppercase tracking-wider mb-3">Activity Log</p>
          {actLoading ? (
            <div className="space-y-2">{[1, 2, 3].map((i) => <Skeleton key={i} className="h-10 w-full" />)}</div>
          ) : (
            <div className="max-h-48 overflow-y-auto">
              {activities?.length === 0 ? (
                <p className="text-xs text-slate-600 text-center py-3 font-mono">No activity yet</p>
              ) : (
                activities?.map((act) => <ActivityItem key={act._id} activity={act} />)
              )}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}

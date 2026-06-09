import { useState } from 'react';
import {
  Phone, Envelope, Buildings, Globe, PencilSimple, Trash,
  Note, Clock, CurrencyDollar, User, CaretDown, CaretUp, PaperPlaneRight,
} from '@phosphor-icons/react';
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
  const config = ACTIVITY_ACTION_CONFIG[activity.action] || { label: activity.action, color: 'text-[#71717A]' };
  return (
    <div className="flex gap-4 py-4 border-b border-[#E4E4E7] last:border-0 hover:bg-[#F4F4F5] transition-colors px-2">
      <div className="w-2.5 h-2.5 rounded-none bg-[#FF4500] mt-1 shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-[#09090B] leading-snug">{activity.description}</p>
        <div className="flex items-center gap-2 mt-1.5">
          <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${config.color}`}>{config.label}</span>
          <span className="text-[10px] text-[#E4E4E7] font-bold">/</span>
          <span className="text-[10px] text-[#71717A] font-bold uppercase tracking-[0.2em]">{formatRelativeTime(activity.createdAt)}</span>
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
      <div className="space-y-8 font-['Manrope',sans-serif] text-[#09090B]">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
          <Avatar name={lead.fullName} size="lg" className="border-2 border-[#18181B]" />
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl sm:text-3xl font-['Outfit',sans-serif] font-black uppercase tracking-tighter text-[#09090B] leading-none break-words">{lead.fullName}</h2>
            <div className="flex items-center gap-3 mt-3 sm:mt-4 flex-wrap">
              <StatusBadge status={lead.status} />
              <SourceBadge source={lead.source} />
            </div>
          </div>
          <div className="flex gap-2 sm:gap-3 shrink-0 w-full sm:w-auto">
            <Button variant="secondary" size="sm" icon={PencilSimple} onClick={() => onEdit?.(lead)} className="flex-1 sm:flex-none">Edit</Button>
            <Button variant="danger" size="sm" icon={Trash} onClick={() => onDelete?.(lead)} className="flex-1 sm:flex-none">Delete</Button>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-[#18181B] w-full" />

        {/* Info grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { icon: Envelope, label: 'Email', value: lead.email },
            { icon: Phone, label: 'Phone', value: lead.phone || '—' },
            { icon: Buildings, label: 'Company', value: lead.company || '—' },
            { icon: CurrencyDollar, label: 'Deal Value', value: formatCurrency(lead.dealValue) },
            { icon: Clock, label: 'Created', value: formatDate(lead.createdAt) },
            { icon: User, label: 'Assigned To', value: lead.assignedTo?.name || 'Unassigned' },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-4 p-5 bg-[#F4F4F5] border border-[#E4E4E7] rounded-none hover:border-[#18181B] transition-colors">
              <div className="w-10 h-10 bg-white border border-[#E4E4E7] flex items-center justify-center shrink-0">
                <Icon size={20} weight="duotone" className="text-[#FF4500]" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] text-[#71717A] font-bold uppercase tracking-[0.2em] mb-1">{label}</p>
                <p className="text-sm text-[#09090B] font-bold truncate">{value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Notes section */}
        <div className="border border-[#18181B] rounded-none bg-white shadow-[4px_4px_0px_0px_#18181B] overflow-hidden transition-all">
          <button
            className="w-full flex items-center justify-between px-6 py-5 hover:bg-[#F4F4F5] transition-colors"
            onClick={() => setShowNotes(!showNotes)}
          >
            <div className="flex items-center gap-3">
              <Note size={20} weight="bold" className="text-[#FF4500]" />
              <span className="text-sm font-['Outfit',sans-serif] font-black uppercase tracking-widest text-[#09090B]">Notes ({lead.notes?.length || 0})</span>
            </div>
            {showNotes ? <CaretUp size={16} weight="bold" className="text-[#18181B]" /> : <CaretDown size={16} weight="bold" className="text-[#18181B]" />}
          </button>
          {showNotes && (
            <div className="border-t border-[#18181B] p-6 space-y-4 bg-[#F4F4F5]">
              {lead.notes?.length === 0 && (
                <p className="text-xs text-[#71717A] font-bold uppercase tracking-widest text-center py-4">No notes yet</p>
              )}
              {lead.notes?.map((note, i) => (
                <div key={i} className="bg-white rounded-none p-5 border border-[#E4E4E7] hover:border-[#18181B] transition-colors">
                  <p className="text-sm text-[#09090B] font-bold leading-relaxed">{note.content}</p>
                  <p className="text-[10px] text-[#71717A] font-bold uppercase tracking-[0.2em] mt-3">{formatRelativeTime(note.createdAt)}</p>
                </div>
              ))}
              <form onSubmit={handleAddNote} className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
                <Textarea
                  placeholder="Add a new note..."
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  rows={2}
                  className="flex-1 bg-white border-[#18181B]"
                />
                <Button type="submit" size="md" icon={PaperPlaneRight} loading={addingNote} className="self-end shadow-[4px_4px_0px_0px_#18181B]">
                  Add Note
                </Button>
              </form>
            </div>
          )}
        </div>

        {/* Activity log */}
        <div className="pt-2">
          <p className="text-[10px] text-[#71717A] font-bold uppercase tracking-[0.2em] mb-4">Activity Log</p>
          {actLoading ? (
            <div className="space-y-4">{[1, 2, 3].map((i) => <Skeleton key={i} className="h-16 w-full rounded-none" />)}</div>
          ) : (
            <div className="max-h-64 overflow-y-auto border border-[#E4E4E7] bg-white">
              {activities?.length === 0 ? (
                <p className="text-xs text-[#71717A] font-bold uppercase tracking-widest text-center py-8">No activity yet</p>
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
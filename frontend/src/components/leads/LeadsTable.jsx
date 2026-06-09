import { Eye, PencilSimple, Trash, Buildings } from '@phosphor-icons/react';
import { StatusBadge, SourceBadge } from '../ui/Badge';
import { Avatar } from '../ui/Avatar';
import { formatCurrency, formatRelativeTime } from '../../utils/helpers';

/* ─── Desktop table row ───────────────────────────────────────────────────── */
export function LeadRow({ lead, onView, onEdit, onDelete }) {
  return (
    <tr className="border-b border-[#E4E4E7] last:border-0 hover:bg-[#F4F4F5] transition-colors group">
      {/* Name + avatar */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-4">
          <Avatar name={lead.fullName} size="sm" />
          <div>
            <button
              onClick={() => onView(lead)}
              className="text-sm font-bold text-[#09090B] hover:text-[#FF4500] transition-colors text-left leading-tight"
            >
              {lead.fullName}
            </button>
            <p className="text-[10px] text-[#71717A] font-bold uppercase tracking-[0.1em] mt-1">{lead.email}</p>
          </div>
        </div>
      </td>

      {/* Company */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-2 text-xs font-bold text-[#09090B] uppercase tracking-wider">
          {lead.company ? (
            <>
              <Buildings size={16} weight="duotone" className="text-[#71717A] shrink-0" />
              <span>{lead.company}</span>
            </>
          ) : (
            <span className="text-zinc-300">—</span>
          )}
        </div>
      </td>

      {/* Status */}
      <td className="px-6 py-4">
        <StatusBadge status={lead.status} />
      </td>

      {/* Source */}
      <td className="px-6 py-4">
        <SourceBadge source={lead.source} />
      </td>

      {/* Deal value */}
      <td className="px-6 py-4">
        {lead.dealValue > 0 ? (
          <span className="text-sm font-['Outfit',sans-serif] font-black text-[#09090B] tracking-tight">{formatCurrency(lead.dealValue)}</span>
        ) : (
          <span className="text-zinc-300 font-black">—</span>
        )}
      </td>

      {/* Age */}
      <td className="px-6 py-4">
        <span className="text-[10px] text-[#71717A] font-bold uppercase tracking-[0.2em]">{formatRelativeTime(lead.createdAt)}</span>
      </td>

      {/* Actions */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onView(lead)}
            className="p-2 border border-transparent hover:bg-white hover:border-[#18181B] hover:-translate-y-0.5 hover:shadow-[2px_2px_0px_0px_#18181B] text-[#71717A] hover:text-[#09090B] transition-all rounded-none"
            title="View details"
          >
            <Eye size={16} weight="bold" />
          </button>
          <button
            onClick={() => onEdit(lead)}
            className="p-2 border border-transparent hover:bg-white hover:border-[#18181B] hover:-translate-y-0.5 hover:shadow-[2px_2px_0px_0px_#18181B] text-[#71717A] hover:text-[#09090B] transition-all rounded-none"
            title="Edit"
          >
            <PencilSimple size={16} weight="bold" />
          </button>
          <button
            onClick={() => onDelete(lead)}
            className="p-2 border border-transparent hover:bg-white hover:border-[#18181B] hover:-translate-y-0.5 hover:shadow-[2px_2px_0px_0px_#18181B] text-[#71717A] hover:text-[#EF4444] transition-all rounded-none"
            title="Delete"
          >
            <Trash size={16} weight="bold" />
          </button>
        </div>
      </td>
    </tr>
  );
}

/* ─── Mobile card view ────────────────────────────────────────────────────── */
function LeadCard({ lead, onView, onEdit, onDelete }) {
  return (
    <div className="p-4 border-b border-[#E4E4E7] last:border-0 bg-white hover:bg-[#F4F4F5] transition-colors">
      {/* Top row: avatar + name + status */}
      <div className="flex items-start gap-3 mb-3">
        <Avatar name={lead.fullName} size="sm" />
        <div className="flex-1 min-w-0">
          <button
            onClick={() => onView(lead)}
            className="text-sm font-bold text-[#09090B] hover:text-[#FF4500] transition-colors text-left leading-tight w-full truncate"
          >
            {lead.fullName}
          </button>
          <p className="text-[10px] text-[#71717A] font-bold uppercase tracking-[0.1em] mt-0.5 truncate">{lead.email}</p>
        </div>
        <StatusBadge status={lead.status} />
      </div>

      {/* Details row */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        {lead.company && (
          <div className="flex items-center gap-1 text-[10px] font-bold text-[#09090B] uppercase tracking-wider">
            <Buildings size={12} weight="duotone" className="text-[#71717A]" />
            <span>{lead.company}</span>
          </div>
        )}
        <SourceBadge source={lead.source} />
        {lead.dealValue > 0 && (
          <span className="text-xs font-['Outfit',sans-serif] font-black text-[#FF4500]">
            {formatCurrency(lead.dealValue)}
          </span>
        )}
        <span className="text-[10px] text-[#71717A] font-bold uppercase tracking-[0.2em] ml-auto">
          {formatRelativeTime(lead.createdAt)}
        </span>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-2 pt-2 border-t border-[#E4E4E7]">
        <button
          onClick={() => onView(lead)}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 text-[10px] font-bold uppercase tracking-widest text-[#71717A] hover:text-[#09090B] hover:bg-white border border-[#E4E4E7] hover:border-[#18181B] transition-all rounded-none"
        >
          <Eye size={14} weight="bold" />
          View
        </button>
        <button
          onClick={() => onEdit(lead)}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 text-[10px] font-bold uppercase tracking-widest text-[#71717A] hover:text-[#09090B] hover:bg-white border border-[#E4E4E7] hover:border-[#18181B] transition-all rounded-none"
        >
          <PencilSimple size={14} weight="bold" />
          Edit
        </button>
        <button
          onClick={() => onDelete(lead)}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 text-[10px] font-bold uppercase tracking-widest text-[#71717A] hover:text-[#EF4444] hover:bg-white border border-[#E4E4E7] hover:border-[#EF4444] transition-all rounded-none"
        >
          <Trash size={14} weight="bold" />
          Delete
        </button>
      </div>
    </div>
  );
}

/* ─── Main export ─────────────────────────────────────────────────────────── */
export function LeadsTable({ leads, onView, onEdit, onDelete }) {
  const COL_HEADERS = ['Lead', 'Company', 'Status', 'Source', 'Deal Value', 'Added', 'Actions'];

  if (leads.length === 0) {
    return (
      <div className="py-24 text-center bg-white">
        <p className="text-[#71717A] text-xs font-bold uppercase tracking-widest">No leads found</p>
      </div>
    );
  }

  return (
    <>
      {/* Mobile card list — visible below md */}
      <div className="md:hidden divide-y divide-[#E4E4E7]">
        {leads.map((lead) => (
          <LeadCard
            key={lead._id}
            lead={lead}
            onView={onView}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>

      {/* Desktop table — hidden below md */}
      <div className="hidden md:block overflow-x-auto rounded-none border border-transparent bg-white">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-[#E4E4E7] bg-[#F4F4F5]">
              {COL_HEADERS.map((h) => (
                <th
                  key={h}
                  className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-[0.2em] text-[#71717A]"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <LeadRow
                key={lead._id}
                lead={lead}
                onView={onView}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
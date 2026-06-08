import { Eye, Pencil, Trash2, DollarSign, Building2 } from 'lucide-react';
import { StatusBadge, SourceBadge } from '../ui/Badge';
import { Avatar } from '../ui/Avatar';
import { Button } from '../ui/Button';
import { formatCurrency, formatRelativeTime } from '../../utils/helpers';

export function LeadRow({ lead, onView, onEdit, onDelete }) {
  return (
    <tr className="border-b border-[#1E2D45] hover:bg-white/2 transition-colors group">
      {/* Name + avatar */}
      <td className="px-4 py-3.5">
        <div className="flex items-center gap-3">
          <Avatar name={lead.fullName} size="sm" />
          <div>
            <button
              onClick={() => onView(lead)}
              className="text-sm font-medium text-slate-100 hover:text-emerald-400 transition-colors text-left leading-tight"
            >
              {lead.fullName}
            </button>
            <p className="text-xs text-slate-600 font-mono">{lead.email}</p>
          </div>
        </div>
      </td>

      {/* Company */}
      <td className="px-4 py-3.5">
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          {lead.company ? (
            <>
              <Building2 size={12} className="text-slate-600 shrink-0" />
              {lead.company}
            </>
          ) : (
            <span className="text-slate-700">—</span>
          )}
        </div>
      </td>

      {/* Status */}
      <td className="px-4 py-3.5">
        <StatusBadge status={lead.status} />
      </td>

      {/* Source */}
      <td className="px-4 py-3.5">
        <SourceBadge source={lead.source} />
      </td>

      {/* Deal value */}
      <td className="px-4 py-3.5">
        <div className="flex items-center gap-1 text-xs font-mono">
          {lead.dealValue > 0 ? (
            <span className="text-emerald-400 font-medium">{formatCurrency(lead.dealValue)}</span>
          ) : (
            <span className="text-slate-700">—</span>
          )}
        </div>
      </td>

      {/* Age */}
      <td className="px-4 py-3.5">
        <span className="text-xs text-slate-600 font-mono">{formatRelativeTime(lead.createdAt)}</span>
      </td>

      {/* Actions */}
      <td className="px-4 py-3.5">
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onView(lead)}
            className="p-1.5 rounded-[7px] text-slate-500 hover:text-emerald-400 hover:bg-emerald-500/10 transition-all"
            title="View details"
          >
            <Eye size={14} />
          </button>
          <button
            onClick={() => onEdit(lead)}
            className="p-1.5 rounded-[7px] text-slate-500 hover:text-blue-400 hover:bg-blue-500/10 transition-all"
            title="Edit"
          >
            <Pencil size={14} />
          </button>
          <button
            onClick={() => onDelete(lead)}
            className="p-1.5 rounded-[7px] text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all"
            title="Delete"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </td>
    </tr>
  );
}

export function LeadsTable({ leads, onView, onEdit, onDelete }) {
  const COL_HEADERS = ['Lead', 'Company', 'Status', 'Source', 'Deal Value', 'Added', 'Actions'];

  return (
    <div className="overflow-x-auto rounded-[14px] border border-[#1E2D45] bg-[#111827]">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-[#1E2D45]">
            {COL_HEADERS.map((h) => (
              <th
                key={h}
                className="px-4 py-3 text-left text-[10px] font-mono font-medium text-slate-600 uppercase tracking-widest"
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
      {leads.length === 0 && (
        <div className="py-16 text-center">
          <p className="text-slate-600 text-sm font-mono">No leads found</p>
        </div>
      )}
    </div>
  );
}

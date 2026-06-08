import { useState, useCallback } from 'react';
import {
  Plus, Search, Filter, ChevronLeft, ChevronRight, X, SlidersHorizontal,
} from 'lucide-react';
import { leadsService } from '../services/leads.service';
import { useFetch } from '../hooks/useFetch';
import { useMutation } from '../hooks/useMutation';
import { useDebounce } from '../hooks/useDebounce';
import { LeadsTable } from '../components/leads/LeadsTable';
import { CreateLeadModal } from '../components/leads/CreateLeadModal';
import { EditLeadModal } from '../components/leads/EditLeadModal';
import { LeadDetailModal } from '../components/leads/LeadDetailModal';
import { DeleteConfirmModal } from '../components/leads/DeleteConfirmModal';
import { Button } from '../components/ui/Button';
import { SkeletonRow } from '../components/ui/Skeleton';
import { Select } from '../components/ui/Input';
import { LEAD_SOURCES, LEAD_STATUS_VALUES } from '../utils/constants';
import { toast } from '../components/ui/Toast';

const STATUS_OPTIONS = ['', ...LEAD_STATUS_VALUES];
const SOURCE_OPTIONS = ['', ...LEAD_SOURCES];

export default function LeadsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearchRaw] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useDebounce('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sourceFilter, setSourceFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const [showCreate, setShowCreate] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [editLead, setEditLead] = useState(null);
  const [deleteLead, setDeleteLead] = useState(null);

  const queryKey = `${page}-${debouncedSearch}-${statusFilter}-${sourceFilter}`;

  const { data, loading, refetch } = useFetch(
    () =>
      leadsService.getAll({
        page,
        limit: 12,
        search: debouncedSearch || undefined,
        status: statusFilter || undefined,
        source: sourceFilter || undefined,
      }),
    [queryKey]
  );

  const { mutate: doDelete, loading: deleting } = useMutation((id) => leadsService.delete(id));

  const leads = data?.leads || [];
  const pagination = data?.pagination || {};

  const handleSearchChange = (e) => {
    setSearchRaw(e.target.value);
    setDebouncedSearch(e.target.value);
    setPage(1);
  };

  const clearSearch = () => {
    setSearchRaw('');
    setDebouncedSearch('');
    setPage(1);
  };

  const handleDeleteConfirm = async () => {
    try {
      await doDelete(deleteLead._id);
      toast.success('Lead deleted');
      setDeleteLead(null);
      refetch();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleEditFromDetail = (lead) => {
    setSelectedLead(null);
    setEditLead(lead);
  };

  const handleDeleteFromDetail = (lead) => {
    setSelectedLead(null);
    setDeleteLead(lead);
  };

  const hasFilters = statusFilter || sourceFilter || debouncedSearch;

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-mono text-slate-600 uppercase tracking-widest">
            {pagination.total != null ? `${pagination.total} leads` : 'Loading...'}
          </p>
        </div>
        <Button icon={Plus} onClick={() => setShowCreate(true)}>New Lead</Button>
      </div>

      {/* Search + Filters */}
      <div className="flex gap-3 flex-wrap">
        {/* Search */}
        <div className="relative flex-1 min-w-64">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by name, email, company..."
            value={search}
            onChange={handleSearchChange}
            className="w-full bg-[#111827] border border-[#1E2D45] text-slate-100 placeholder:text-slate-600 font-sans text-sm rounded-[10px] pl-9 pr-9 py-2.5 focus:border-emerald-500/60 focus:ring-2 focus:ring-emerald-500/15 transition-all hover:border-[#243352]"
          />
          {search && (
            <button onClick={clearSearch} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
              <X size={13} />
            </button>
          )}
        </div>

        {/* Filter toggle */}
        <Button
          variant={showFilters ? 'outline' : 'secondary'}
          icon={SlidersHorizontal}
          onClick={() => setShowFilters(!showFilters)}
        >
          Filters {hasFilters && <span className="ml-1 w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />}
        </Button>
      </div>

      {/* Filter panel */}
      {showFilters && (
        <div className="flex gap-3 flex-wrap items-end p-4 bg-[#111827] border border-[#1E2D45] rounded-[12px] animate-fade-in">
          <Select
            label="Status"
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
            className="w-44"
          >
            <option value="" className="bg-[#111827]">All Statuses</option>
            {LEAD_STATUS_VALUES.map((s) => (
              <option key={s} value={s} className="bg-[#111827]">
                {s.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
              </option>
            ))}
          </Select>
          <Select
            label="Source"
            value={sourceFilter}
            onChange={(e) => { setSourceFilter(e.target.value); setPage(1); }}
            className="w-44"
          >
            <option value="" className="bg-[#111827]">All Sources</option>
            {LEAD_SOURCES.map((s) => (
              <option key={s} value={s} className="bg-[#111827]">
                {s.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
              </option>
            ))}
          </Select>
          {hasFilters && (
            <Button
              variant="ghost"
              size="sm"
              icon={X}
              onClick={() => {
                setStatusFilter(''); setSourceFilter(''); clearSearch(); setPage(1);
              }}
            >
              Clear
            </Button>
          )}
        </div>
      )}

      {/* Table */}
      {loading ? (
        <div className="bg-[#111827] border border-[#1E2D45] rounded-[14px] overflow-hidden">
          {Array(8).fill(0).map((_, i) => <SkeletonRow key={i} />)}
        </div>
      ) : (
        <LeadsTable
          leads={leads}
          onView={setSelectedLead}
          onEdit={setEditLead}
          onDelete={setDeleteLead}
        />
      )}

      {/* Pagination */}
      {pagination.pages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-xs font-mono text-slate-600">
            Page {pagination.page} of {pagination.pages}
          </p>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              size="sm"
              icon={ChevronLeft}
              disabled={pagination.page <= 1}
              onClick={() => setPage((p) => p - 1)}
            />
            <Button
              variant="secondary"
              size="sm"
              disabled={pagination.page >= pagination.pages}
              onClick={() => setPage((p) => p + 1)}
            >
              <ChevronRight size={14} />
            </Button>
          </div>
        </div>
      )}

      {/* Modals */}
      <CreateLeadModal
        open={showCreate}
        onClose={() => setShowCreate(false)}
        onSuccess={refetch}
      />
      <EditLeadModal
        open={!!editLead}
        onClose={() => setEditLead(null)}
        lead={editLead}
        onSuccess={refetch}
      />
      <LeadDetailModal
        open={!!selectedLead}
        onClose={() => setSelectedLead(null)}
        lead={selectedLead}
        onEdit={handleEditFromDetail}
        onDelete={handleDeleteFromDetail}
      />
      <DeleteConfirmModal
        open={!!deleteLead}
        onClose={() => setDeleteLead(null)}
        lead={deleteLead}
        onConfirm={handleDeleteConfirm}
        loading={deleting}
      />
    </div>
  );
}

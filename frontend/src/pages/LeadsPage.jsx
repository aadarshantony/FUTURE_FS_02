import { useState } from 'react';
import {
  Plus, MagnifyingGlass as Search, CaretLeft as ChevronLeft, CaretRight as ChevronRight, X, Faders as SlidersHorizontal,
} from '@phosphor-icons/react';
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
    <div className="space-y-6 font-['Manrope',sans-serif] text-[#09090B] animate-fade-in" data-testid="leads-page">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <p className="uppercase text-xs tracking-[0.2em] font-bold text-[#71717A]" data-testid="leads-total-count">
            {pagination.total != null ? `${pagination.total} total leads` : 'Loading...'}
          </p>
        </div>
        <Button icon={Plus} onClick={() => setShowCreate(true)} data-testid="new-lead-btn" className="rounded-none w-full sm:w-auto">
          New Lead
        </Button>
      </div>

      {/* Search + Filters */}
      <div className="flex gap-3 sm:gap-4 flex-wrap">
        <div className="relative flex-1 min-w-0 group">
          <Search size={18} weight="bold" className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-[#18181B] pointer-events-none transition-colors" />
          <input
            type="text"
            placeholder="Search by name, email, company..."
            value={search}
            onChange={handleSearchChange}
            data-testid="leads-search-input"
            className="w-full bg-[#F4F4F5] border border-[#E4E4E7] text-[#09090B] font-semibold placeholder-zinc-400 text-sm rounded-none pl-11 pr-10 py-3 sm:py-3.5 focus:outline-none focus:border-[#18181B] focus:bg-white transition-all hover:border-[#18181B]"
          />
          {search && (
            <button 
              onClick={clearSearch} 
              data-testid="clear-search-btn"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-[#18181B] transition-colors"
            >
              <X size={16} weight="bold" />
            </button>
          )}
        </div>

        <Button
          variant={showFilters ? 'outline' : 'secondary'}
          icon={SlidersHorizontal}
          onClick={() => setShowFilters(!showFilters)}
          data-testid="toggle-filters-btn"
          className="rounded-none border-[#E4E4E7] hover:border-[#18181B] shrink-0"
        >
          Filters {hasFilters && <span className="ml-2 w-2 h-2 rounded-none bg-[#FF4500] inline-block" />}
        </Button>
      </div>

      {/* Filter panel */}
      {showFilters && (
        <div 
          className="flex gap-6 flex-wrap items-end p-6 bg-white border border-[#E4E4E7] rounded-none animate-fade-in shadow-[4px_4px_0px_0px_#E4E4E7]"
          data-testid="filters-panel"
        >
          <Select
            label="Status"
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
            className="w-56 rounded-none bg-[#F4F4F5] border-[#E4E4E7]"
            data-testid="status-filter-select"
          >
            <option value="" className="bg-white">All Statuses</option>
            {LEAD_STATUS_VALUES.map((s) => (
              <option key={s} value={s} className="bg-white uppercase text-xs font-bold tracking-wider">
                {s.replace(/_/g, ' ')}
              </option>
            ))}
          </Select>
          <Select
            label="Source"
            value={sourceFilter}
            onChange={(e) => { setSourceFilter(e.target.value); setPage(1); }}
            className="w-56 rounded-none bg-[#F4F4F5] border-[#E4E4E7]"
            data-testid="source-filter-select"
          >
            <option value="" className="bg-white">All Sources</option>
            {LEAD_SOURCES.map((s) => (
              <option key={s} value={s} className="bg-white uppercase text-xs font-bold tracking-wider">
                {s.replace(/_/g, ' ')}
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
              data-testid="clear-all-filters-btn"
              className="rounded-none text-[#09090B] hover:bg-[#F4F4F5] font-bold tracking-widest uppercase text-xs h-10 px-4"
            >
              Clear all
            </Button>
          )}
        </div>
      )}

      {/* Table */}
      {loading ? (
        <div className="bg-white border border-[#E4E4E7] rounded-none overflow-hidden">
          {Array(8).fill(0).map((_, i) => <SkeletonRow key={i} />)}
        </div>
      ) : (
        <div className="border border-[#E4E4E7] rounded-none bg-white">
          <LeadsTable
            leads={leads}
            onView={setSelectedLead}
            onEdit={setEditLead}
            onDelete={setDeleteLead}
          />
        </div>
      )}

      {/* Pagination */}
      {pagination.pages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-[#E4E4E7]">
          <p className="text-xs font-bold uppercase tracking-widest text-[#71717A]" data-testid="pagination-info">
            Page {pagination.page} of {pagination.pages}
          </p>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              size="sm"
              icon={ChevronLeft}
              disabled={pagination.page <= 1}
              onClick={() => setPage((p) => p - 1)}
              data-testid="prev-page-btn"
              className="rounded-none border-[#E4E4E7] hover:border-[#18181B]"
            />
            <Button
              variant="secondary"
              size="sm"
              disabled={pagination.page >= pagination.pages}
              onClick={() => setPage((p) => p + 1)}
              data-testid="next-page-btn"
              className="rounded-none border-[#E4E4E7] hover:border-[#18181B]"
            >
              <ChevronRight size={16} weight="bold" />
            </Button>
          </div>
        </div>
      )}

      {/* Modals */}
      <CreateLeadModal open={showCreate} onClose={() => setShowCreate(false)} onSuccess={refetch} />
      <EditLeadModal open={!!editLead} onClose={() => setEditLead(null)} lead={editLead} onSuccess={refetch} />
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
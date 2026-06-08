import { Trash2 } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';

export function DeleteConfirmModal({ open, onClose, lead, onConfirm, loading }) {
  return (
    <Modal open={open} onClose={onClose} title="Delete Lead" size="sm">
      <div className="space-y-4">
        <div className="flex items-center gap-3 p-4 rounded-[12px] bg-red-500/8 border border-red-500/20">
          <div className="w-9 h-9 rounded-full bg-red-500/15 flex items-center justify-center shrink-0">
            <Trash2 size={16} className="text-red-400" />
          </div>
          <div>
            <p className="text-sm font-semibold text-red-300">This action is irreversible</p>
            <p className="text-xs text-slate-500 mt-0.5">
              Lead <span className="text-slate-300 font-medium">"{lead?.fullName}"</span> will be permanently deleted.
            </p>
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button variant="danger" onClick={onConfirm} loading={loading} icon={Trash2}>
            Delete Lead
          </Button>
        </div>
      </div>
    </Modal>
  );
}

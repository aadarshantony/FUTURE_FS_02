import { Trash } from '@phosphor-icons/react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';

export function DeleteConfirmModal({ open, onClose, lead, onConfirm, loading }) {
  return (
    <Modal open={open} onClose={onClose} title="Delete Lead" size="sm">
      <div className="space-y-6 font-['Manrope',sans-serif]">
        {/* Warning block */}
        <div className="flex items-start gap-4 p-5 bg-[#EF4444]/5 border border-[#EF4444]/20 rounded-none">
          <div className="w-10 h-10 bg-[#EF4444] flex items-center justify-center shrink-0">
            <Trash size={20} weight="bold" className="text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-[#EF4444] uppercase tracking-widest">
              This action is irreversible
            </p>
            <p className="text-sm font-bold text-[#71717A] mt-2 leading-relaxed">
              Lead{' '}
              <span className="text-[#09090B] font-black">"{lead?.fullName}"</span>{' '}
              will be permanently deleted along with all associated activity.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-end gap-3 pt-2 border-t border-[#E4E4E7]">
          <Button variant="secondary" onClick={onClose} className="w-full sm:w-auto">
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={onConfirm}
            loading={loading}
            icon={Trash}
            className="w-full sm:w-auto"
          >
            Delete Lead
          </Button>
        </div>
      </div>
    </Modal>
  );
}
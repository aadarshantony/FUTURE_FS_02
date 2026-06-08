import { useState, useEffect } from 'react';
import { leadsService } from '../../services/leads.service';
import { useMutation } from '../../hooks/useMutation';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input, Select } from '../ui/Input';
import { LEAD_SOURCES, LEAD_STATUS_VALUES } from '../../utils/constants';
import { toast } from '../ui/Toast';

export function EditLeadModal({ open, onClose, lead, onSuccess }) {
  const [form, setForm] = useState({});
  const { mutate, loading } = useMutation((data) => leadsService.update(lead?._id, data));

  useEffect(() => {
    if (lead) {
      setForm({
        fullName: lead.fullName || '',
        email: lead.email || '',
        phone: lead.phone || '',
        company: lead.company || '',
        source: lead.source || 'website',
        status: lead.status || 'new',
        dealValue: lead.dealValue != null ? String(lead.dealValue) : '',
      });
    }
  }, [lead]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        dealValue: form.dealValue !== '' ? Number(form.dealValue) : undefined,
      };
      await mutate(payload);
      toast.success('Lead updated successfully');
      onSuccess?.();
      onClose();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Edit Lead" size="md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input label="Full Name" name="fullName" value={form.fullName || ''} onChange={handleChange} />
          <Input label="Email" name="email" type="email" value={form.email || ''} onChange={handleChange} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Phone" name="phone" value={form.phone || ''} onChange={handleChange} />
          <Input label="Company" name="company" value={form.company || ''} onChange={handleChange} />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Select label="Status" name="status" value={form.status || ''} onChange={handleChange}>
            {LEAD_STATUS_VALUES.map((s) => (
              <option key={s} value={s} className="bg-[#111827]">
                {s.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
              </option>
            ))}
          </Select>
          <Select label="Source" name="source" value={form.source || ''} onChange={handleChange}>
            {LEAD_SOURCES.map((s) => (
              <option key={s} value={s} className="bg-[#111827]">
                {s.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
              </option>
            ))}
          </Select>
          <Input
            label="Deal Value ($)"
            name="dealValue"
            type="number"
            min="0"
            value={form.dealValue || ''}
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
          <Button type="submit" loading={loading}>Save Changes</Button>
        </div>
      </form>
    </Modal>
  );
}

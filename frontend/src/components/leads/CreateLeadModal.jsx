import { useState } from 'react';
import { leadsService } from '../../services/leads.service';
import { useMutation } from '../../hooks/useMutation';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input, Select } from '../ui/Input';
import { LEAD_SOURCES } from '../../utils/constants';
import { toast } from '../ui/Toast';

const INITIAL_FORM = {
  fullName: '',
  email: '',
  phone: '',
  company: '',
  source: 'website',
  dealValue: '',
};

export function CreateLeadModal({ open, onClose, onSuccess }) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const { mutate, loading } = useMutation(leadsService.create);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const errs = {};
    if (!form.fullName.trim() || form.fullName.length < 2) errs.fullName = 'Name must be at least 2 chars';
    if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) errs.email = 'Valid email required';
    if (form.dealValue && isNaN(Number(form.dealValue))) errs.dealValue = 'Must be a number';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    try {
      const payload = {
        ...form,
        dealValue: form.dealValue ? Number(form.dealValue) : undefined,
      };
      await mutate(payload);
      toast.success(`Lead "${form.fullName}" created successfully`);
      setForm(INITIAL_FORM);
      onSuccess?.();
      onClose();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleClose = () => {
    setForm(INITIAL_FORM);
    setErrors({});
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose} title="Create New Lead" size="lg">
      <form onSubmit={handleSubmit} className="space-y-6 font-['Manrope',sans-serif]">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Full Name"
            name="fullName"
            placeholder="Jane Doe"
            value={form.fullName}
            onChange={handleChange}
            error={errors.fullName}
          />
          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="jane@example.com"
            value={form.email}
            onChange={handleChange}
            error={errors.email}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Phone"
            name="phone"
            placeholder="+1 555 0100"
            value={form.phone}
            onChange={handleChange}
          />
          <Input
            label="Company"
            name="company"
            placeholder="Acme Inc."
            value={form.company}
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select 
            label="Source" 
            name="source" 
            value={form.source} 
            onChange={handleChange}
          >
            {LEAD_SOURCES.map((s) => (
              <option key={s} value={s} className="bg-white uppercase text-xs font-bold tracking-wider text-[#09090B]">
                {s.replace(/_/g, ' ')}
              </option>
            ))}
          </Select>
          <Input
            label="Deal Value ($)"
            name="dealValue"
            type="number"
            placeholder="0"
            min="0"
            value={form.dealValue}
            onChange={handleChange}
            error={errors.dealValue}
          />
        </div>

        <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6 mt-4 border-t border-[#E4E4E7]">
          <Button 
            type="button" 
            variant="secondary" 
            onClick={handleClose}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            loading={loading}
            className="w-full sm:w-auto"
          >
            Create Lead
          </Button>
        </div>
      </form>
    </Modal>
  );
}
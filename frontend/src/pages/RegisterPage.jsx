import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, Zap, ArrowRight, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { toast } from '../components/ui/Toast';

const FEATURES = [
  'Full pipeline lead management',
  'Real-time analytics dashboard',
  'Team collaboration tools',
  'Activity audit trail',
];

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: '' }));
  };

  const validate = () => {
    const errs = {};
    if (!form.name || form.name.trim().length < 2) errs.name = 'Name must be at least 2 characters';
    if (!form.email || !/^\S+@\S+\.\S+$/.test(form.email)) errs.email = 'Valid email is required';
    if (!form.password || form.password.length < 6) errs.password = 'Password must be at least 6 characters';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    try {
      await register(form.name, form.email, form.password);
      toast.success('Account created! Welcome to Gatherly.');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F1A] flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 via-transparent to-emerald-500/5" />
        <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-teal-500/8 blur-3xl" />

        <div className="relative flex items-center gap-3">
          <div className="w-9 h-9 rounded-[10px] bg-gradient-to-br from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/40">
            <Zap size={18} strokeWidth={2.5} className="text-white" />
          </div>
          <div>
            <span className="text-lg font-bold text-white">Gatherly</span>
            <span className="block text-[10px] font-mono text-emerald-500/70 tracking-widest uppercase">CRM</span>
          </div>
        </div>

        <div className="relative space-y-6">
          <h1 className="text-4xl font-bold text-white leading-tight">
            Start managing
            <br />
            <span className="gradient-text">smarter today</span>
          </h1>
          <p className="text-slate-400 text-base">Join teams that close more deals with Gatherly CRM.</p>
          <ul className="space-y-3">
            {FEATURES.map((f) => (
              <li key={f} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-500/15 flex items-center justify-center shrink-0">
                  <CheckCircle size={12} className="text-emerald-400" />
                </div>
                <span className="text-sm text-slate-400 font-mono">{f}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-xs text-slate-700 font-mono">Free to start. No credit card required.</p>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-[9px] bg-gradient-to-br from-emerald-500 to-teal-400 flex items-center justify-center">
              <Zap size={16} strokeWidth={2.5} className="text-white" />
            </div>
            <span className="text-base font-bold text-white">Gatherly CRM</span>
          </div>

          <div className="space-y-2 mb-8">
            <h2 className="text-2xl font-bold text-white">Create account</h2>
            <p className="text-sm text-slate-500 font-mono">Set up your Gatherly workspace</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full Name"
              name="name"
              type="text"
              placeholder="Jane Doe"
              icon={User}
              value={form.name}
              onChange={handleChange}
              error={errors.name}
              autoComplete="name"
            />
            <Input
              label="Email address"
              name="email"
              type="email"
              placeholder="you@example.com"
              icon={Mail}
              value={form.email}
              onChange={handleChange}
              error={errors.email}
              autoComplete="email"
            />
            <div className="relative">
              <Input
                label="Password"
                name="password"
                type={showPwd ? 'text' : 'password'}
                placeholder="Min. 6 characters"
                icon={Lock}
                value={form.password}
                onChange={handleChange}
                error={errors.password}
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowPwd(!showPwd)}
                className="absolute right-3 top-[34px] text-slate-500 hover:text-slate-300 transition-colors"
              >
                {showPwd ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>

            <Button type="submit" size="xl" loading={loading} className="w-full mt-2">
              Create Free Account
              <ArrowRight size={16} className="ml-1" />
            </Button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6 font-mono">
            Already have an account?{' '}
            <Link to="/login" className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

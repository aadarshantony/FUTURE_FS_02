import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Zap, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { toast } from '../components/ui/Toast';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: '' }));
  };

  const validate = () => {
    const errs = {};
    if (!form.email) errs.email = 'Email is required';
    if (!form.password) errs.password = 'Password is required';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    try {
      await login(form.email, form.password);
      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F1A] flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-teal-500/5" />
        <div className="absolute top-1/3 -left-20 w-80 h-80 rounded-full bg-emerald-500/8 blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-60 h-60 rounded-full bg-teal-500/6 blur-3xl" />

        {/* Logo */}
        <div className="relative flex items-center gap-3">
          <div className="w-9 h-9 rounded-[10px] bg-gradient-to-br from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/40">
            <Zap size={18} strokeWidth={2.5} className="text-white" />
          </div>
          <div>
            <span className="text-lg font-bold text-white font-sans">Gatherly</span>
            <span className="block text-[10px] font-mono text-emerald-500/70 tracking-widest uppercase leading-none">CRM</span>
          </div>
        </div>

        {/* Hero text */}
        <div className="relative space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono text-emerald-400">Lead Management Platform</span>
          </div>
          <h1 className="text-4xl font-bold text-white leading-tight">
            Convert leads into
            <br />
            <span className="gradient-text">lasting relationships</span>
          </h1>
          <p className="text-slate-400 text-base leading-relaxed max-w-md">
            Track, nurture, and close deals with powerful pipeline management, real-time analytics, and team collaboration.
          </p>

          {/* Stats */}
          <div className="flex gap-8 pt-2">
            {[
              { value: '10x', label: 'Faster Closing' },
              { value: '98%', label: 'Satisfaction' },
              { value: '24/7', label: 'Support' },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="text-xl font-bold text-white">{value}</p>
                <p className="text-xs text-slate-500 font-mono">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="relative text-xs text-slate-700 font-mono">© 2025 Gatherly CRM</p>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-[9px] bg-gradient-to-br from-emerald-500 to-teal-400 flex items-center justify-center">
              <Zap size={16} strokeWidth={2.5} className="text-white" />
            </div>
            <span className="text-base font-bold text-white font-sans">Gatherly CRM</span>
          </div>

          <div className="space-y-2 mb-8">
            <h2 className="text-2xl font-bold text-white font-sans">Sign in</h2>
            <p className="text-sm text-slate-500 font-mono">Enter your credentials to access your dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
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
                placeholder="••••••••"
                icon={Lock}
                value={form.password}
                onChange={handleChange}
                error={errors.password}
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPwd(!showPwd)}
                className="absolute right-3 top-[34px] text-slate-500 hover:text-slate-300 transition-colors"
              >
                {showPwd ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>

            <Button
              type="submit"
              size="xl"
              loading={loading}
              className="w-full mt-2"
            >
              Sign in to Gatherly
              <ArrowRight size={16} className="ml-1" />
            </Button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6 font-mono">
            No account?{' '}
            <Link to="/register" className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors">
              Create one free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Envelope, LockKey, User, Eye, EyeClosed, ArrowRight, CheckCircle, Lightning } from '@phosphor-icons/react';
import { useAuth } from '../context/AuthContext';
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
    <div className="min-h-screen flex bg-white font-['Manrope',sans-serif] text-[#09090B] selection:bg-[#FF4500] selection:text-white">
      
      {/* LEFT PANEL: FORM (Swiss Brutalist) */}
      <div className="w-full lg:w-[45%] flex flex-col justify-center p-8 sm:p-12 lg:p-16 border-r border-[#E4E4E7] bg-[#FFFFFF] relative z-10 h-screen overflow-y-auto">
        <div className="w-full max-w-[400px] mx-auto flex flex-col">
          
          {/* Mobile Logo (Visible only on small screens) */}
          <div className="lg:hidden flex items-center gap-2 mb-10">
            <div className="w-8 h-8 bg-[#FF4500] flex items-center justify-center">
              <Lightning size={18} weight="fill" className="text-white" />
            </div>
            <span className="text-xl font-['Outfit',sans-serif] font-black tracking-tight text-[#09090B]">GATHERLY.</span>
          </div>

          {/* Header */}
          <div className="mb-10">
            <h2 
              className="text-4xl md:text-5xl font-['Outfit',sans-serif] font-black tracking-tighter text-[#09090B] leading-none mb-3"
            >
              Create account.
            </h2>
            <p className="text-base font-medium text-[#71717A] leading-relaxed">
              Set up your Gatherly workspace today.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Full Name Input */}
            <div className="space-y-2">
              <label 
                htmlFor="name" 
                className="block uppercase text-xs tracking-[0.2em] font-bold text-zinc-500"
              >
                Full Name
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-400 group-focus-within:text-[#18181B] transition-colors">
                  <User size={20} weight="duotone" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Jane Doe"
                  value={form.name}
                  onChange={handleChange}
                  autoComplete="name"
                  className={`w-full pl-11 pr-4 py-3 bg-[#F4F4F5] border ${errors.name ? 'border-red-500' : 'border-[#E4E4E7]'} rounded-none text-[#09090B] font-semibold placeholder-zinc-400 focus:outline-none focus:border-[#18181B] focus:bg-white transition-all`}
                />
              </div>
              {errors.name && <p className="text-[#EF4444] text-xs font-bold mt-1">{errors.name}</p>}
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <label 
                htmlFor="email" 
                className="block uppercase text-xs tracking-[0.2em] font-bold text-zinc-500"
              >
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-400 group-focus-within:text-[#18181B] transition-colors">
                  <Envelope size={20} weight="duotone" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@yourcompany.com"
                  value={form.email}
                  onChange={handleChange}
                  autoComplete="email"
                  className={`w-full pl-11 pr-4 py-3 bg-[#F4F4F5] border ${errors.email ? 'border-red-500' : 'border-[#E4E4E7]'} rounded-none text-[#09090B] font-semibold placeholder-zinc-400 focus:outline-none focus:border-[#18181B] focus:bg-white transition-all`}
                />
              </div>
              {errors.email && <p className="text-[#EF4444] text-xs font-bold mt-1">{errors.email}</p>}
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label 
                htmlFor="password" 
                className="block uppercase text-xs tracking-[0.2em] font-bold text-zinc-500"
              >
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-400 group-focus-within:text-[#18181B] transition-colors">
                  <LockKey size={20} weight="duotone" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPwd ? "text" : "password"}
                  placeholder="Min. 6 characters"
                  value={form.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                  className={`w-full pl-11 pr-12 py-3 bg-[#F4F4F5] border ${errors.password ? 'border-red-500' : 'border-[#E4E4E7]'} rounded-none text-[#09090B] font-semibold placeholder-zinc-400 focus:outline-none focus:border-[#18181B] focus:bg-white transition-all tracking-widest`}
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-0 inset-y-0 pr-4 flex items-center text-zinc-400 hover:text-[#18181B] transition-colors"
                >
                  {showPwd ? <EyeClosed size={20} weight="bold" /> : <Eye size={20} weight="bold" />}
                </button>
              </div>
              {errors.password && <p className="text-[#EF4444] text-xs font-bold mt-1">{errors.password}</p>}
            </div>

            {/* Primary Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-[#FF4500] border border-[#FF4500] text-white font-bold text-sm tracking-widest uppercase flex items-center justify-center rounded-none hover:-translate-y-1 hover:border-[#18181B] hover:shadow-[4px_4px_0px_0px_#18181B] transition-all disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-none"
              >
                {loading ? 'Creating Account...' : 'Create Free Account'}
                {!loading && <ArrowRight size={18} weight="bold" className="ml-2" />}
              </button>
            </div>

          </form>

          {/* Footer Link */}
          <div className="mt-8 text-center border-t border-[#E4E4E7] pt-8">
            <p className="text-sm font-bold text-[#71717A]">
              ALREADY HAVE AN ACCOUNT?{' '}
              <Link to="/login" className="text-[#FF4500] hover:text-[#E03C00] transition-colors border-b-2 border-transparent hover:border-[#FF4500] pb-0.5 ml-1">
                SIGN IN
              </Link>
            </p>
          </div>

        </div>
      </div>

      {/* RIGHT PANEL: CONTENT & FEATURES */}
      <div className="hidden lg:flex flex-1 relative bg-[#F4F4F5] flex-col justify-between p-16 overflow-hidden">
        
        {/* Abstract Geometry Texture via Guidelines */}
        <div 
          className="absolute inset-0 z-0 opacity-[0.07] bg-cover bg-center mix-blend-multiply pointer-events-none" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1730473360570-881f4bd1b2e3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2MDV8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGdlb21ldHJpYyUyMHNoYXBlcyUyMG9yYW5nZSUyMHdoaXRlfGVufDB8fHx8MTc4MDg5MjY2MXww&ixlib=rb-4.1.0&q=85')" }} 
        />
        
        {/* Top Brand Logo */}
        <div className="relative z-10 flex items-center gap-3 opacity-0">
          <div className="w-10 h-10 bg-[#FF4500] flex items-center justify-center">
            <Lightning size={24} weight="fill" className="text-white" />
          </div>
          <span className="text-2xl font-['Outfit',sans-serif] font-black tracking-tight text-[#09090B]">GATHERLY.</span>
        </div>

        {/* Center Content */}
        <div className="relative z-10 w-full max-w-xl">
          <h1 className="text-5xl xl:text-6xl font-['Outfit',sans-serif] font-black tracking-tighter text-[#09090B] leading-[1.1] mb-6 uppercase">
            Start managing.
            <br />
            <span className="text-[#FF4500]">Smarter today.</span>
          </h1>
          
          <p className="text-xl font-medium text-[#71717A] leading-relaxed mb-10">
            Join the aggressive teams that are dominating their sales pipeline and closing more deals with Gatherly CRM.
          </p>

          <div className="bg-white border border-[#E4E4E7] p-8 shadow-[8px_8px_0px_0px_#E4E4E7]">
            <ul className="space-y-4">
              {FEATURES.map((f) => (
                <li key={f} className="flex items-center gap-4">
                  <div className="w-6 h-6 flex items-center justify-center shrink-0">
                    <CheckCircle size={24} weight="fill" className="text-[#FF4500]" />
                  </div>
                  <span className="text-base font-bold text-[#09090B] tracking-tight">{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="relative z-10 border-l-4 border-[#18181B] pl-4">
          <p className="uppercase text-xs tracking-[0.2em] font-bold text-[#09090B]">
            Free to start. No credit card required.
          </p>
        </div>

      </div>

    </div>
  );
}
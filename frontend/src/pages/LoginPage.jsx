import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Envelope, LockKey, Eye, EyeClosed, ArrowRight } from '@phosphor-icons/react';
import { useAuth } from '../context/AuthContext';
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
    <div className="min-h-screen flex bg-white font-['Manrope',sans-serif] text-[#09090B] selection:bg-[#FF4500] selection:text-white">
      
      {/* LEFT PANEL: FORM (Swiss Brutalist) */}
      <div className="w-full lg:w-[45%] flex items-center justify-center p-8 sm:p-12 lg:p-16 border-r border-[#E4E4E7] bg-[#FFFFFF] relative z-10">
        <div className="w-full max-w-[400px] flex flex-col">
          
          {/* Header */}
          <div className="mb-10">
            <h2 
              className="text-4xl md:text-5xl font-['Outfit',sans-serif] font-black tracking-tighter text-[#09090B] leading-none mb-3"
              data-testid="login-heading"
            >
              Welcome back.
            </h2>
            <p className="text-base font-medium text-[#71717A] leading-relaxed">
              Sign in to your workspace to manage leads and pipeline.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
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
                  data-testid="email-input"
                  className={`w-full pl-11 pr-4 py-3 bg-[#F4F4F5] border ${errors.email ? 'border-red-500' : 'border-[#E4E4E7]'} rounded-none text-[#09090B] font-semibold placeholder-zinc-400 focus:outline-none focus:border-[#18181B] focus:bg-white transition-all`}
                />
              </div>
              {errors.email && <p className="text-[#EF4444] text-xs font-bold mt-1" data-testid="email-error">{errors.email}</p>}
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label 
                  htmlFor="password" 
                  className="block uppercase text-xs tracking-[0.2em] font-bold text-zinc-500"
                >
                  Password
                </label>
                <a 
                  href="#" 
                  className="uppercase text-[10px] tracking-[0.1em] font-black text-[#FF4500] hover:text-[#E03C00] transition-colors"
                  data-testid="forgot-password-link"
                >
                  Forgot?
                </a>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-400 group-focus-within:text-[#18181B] transition-colors">
                  <LockKey size={20} weight="duotone" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPwd ? "text" : "password"}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  data-testid="password-input"
                  className={`w-full pl-11 pr-12 py-3 bg-[#F4F4F5] border ${errors.password ? 'border-red-500' : 'border-[#E4E4E7]'} rounded-none text-[#09090B] font-semibold placeholder-zinc-400 focus:outline-none focus:border-[#18181B] focus:bg-white transition-all tracking-widest`}
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  data-testid="toggle-password-btn"
                  className="absolute right-0 inset-y-0 pr-4 flex items-center text-zinc-400 hover:text-[#18181B] transition-colors"
                >
                  {showPwd ? <EyeClosed size={20} weight="bold" /> : <Eye size={20} weight="bold" />}
                </button>
              </div>
              {errors.password && <p className="text-[#EF4444] text-xs font-bold mt-1" data-testid="password-error">{errors.password}</p>}
            </div>

            {/* Remember Me */}
            <div className="flex items-center pt-2">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <input 
                    type="checkbox" 
                    className="w-5 h-5 appearance-none border border-[#E4E4E7] bg-[#F4F4F5] rounded-none checked:bg-[#18181B] checked:border-[#18181B] cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF4500] focus:ring-offset-2"
                    data-testid="remember-me-checkbox"
                  />
                  <div className="absolute text-white pointer-events-none opacity-0 peer-checked:opacity-100">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                </div>
                <span className="text-sm font-bold text-[#71717A] group-hover:text-[#09090B] transition-colors">
                  Remember me
                </span>
              </label>
            </div>

            {/* Actions Container */}
            <div className="flex flex-col gap-4 mt-8 pt-4">
              
              {/* Primary Sign In Button */}
              <button
                type="submit"
                disabled={loading}
                data-testid="submit-login-btn"
                className="w-full py-3.5 bg-[#FF4500] border border-[#FF4500] text-white font-bold text-sm tracking-widest uppercase flex items-center justify-center rounded-none hover:-translate-y-1 hover:border-[#18181B] hover:shadow-[4px_4px_0px_0px_#18181B] transition-all disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-none"
              >
                {loading ? 'Authenticating...' : 'Sign In'}
                {!loading && <ArrowRight size={18} weight="bold" className="ml-2" />}
              </button>

              {/* Secondary Register Button */}
              <Link
                to="/register"
                data-testid="register-link-btn"
                className="w-full py-3.5 bg-transparent border border-[#18181B] text-[#18181B] font-bold text-sm tracking-widest uppercase flex items-center justify-center rounded-none hover:-translate-y-1 hover:bg-[#F4F4F5] hover:shadow-[4px_4px_0px_0px_#18181B] transition-all"
              >
                Register Now
              </Link>

            </div>
          </form>

        </div>
      </div>

      {/* RIGHT PANEL: MEDIA & CONTENT */}
      <div className="hidden lg:flex flex-1 relative bg-[#F4F4F5] flex-col justify-end p-16 overflow-hidden">
        
        {/* Abstract Geometry Texture via Guidelines */}
        <div 
          className="absolute inset-0 z-0 opacity-10 bg-cover bg-center mix-blend-multiply" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1730473360570-881f4bd1b2e3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2MDV8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGdlb21ldHJpYyUyMHNoYXBlcyUyMG9yYW5nZSUyMHdoaXRlfGVufDB8fHx8MTc4MDg5MjY2MXww&ixlib=rb-4.1.0&q=85')" }} 
        />
        
        {/* Sales Team Hero Image Background */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center grayscale mix-blend-overlay"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1556761175-4b46a572b786?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1Mjh8MHwxfHNlYXJjaHwyfHxtb2Rlcm4lMjBkaXZlcnNlJTIwc2FsZXMlMjB0ZWFtJTIwb2ZmaWNlfGVufDB8fHx8MTc4MDg5MjY2MXww&ixlib=rb-4.1.0&q=85')" }}
        />
        
        {/* Heavy Gradient overlay to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/90 to-white/10 z-0" />

        {/* Content Wrapper */}
        <div className="relative z-10 w-full max-w-xl">
          
          <h1 className="text-5xl xl:text-6xl font-['Outfit',sans-serif] font-black tracking-tighter text-[#09090B] leading-[1.1] mb-6">
            CONVERT LEADS.
            <br />
            <span className="text-[#FF4500]">CLOSE DEALS.</span>
          </h1>
          
          <p className="text-xl font-medium text-[#71717A] leading-relaxed mb-12">
            Gatherly CRM provides the high-contrast clarity your team needs to track, nurture, and dominate your sales pipeline.
          </p>

          <div className="h-[1px] w-full bg-[#E4E4E7] mb-8" />

          {/* Stats Row */}
          <div className="flex gap-12 xl:gap-16">
            <div className="flex flex-col gap-1">
              <span className="text-4xl font-['Outfit',sans-serif] font-black text-[#09090B]">10x</span>
              <span className="uppercase text-xs tracking-[0.2em] font-bold text-[#71717A]">Faster Closing</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-4xl font-['Outfit',sans-serif] font-black text-[#09090B]">98%</span>
              <span className="uppercase text-xs tracking-[0.2em] font-bold text-[#71717A]">Satisfaction</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-4xl font-['Outfit',sans-serif] font-black text-[#09090B]">24/7</span>
              <span className="uppercase text-xs tracking-[0.2em] font-bold text-[#71717A]">Support</span>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
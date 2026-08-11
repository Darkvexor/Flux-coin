import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';

export default function Register() {
  const [form, setForm] = useState({ email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { register, user } = useAuth();
  const router = useRouter();

  if (user) { router.push('/'); return null; }

  const validate = () => {
    const errs = {};
    if (!form.email || !form.email.includes('@')) errs.email = 'Valid email required';
    if (!form.password || form.password.length < 8) errs.password = 'Min 8 characters';
    if (form.password !== form.confirmPassword) errs.confirmPassword = 'Passwords must match';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    const result = await register(form);
    setLoading(false);
    if (result.success) router.push('/?welcome=true');
  };

  return (
    <div className="min-h-screen bg-[#030014] flex items-center justify-center px-4 py-20 relative overflow-hidden">
      <div className="absolute top-0 -left-40 w-[500px] h-[500px] bg-flux-purple/20 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-0 -right-40 w-[500px] h-[500px] bg-flux-blue/10 rounded-full blur-[120px]"></div>
      
      <div className="relative w-full max-w-md z-10">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-flux-purple to-flux-blue rounded-full flex items-center justify-center">
              <span className="text-white font-black text-lg">F</span>
            </div>
            <span className="text-3xl font-black">Flux<span className="gradient-text">Coin</span></span>
          </Link>
          <h1 className="text-4xl font-black text-white mb-2">Create Account</h1>
          <p className="text-gray-400">Join the future of digital currency</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 space-y-5">
          <div>
            <label className="text-sm text-gray-400 mb-2 block font-medium">Email</label>
            <div className="relative">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="email"
                value={form.email}
                onChange={(e) => { setForm({ ...form, email: e.target.value }); setErrors({ ...errors, email: '' }); }}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-flux-purple focus:ring-2 focus:ring-flux-purple/20 transition-all"
                placeholder="your@email.com"
              />
            </div>
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-2 block font-medium">Password</label>
            <div className="relative">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={(e) => { setForm({ ...form, password: e.target.value }); setErrors({ ...errors, password: '' }); }}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-12 text-white placeholder-gray-500 focus:outline-none focus:border-flux-purple focus:ring-2 focus:ring-flux-purple/20 transition-all"
                placeholder="Min 8 characters"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white">
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-2 block font-medium">Confirm Password</label>
            <div className="relative">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="password"
                value={form.confirmPassword}
                onChange={(e) => { setForm({ ...form, confirmPassword: e.target.value }); setErrors({ ...errors, confirmPassword: '' }); }}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-flux-purple focus:ring-2 focus:ring-flux-purple/20 transition-all"
                placeholder="Repeat password"
              />
            </div>
            {errors.confirmPassword && <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>

          <button type="submit" disabled={loading} className="w-full py-4 bg-gradient-to-r from-flux-purple to-flux-blue rounded-xl font-bold text-lg hover:opacity-90 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100">
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
            <div className="relative flex justify-center text-sm"><span className="px-4 bg-[#0a0a1a] text-gray-500">Already have an account?</span></div>
          </div>

          <Link href="/login" className="block w-full py-4 border-2 border-white/10 rounded-xl font-bold text-lg text-center hover:border-flux-purple/50 hover:bg-white/5 transition-all">
            Sign In
          </Link>
        </form>
      </div>
    </div>
  );
}
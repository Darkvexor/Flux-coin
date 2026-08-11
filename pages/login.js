import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, user } = useAuth();
  const router = useRouter();

  if (user) { router.push('/'); return null; }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (result.success) router.push('/dashboard');
    else setError(result.error);
  };

  return (
    <div className="min-h-screen bg-[#030014] flex items-center justify-center px-4 py-20 relative overflow-hidden">
      <div className="absolute top-0 -right-40 w-[500px] h-[500px] bg-flux-blue/15 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-0 -left-40 w-[500px] h-[500px] bg-flux-purple/15 rounded-full blur-[120px]"></div>
      
      <div className="relative w-full max-w-md z-10">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-flux-purple to-flux-blue rounded-full flex items-center justify-center">
              <span className="text-white font-black text-lg">F</span>
            </div>
            <span className="text-3xl font-black">Flux<span className="gradient-text">Coin</span></span>
          </Link>
          <h1 className="text-4xl font-black text-white mb-2">Welcome Back</h1>
          <p className="text-gray-400">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 space-y-5">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-400 text-sm flex items-center gap-3">
              <span className="text-lg">⚠️</span> {error}
            </div>
          )}

          <div>
            <label className="text-sm text-gray-400 mb-2 block font-medium">Email</label>
            <div className="relative">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(''); }}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-flux-purple focus:ring-2 focus:ring-flux-purple/20 transition-all"
                placeholder="your@email.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-2 block font-medium">Password</label>
            <div className="relative">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-12 text-white placeholder-gray-500 focus:outline-none focus:border-flux-purple focus:ring-2 focus:ring-flux-purple/20 transition-all"
                placeholder="Enter your password"
                required
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors">
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          <div className="text-right">
            <Link href="/forgot-password" className="text-sm text-flux-blue hover:text-flux-purple transition-colors">
              Forgot password?
            </Link>
          </div>

          <button type="submit" disabled={loading} className="w-full py-4 bg-gradient-to-r from-flux-purple to-flux-blue rounded-xl font-bold text-lg hover:opacity-90 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100">
            {loading ? 'Signing In...' : 'Sign In'}
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
            <div className="relative flex justify-center text-sm"><span className="px-4 bg-[#0a0a1a] text-gray-500">Don't have an account?</span></div>
          </div>

          <Link href="/register" className="block w-full py-4 border-2 border-white/10 rounded-xl font-bold text-lg text-center hover:border-flux-purple/50 hover:bg-white/5 transition-all">
            Create Account
          </Link>
        </form>
      </div>
    </div>
  );
}
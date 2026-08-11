import { useState } from 'react';
import { useRouter } from 'next/router';

export default function AdminLogin() {
  const [key, setKey] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    if (key === 'flux-admin-secret-2024') {
      localStorage.setItem('admin_key', key);
      router.push('/admin');
    } else {
      setError('Invalid admin key');
    }
  };

  return (
    <div className="min-h-screen bg-[#030014] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white">Admin Access</h1>
        </div>
        <form onSubmit={handleLogin} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 space-y-4">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 text-red-400 text-sm">{error}</div>
          )}
          <input
            type="password"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-white text-center focus:outline-none focus:border-flux-purple transition-all"
            placeholder="Enter admin key"
          />
          <button type="submit" className="w-full py-4 bg-gradient-to-r from-flux-purple to-flux-blue rounded-xl font-bold hover:opacity-90 transition-all">
            Access Admin Panel
          </button>
        </form>
      </div>
    </div>
  );
}
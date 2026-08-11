import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { authAPI } from '../../lib/api';
import toast from 'react-hot-toast';

export default function ResetPassword() {
  const router = useRouter();
  const { token } = router.query;
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      await authAPI.resetPassword(token, { password, confirmPassword });
      setDone(true);
      toast.success('Password reset successful!');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Reset failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-flux-darker flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-flux-purple to-flux-blue rounded-full flex items-center justify-center">
              <span className="text-white font-black">F</span>
            </div>
            <span className="text-2xl font-black">Flux<span className="gradient-text">Coin</span></span>
          </Link>
          <h1 className="text-3xl font-bold text-white">New Password</h1>
        </div>

        <div className="glass-card">
          {done ? (
            <div className="text-center">
              <p className="text-green-400 text-4xl mb-4">✓</p>
              <p className="text-white font-bold mb-4">Password Reset Complete!</p>
              <Link href="/login" className="btn-primary block text-center">Sign In</Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                placeholder="New password (min 8 characters)"
                required
                minLength={8}
              />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input-field"
                placeholder="Confirm new password"
                required
              />
              <button type="submit" disabled={loading} className="btn-primary w-full">
                {loading ? 'Resetting...' : 'Reset Password'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
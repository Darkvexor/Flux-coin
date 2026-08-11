import { useState } from 'react';
import Link from 'next/link';
import { authAPI } from '../lib/api';
import toast from 'react-hot-toast';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await authAPI.forgotPassword(email);
      setSent(true);
      toast.success('Reset instructions sent to your email');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to send reset email');
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
          <h1 className="text-3xl font-bold text-white">Reset Password</h1>
        </div>

        <div className="glass-card">
          {sent ? (
            <div className="text-center">
              <p className="text-green-400 text-4xl mb-4">✉️</p>
              <p className="text-white font-bold mb-2">Check Your Email</p>
              <p className="text-gray-400 text-sm">
                We sent password reset instructions to <span className="text-white">{email}</span>
              </p>
              <Link href="/login" className="btn-primary block text-center mt-6">
                Back to Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-gray-400 text-sm">
                Enter your email and we'll send you instructions to reset your password.
              </p>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="your@email.com"
                required
              />
              <button type="submit" disabled={loading} className="btn-primary w-full">
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
              <Link href="/login" className="block text-center text-gray-400 text-sm hover:text-white">
                Back to Login
              </Link>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
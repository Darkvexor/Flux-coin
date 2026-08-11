import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { authAPI } from '../../lib/api';

export default function VerifyEmail() {
  const router = useRouter();
  const { token } = router.query;
  const [status, setStatus] = useState('verifying');

  useEffect(() => {
    if (!token) return;
    
    authAPI.verifyEmail(token)
      .then(() => setStatus('success'))
      .catch(() => setStatus('error'));
  }, [token]);

  return (
    <div className="min-h-screen bg-flux-darker flex items-center justify-center px-4">
      <div className="glass-card max-w-md w-full text-center">
        {status === 'verifying' && (
          <>
            <div className="w-10 h-10 border-2 border-flux-purple border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white font-bold">Verifying your email...</p>
          </>
        )}
        {status === 'success' && (
          <>
            <p className="text-green-400 text-5xl mb-4">✓</p>
            <p className="text-white font-bold text-xl mb-2">Email Verified!</p>
            <p className="text-gray-400 mb-6">Your account is now active.</p>
            <Link href="/login" className="btn-primary">Sign In</Link>
          </>
        )}
        {status === 'error' && (
          <>
            <p className="text-red-400 text-5xl mb-4">✕</p>
            <p className="text-white font-bold text-xl mb-2">Verification Failed</p>
            <p className="text-gray-400 mb-6">This link is invalid or expired.</p>
            <Link href="/" className="btn-primary">Go Home</Link>
          </>
        )}
      </div>
    </div>
  );
}
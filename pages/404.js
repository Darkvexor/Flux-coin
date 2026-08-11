import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-flux-darker flex items-center justify-center px-4">
      <div className="text-center">
        <p className="text-7xl font-black gradient-text mb-4">404</p>
        <h1 className="text-2xl font-bold text-white mb-2">Page Not Found</h1>
        <p className="text-gray-400 mb-8">This page doesn't exist or was moved.</p>
        <Link href="/" className="btn-primary">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
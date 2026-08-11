import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import { FiStar } from 'react-icons/fi';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(true);
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    let lastScroll = 0;
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll > lastScroll && currentScroll > 100) {
        setVisible(false);
      } else if (currentScroll < lastScroll) {
        setVisible(true);
      }
      lastScroll = currentScroll;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!mounted) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-40 bg-[#070B1A]/90 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
          <span className="text-xl font-black font-grotesk text-white">FLUX</span>
        </div>
      </nav>
    );
  }

  const scrollTo = (id) => {
    setMenuOpen(false);
    if (router.pathname !== '/') {
      router.push('/#' + id);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 bg-[#070B1A]/90 backdrop-blur-xl border-b border-white/5 transition-transform duration-300 ${visible ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] rounded-lg flex items-center justify-center">
            <span className="text-white font-black text-sm">F</span>
          </div>
          <span className="text-xl font-black font-grotesk text-white">FLUX</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <button onClick={() => scrollTo('about')} className="text-gray-400 hover:text-white text-sm uppercase tracking-wider transition-colors">About</button>
          <button onClick={() => scrollTo('tokenomics')} className="text-gray-400 hover:text-white text-sm uppercase tracking-wider transition-colors">Tokenomics</button>
          <button onClick={() => scrollTo('faq')} className="text-gray-400 hover:text-white text-sm uppercase tracking-wider transition-colors">FAQ</button>
        </div>

        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              <Link href="/dashboard" className="text-gray-400 hover:text-white text-sm transition-colors">Dashboard</Link>
              <Link href="/buy" className="px-5 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-black rounded-full text-sm font-bold hover:shadow-lg hover:shadow-amber-500/20 transition-all flex items-center gap-1">
                <FiStar size={14} /> Buy Flux
              </Link>
              <button onClick={logout} className="text-gray-500 hover:text-gray-300 text-sm transition-colors">Logout</button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-gray-400 hover:text-white text-sm transition-colors">Sign In</Link>
              <Link href="/register" className="px-5 py-2 bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] text-white rounded-full text-sm font-bold hover:shadow-lg hover:shadow-blue-500/20 transition-all">Create Account</Link>
            </>
          )}
        </div>

        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white p-2">
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-[#070B1A] border-t border-white/5 p-6 space-y-4">
          <button onClick={() => scrollTo('about')} className="block text-gray-400 w-full text-left py-2 uppercase tracking-wider text-sm">About</button>
          <button onClick={() => scrollTo('tokenomics')} className="block text-gray-400 w-full text-left py-2 uppercase tracking-wider text-sm">Tokenomics</button>
          <button onClick={() => scrollTo('faq')} className="block text-gray-400 w-full text-left py-2 uppercase tracking-wider text-sm">FAQ</button>
          {user ? (
            <>
              <Link href="/dashboard" className="block text-white py-2">Dashboard</Link>
              <Link href="/buy" className="block text-amber-400 py-2 font-bold">Buy Flux</Link>
              <button onClick={logout} className="block text-gray-500 py-2">Logout</button>
            </>
          ) : (
            <>
              <Link href="/login" className="block text-gray-400 py-2">Sign In</Link>
              <Link href="/register" className="block w-full text-center bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] text-white rounded-full py-3 font-bold">Create Account</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { adminAPI } from '../../lib/api';
import PreSaleProgress from '../../components/ui/PreSaleProgress';
import CountdownTimer from '../../components/ui/CountdownTimer';
import { LAUNCH_DATE } from '../../lib/constants';

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState(null);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const adminKey = localStorage.getItem('admin_key');
    if (!adminKey) {
      router.push('/admin-login');
      return;
    }
    setAuthorized(true);
    
    adminAPI.getStats()
      .then(({ data }) => setStats(data))
      .catch(() => {});
  }, []);

  if (!authorized || !stats) {
    return (
      <div className="min-h-screen bg-[#030014] flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-flux-purple border-t-flux-blue rounded-full animate-spin"></div>
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem('admin_key');
    router.push('/admin-login');
  };

  return (
    <div className="min-h-screen bg-[#030014]">
      <nav className="glass fixed top-0 left-0 right-0 z-50">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
          <span className="text-xl font-black">Flux<span className="gradient-text">Admin</span></span>
          <div className="flex gap-4 items-center">
            <Link href="/admin/users" className="text-gray-400 hover:text-white text-sm">Users</Link>
            <Link href="/admin/transactions" className="text-gray-400 hover:text-white text-sm">Transactions</Link>
            <Link href="/admin/settings" className="text-gray-400 hover:text-white text-sm">Settings</Link>
            <button onClick={handleLogout} className="text-red-400 hover:text-red-300 text-sm">Logout</button>
            <Link href="/" className="text-gray-400 hover:text-white text-sm">Site →</Link>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-20 px-4 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Admin Dashboard</h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Users', value: stats.totalUsers },
            { label: 'Verified Users', value: stats.verifiedUsers },
            { label: 'Total Sold', value: `${(stats.totalSold || 0).toLocaleString()} FLUX` },
            { label: 'Total Revenue', value: `$${(stats.totalRevenue || 0).toLocaleString()}` },
          ].map((stat, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
              <p className="text-2xl font-bold gradient-text">{stat.value}</p>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <PreSaleProgress />
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <CountdownTimer targetDate={LAUNCH_DATE} label="Time Until Public Launch" />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'View Users', href: '/admin/users', desc: 'Manage accounts' },
            { label: 'Transactions', href: '/admin/transactions', desc: 'View & confirm orders' },
            { label: 'Wallet Settings', href: '/admin/settings', desc: 'Update addresses' },
            { label: 'Site', href: '/', desc: 'View website' },
          ].map((link, i) => (
            <Link key={i} href={link.href} className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-all block">
              <h3 className="text-white font-bold mb-1">{link.label}</h3>
              <p className="text-gray-400 text-sm">{link.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
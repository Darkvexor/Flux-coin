import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { transactionAPI } from '../lib/api';
import Navbar from '../components/Navbar';
import { LAUNCH_DATE } from '../lib/constants';
import { FiTrendingUp, FiClock, FiDollarSign, FiPlus, FiLock } from 'react-icons/fi';

export default function Dashboard() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [balance, setBalance] = useState(0);
  const [totalInvested, setTotalInvested] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const refreshData = async () => {
    if (!user) return;
    try {
      const { data } = await transactionAPI.getHistory(user.id);
      if (data.transactions) {
        setTransactions(data.transactions);
        const completed = data.transactions
          .filter(tx => tx.status === 'completed')
          .reduce((sum, tx) => sum + (tx.amount || 0), 0);
        const invested = data.transactions
          .filter(tx => tx.status === 'completed')
          .reduce((sum, tx) => sum + (tx.totalUSD || 0), 0);
        setBalance(completed);
        setTotalInvested(invested);
      }
    } catch (e) {}
  };

  useEffect(() => {
    if (!loading && !user) { router.push('/login'); return; }
    if (user) {
      refreshData();
      const interval = setInterval(refreshData, 5000);
      return () => clearInterval(interval);
    }
  }, [user, loading]);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = LAUNCH_DATE - now;
      if (diff <= 0) { clearInterval(timer); return; }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (loading || !user) return <div className="min-h-screen flex items-center justify-center"><div className="w-10 h-10 border-2 border-[#3B82F6] border-t-[#8B5CF6] rounded-full animate-spin"></div></div>;

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-28 pb-20 px-4 relative">
        <div className="relative max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
            <div>
              <h1 className="text-4xl font-black text-white font-grotesk">Your <span className="gradient-text">Dashboard</span></h1>
              <p className="text-gray-400 mt-1">{user.email}</p>
            </div>
            <div className="flex gap-3 mt-4 md:mt-0">
              <Link href="/buy" className="btn-primary flex items-center gap-2"><FiPlus /> Buy Flux</Link>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 glass-card relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6]"></div>
              <p className="text-gray-400 text-sm font-medium mb-2">YOUR FLUX BALANCE</p>
              <p className="text-6xl font-black gradient-text mb-2">{balance.toLocaleString()} <span className="text-3xl">FLUX</span></p>
              <p className="text-gray-500">≈ ${balance.toLocaleString()} USD</p>
              <div className="flex gap-3 mt-8">
                <Link href="/buy" className="btn-primary">Buy Flux</Link>
                <button disabled className="btn-glass opacity-50 cursor-not-allowed flex items-center gap-2"><FiLock /> Sell Locked</button>
              </div>
            </div>

            <div className="glass-card text-center">
              <FiClock className="text-[#00D4FF] text-2xl mx-auto mb-3" />
              <p className="text-gray-400 text-xs font-medium mb-3">SELLING UNLOCKS IN</p>
              <div className="grid grid-cols-4 gap-2 mb-4">
                {[{ value: timeLeft.days, label: 'D' },{ value: timeLeft.hours, label: 'H' },{ value: timeLeft.minutes, label: 'M' },{ value: timeLeft.seconds, label: 'S' }].map((item, i) => (
                  <div key={i}><div className="bg-white/[0.03] border border-white/[0.08] rounded-lg py-2"><span className="text-lg font-black gradient-text">{String(item.value).padStart(2, '0')}</span></div><span className="text-[10px] text-gray-500 mt-1 block">{item.label}</span></div>
                ))}
              </div>
              <p className="text-gray-500 text-xs">January 1st, 2027</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-6">
            {[
              { icon: <FiDollarSign />, label: 'Total Invested', value: `$${totalInvested.toLocaleString()}` },
              { icon: <FiTrendingUp />, label: 'Price Per Flux', value: '$1.00' },
              { icon: <FiClock />, label: 'Launch Date', value: 'Jan 2027' },
            ].map((stat, i) => (
              <div key={i} className="glass-card text-center"><div className="text-[#00D4FF] mb-2 flex justify-center">{stat.icon}</div><p className="text-xl font-bold text-white">{stat.value}</p><p className="text-gray-500 text-xs mt-1">{stat.label}</p></div>
            ))}
          </div>

          <div className="glass-card mt-6">
            <h2 className="text-xl font-bold text-white mb-6"><FiTrendingUp className="text-[#00D4FF] inline mr-2" />Transaction History</h2>
            {transactions.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg mb-2">No transactions yet</p>
                <Link href="/buy" className="btn-primary inline-flex items-center gap-2"><FiPlus /> Buy Your First Flux</Link>
              </div>
            ) : (
              <div className="space-y-3">
                {transactions.map((tx) => (
                  <div key={tx._id} className="flex items-center justify-between bg-white/[0.03] rounded-xl p-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${tx.status === 'completed' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}><FiPlus /></div>
                      <div><p className="text-white font-medium">{tx.amount?.toLocaleString()} FLUX</p><p className="text-gray-500 text-sm">{new Date(tx.createdAt).toLocaleDateString()}</p></div>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-bold">${tx.totalUSD?.toLocaleString()}</p>
                      <span className={`text-xs px-2 py-1 rounded-full ${tx.status === 'completed' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>{tx.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
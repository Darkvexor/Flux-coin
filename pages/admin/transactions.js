import { useState, useEffect } from 'react';
import Link from 'next/link';
import { adminAPI } from '../../lib/api';
import toast from 'react-hot-toast';

export default function AdminTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('pending');

  const fetchTransactions = async () => {
    try {
      const params = filter !== 'all' ? { status: filter } : {};
      const { data } = await adminAPI.getTransactions(params);
      setTransactions(data.transactions);
    } catch (error) {
      // Silent refresh
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchTransactions();
    // Auto-refresh every 5 seconds
    const interval = setInterval(fetchTransactions, 5000);
    return () => clearInterval(interval);
  }, [filter]);

  const handleConfirm = async (txId) => {
    try {
      await adminAPI.confirmPayment(txId, { transactionHash: 'manual-confirm' });
      toast.success('Payment confirmed! Flux credited to user.');
      fetchTransactions();
    } catch (error) {
      toast.error('Failed to confirm payment');
    }
  };

  const statusColors = {
    pending: 'bg-amber-500/20 text-amber-400',
    confirmed: 'bg-blue-500/20 text-blue-400',
    completed: 'bg-emerald-500/20 text-emerald-400',
    failed: 'bg-red-500/20 text-red-400',
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <nav className="glass fixed top-0 left-0 right-0 z-50">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
          <Link href="/admin" className="text-xl font-black font-grotesk">Flux<span className="gradient-text">Admin</span></Link>
          <div className="flex gap-4">
            <Link href="/admin" className="text-gray-400 hover:text-white text-sm">Dashboard</Link>
            <Link href="/admin/users" className="text-gray-400 hover:text-white text-sm">Users</Link>
            <Link href="/admin/settings" className="text-gray-400 hover:text-white text-sm">Settings</Link>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-20 px-4 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white font-grotesk">
            Transactions ({transactions.length})
            <span className="text-xs text-gray-500 ml-2 font-normal">auto-refreshes</span>
          </h1>
          
          <div className="flex gap-2">
            {['all', 'pending', 'completed'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-xl text-sm capitalize font-medium transition-all ${
                  filter === f ? 'bg-[#3B82F6] text-white' : 'bg-white/[0.03] border border-white/[0.08] text-gray-400 hover:bg-white/[0.06]'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {loading && transactions.length === 0 ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-2 border-[#3B82F6] border-t-[#8B5CF6] rounded-full animate-spin"></div>
          </div>
        ) : transactions.length === 0 ? (
          <div className="glass-card p-12 text-center">
            <p className="text-gray-500 text-lg">No {filter} transactions</p>
          </div>
        ) : (
          <div className="space-y-3">
            {transactions.map((tx) => (
              <div key={tx._id} className="glass-card p-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <p className="text-white font-bold">
                      {tx.userId?.email || 'N/A'} - <span className="gradient-text">{tx.amount?.toLocaleString()} FLUX</span>
                    </p>
                    <p className="text-gray-500 text-sm">
                      {tx.paymentMethod} • ${tx.totalUSD?.toLocaleString()} • {new Date(tx.createdAt).toLocaleDateString()}
                    </p>
                    {tx.paymentAddress && (
                      <p className="text-gray-600 text-xs mt-1 truncate max-w-xs font-mono">To: {tx.paymentAddress.slice(0, 20)}...</p>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusColors[tx.status]}`}>
                      {tx.status.toUpperCase()}
                    </span>
                    
                    {tx.status === 'pending' && (
                      <button
                        onClick={() => handleConfirm(tx._id)}
                        className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold text-sm transition-all"
                      >
                        ✓ Confirm Payment
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
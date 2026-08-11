import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { adminAPI } from '../../lib/api';
import toast from 'react-hot-toast';

export default function AdminUsers() {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creditUser, setCreditUser] = useState({ id: '', amount: 0 });
  const [showCredit, setShowCredit] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('admin_key')) {
      router.push('/admin-login');
      return;
    }
    adminAPI.getUsers()
      .then(({ data }) => setUsers(data.users))
      .catch(() => toast.error('Failed to load users'))
      .finally(() => setLoading(false));
  }, []);

  const handleCredit = async (e) => {
    e.preventDefault();
    try {
      await adminAPI.creditUser({ userId: creditUser.id, amount: Number(creditUser.amount) });
      toast.success('User credited!');
      setShowCredit(false);
      const { data } = await adminAPI.getUsers();
      setUsers(data.users);
    } catch (error) {
      toast.error('Failed to credit user');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030014] flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-flux-purple border-t-flux-blue rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030014]">
      <nav className="glass fixed top-0 left-0 right-0 z-50">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
          <Link href="/admin" className="text-xl font-black">Flux<span className="gradient-text">Admin</span></Link>
          <div className="flex gap-4">
            <Link href="/admin" className="text-gray-400 hover:text-white text-sm">Dashboard</Link>
            <Link href="/admin/transactions" className="text-gray-400 hover:text-white text-sm">Transactions</Link>
            <Link href="/admin/settings" className="text-gray-400 hover:text-white text-sm">Settings</Link>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-20 px-4 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Users ({users.length})</h1>
          <button onClick={() => setShowCredit(!showCredit)} className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white hover:bg-white/10">
            {showCredit ? 'Cancel' : 'Credit User'}
          </button>
        </div>

        {showCredit && (
          <form onSubmit={handleCredit} className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 flex gap-4 items-end">
            <div className="flex-1">
              <label className="text-sm text-gray-400 block mb-1">User ID</label>
              <input type="text" value={creditUser.id} onChange={(e) => setCreditUser({ ...creditUser, id: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-flux-purple" placeholder="User ID" required />
            </div>
            <div className="w-40">
              <label className="text-sm text-gray-400 block mb-1">Flux Amount</label>
              <input type="number" value={creditUser.amount} onChange={(e) => setCreditUser({ ...creditUser, amount: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-flux-purple" required />
            </div>
            <button type="submit" className="px-6 py-3 bg-gradient-to-r from-flux-purple to-flux-blue rounded-xl font-bold text-white">Credit</button>
          </form>
        )}

        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10">
                <th className="p-4 text-gray-400 text-sm">Username</th>
                <th className="p-4 text-gray-400 text-sm">Email</th>
                <th className="p-4 text-gray-400 text-sm">Balance</th>
                <th className="p-4 text-gray-400 text-sm">Verified</th>
                <th className="p-4 text-gray-400 text-sm">Joined</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="p-4 text-white font-medium">{u.username}</td>
                  <td className="p-4 text-gray-400">{u.email}</td>
                  <td className="p-4 text-flux-blue font-bold">{u.balance?.toLocaleString() || 0} FLUX</td>
                  <td className="p-4">{u.isVerified ? <span className="text-green-400">✓</span> : <span className="text-yellow-400">Pending</span>}</td>
                  <td className="p-4 text-gray-500 text-sm">{new Date(u.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
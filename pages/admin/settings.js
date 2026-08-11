import { useState } from 'react';
import Link from 'next/link';
import { WALLET_ADDRESSES } from '../../lib/constants';
import { adminAPI } from '../../lib/api';
import toast from 'react-hot-toast';

export default function AdminSettings() {
  const [wallets, setWallets] = useState(WALLET_ADDRESSES);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      const walletsArray = Object.entries(wallets).map(([currency, address]) => ({
        currency,
        address,
      }));
      await adminAPI.updateWallets({ wallets: walletsArray });
      toast.success('Wallet addresses updated');
    } catch (error) {
      toast.error('Failed to update wallets');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-flux-darker">
      <nav className="glass fixed top-0 left-0 right-0 z-50">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
          <Link href="/admin" className="text-xl font-black">Flux<span className="gradient-text">Admin</span></Link>
          <div className="flex gap-4">
            <Link href="/admin" className="text-gray-400 hover:text-white text-sm">Dashboard</Link>
            <Link href="/admin/users" className="text-gray-400 hover:text-white text-sm">Users</Link>
            <Link href="/admin/transactions" className="text-gray-400 hover:text-white text-sm">Transactions</Link>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-20 px-4 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-2">Wallet Settings</h1>
        <p className="text-gray-400 mb-8">Update payment wallet addresses</p>

        <div className="glass-card space-y-4">
          {Object.entries(wallets).map(([currency, address]) => (
            <div key={currency}>
              <label className="text-sm text-gray-400 mb-1 block font-bold">{currency}</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setWallets({ ...wallets, [currency]: e.target.value })}
                className="input-field font-mono text-sm"
              />
            </div>
          ))}

          <button onClick={handleSave} disabled={saving} className="btn-primary w-full">
            {saving ? 'Saving...' : 'Save Wallet Addresses'}
          </button>
        </div>

        <div className="glass-card mt-6">
          <h3 className="text-white font-bold mb-2">Export Data</h3>
          <p className="text-gray-400 text-sm mb-4">Download all user data as CSV</p>
          <button 
            onClick={() => adminAPI.exportUsers()}
            className="btn-secondary text-sm"
          >
            Export Users CSV
          </button>
        </div>
      </div>
    </div>
  );
}
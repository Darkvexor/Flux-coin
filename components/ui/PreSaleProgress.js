import { useState, useEffect } from 'react';
import { transactionAPI } from '../../lib/api';
import { TOTAL_PRESALE_SUPPLY } from '../../lib/constants';

export default function PreSaleProgress() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    transactionAPI.getPreSaleStats()
      .then(({ data }) => setStats(data))
      .catch(() => setStats({ soldAmount: 0, remaining: TOTAL_PRESALE_SUPPLY }));
  }, []);

  if (!stats) return <div className="h-20 animate-pulse bg-white/[0.02] rounded-2xl"></div>;

  const percentage = ((stats.soldAmount / TOTAL_PRESALE_SUPPLY) * 100).toFixed(1);

  return (
    <div>
      <div className="flex justify-between items-end mb-4">
        <div>
          <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">Pre-Sale Progress</p>
          <p className="text-4xl font-black text-white font-grotesk">{percentage}%</p>
        </div>
        <div className="text-right">
          <p className="text-gray-400 text-sm">{stats.soldAmount?.toLocaleString() || 0} of {TOTAL_PRESALE_SUPPLY.toLocaleString()} FLUX</p>
          <p className="text-amber-400 text-sm font-bold">${(stats.soldAmount || 0).toLocaleString()} raised</p>
        </div>
      </div>
      
      <div className="w-full h-2 bg-white/[0.05] rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-[#3B82F6] via-[#8B5CF6] to-amber-400 rounded-full transition-all duration-1000" style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  );
}
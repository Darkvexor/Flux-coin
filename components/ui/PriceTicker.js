import { useState, useEffect } from 'react';
import { FiTrendingUp } from 'react-icons/fi';

export default function PriceTicker() {
  const [prices] = useState([
    { label: 'FLUX/USD', value: '$1.00', change: '+0.00%', up: true },
    { label: 'Market Cap', value: '$20M', change: 'Target', up: true },
    { label: 'Pre-Sale Sold', value: '3M FLUX', change: '60%', up: true },
    { label: 'Launch', value: 'Jan 2027', change: 'Upcoming', up: true },
  ]);

  return (
    <div className="bg-[#0a0a0f] border-b border-white/5 overflow-hidden">
      <div className="flex gap-8 animate-scroll">
        {[...prices, ...prices].map((item, i) => (
          <div key={i} className="flex items-center gap-3 py-2 px-4 whitespace-nowrap">
            <span className="text-gray-500 text-xs font-medium">{item.label}</span>
            <span className="text-white text-sm font-bold">{item.value}</span>
            <span className={`text-xs font-medium ${item.up ? 'text-emerald-400' : 'text-red-400'}`}>
              <FiTrendingUp className="inline mr-1" size={12} />
              {item.change}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
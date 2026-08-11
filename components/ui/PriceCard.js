import { FiTrendingUp, FiBarChart2, FiDollarSign, FiClock } from 'react-icons/fi';

export default function PriceCard() {
  const stats = [
    { icon: <FiDollarSign />, label: 'FLUX Price', value: '$1.00', sub: 'Pre-Sale', color: 'text-amber-400' },
    { icon: <FiBarChart2 />, label: 'Market Cap', value: '$20M', sub: 'Target', color: 'text-blue-400' },
    { icon: <FiTrendingUp />, label: 'Launch Price', value: 'TBD', sub: 'Jan 2027', color: 'text-emerald-400' },
    { icon: <FiClock />, label: 'Trading Starts', value: 'Jan 1', sub: '2027', color: 'text-purple-400' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
      {stats.map((s, i) => (
        <div key={i} className="glass-card text-center p-5">
          <div className={`${s.color} mb-2 flex justify-center text-lg`}>{s.icon}</div>
          <p className="text-2xl font-black text-white">{s.value}</p>
          <p className="text-gray-500 text-xs mt-1">{s.label}</p>
          <p className="text-gray-600 text-xs">{s.sub}</p>
        </div>
      ))}
    </div>
  );
}
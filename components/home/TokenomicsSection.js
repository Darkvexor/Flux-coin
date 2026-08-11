import { TOKENOMICS, TOTAL_MARKET_CAP } from '../../lib/constants';

export default function TokenomicsSection() {
  const data = [
    {
      label: TOKENOMICS.earlyInvestors.label,
      amount: '10,000,000 FLUX',
      percentage: TOKENOMICS.earlyInvestors.percentage,
      color: 'from-flux-purple to-flux-purple',
      sold: true,
    },
    {
      label: TOKENOMICS.publicPresale.label,
      amount: '5,000,000 FLUX',
      percentage: TOKENOMICS.publicPresale.percentage,
      color: 'from-flux-purple to-flux-blue',
      sold: false,
    },
    {
      label: TOKENOMICS.locked.label,
      amount: '5,000,000 FLUX',
      percentage: TOKENOMICS.locked.percentage,
      color: 'from-gray-600 to-gray-500',
      locked: true,
    },
  ];

  return (
    <section id="tokenomics" className="py-20 px-4 bg-flux-dark/50">
      <div className="max-w-4xl mx-auto">
        <h2 className="section-heading">Tokenomics</h2>
        <p className="section-subheading">
          Total Market Cap: <span className="text-white font-bold">${TOTAL_MARKET_CAP.toLocaleString()} USD</span>
        </p>

        {/* Distribution Chart */}
        <div className="glass-card mb-8">
          <div className="flex h-8 rounded-full overflow-hidden mb-6">
            <div 
              className="bg-flux-purple flex items-center justify-center text-xs font-bold text-white"
              style={{ width: '50%' }}
            >
              50%
            </div>
            <div 
              className="bg-gradient-to-r from-flux-purple to-flux-blue flex items-center justify-center text-xs font-bold text-white"
              style={{ width: '25%' }}
            >
              25%
            </div>
            <div 
              className="bg-gray-600 flex items-center justify-center text-xs font-bold text-white"
              style={{ width: '25%' }}
            >
              25%
            </div>
          </div>

          <div className="space-y-4">
            {data.map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded bg-gradient-to-r ${item.color}`}></div>
                  <div>
                    <p className="text-white font-medium">{item.label}</p>
                    <p className="text-gray-500 text-sm">{item.amount}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xl font-bold gradient-text">{item.percentage}%</span>
                  <div className="flex gap-2 mt-1">
                    {item.sold && (
                      <span className="text-xs px-2 py-0.5 bg-green-500/20 text-green-400 rounded-full">Sold</span>
                    )}
                    {!item.sold && !item.locked && (
                      <span className="text-xs px-2 py-0.5 bg-flux-blue/20 text-flux-blue rounded-full animate-pulse">Available</span>
                    )}
                    {item.locked && (
                      <span className="text-xs px-2 py-0.5 bg-yellow-500/20 text-yellow-400 rounded-full">🔒 Locked</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="glass-card text-center">
            <p className="text-3xl font-black gradient-text mb-1">$1.00</p>
            <p className="text-gray-400 text-sm">Pre-Sale Price per Flux</p>
          </div>
          <div className="glass-card text-center">
            <p className="text-3xl font-black gradient-text mb-1">$20M</p>
            <p className="text-gray-400 text-sm">Market Cap at Launch</p>
          </div>
          <div className="glass-card text-center">
            <p className="text-3xl font-black gradient-text mb-1">20M</p>
            <p className="text-gray-400 text-sm">Total Supply of Flux</p>
          </div>
        </div>
      </div>
    </section>
  );
}
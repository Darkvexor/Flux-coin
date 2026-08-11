export default function RoadmapSection() {
  const milestones = [
    {
      phase: 'Phase 1',
      title: 'Pre-Sale Launch',
      date: 'Now - Dec 2026',
      desc: 'Early adopters secure Flux at $1. Building the foundation. 5M coins available to the public.',
      status: 'active',
    },
    {
      phase: 'Phase 2',
      title: 'Public Launch',
      date: 'January 1, 2027',
      desc: 'Full public release. 5M locked coins released. Trading begins. Selling enabled for all holders.',
      status: 'upcoming',
    },
    {
      phase: 'Phase 3',
      title: 'Exchange Listings',
      date: 'Q1 2027',
      desc: 'Major centralized and decentralized exchange listings. Liquidity pools established. Global accessibility.',
      status: 'upcoming',
    },
    {
      phase: 'Phase 4',
      title: 'Ecosystem Expansion',
      date: 'Q2-Q3 2027',
      desc: 'DeFi integration, staking rewards, partnerships, merchant adoption, and mobile wallet release.',
      status: 'upcoming',
    },
    {
      phase: 'Phase 5',
      title: 'Global Dominance',
      date: 'Q4 2027+',
      desc: 'Worldwide adoption. Flux becomes a top 10 cryptocurrency. Mass market penetration achieved.',
      status: 'upcoming',
    },
  ];

  return (
    <section id="roadmap" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="section-heading">Roadmap to Dominance</h2>
        <p className="section-subheading">
          Our strategic path to becoming the world's #1 cryptocurrency.
        </p>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-flux-purple via-flux-blue to-gray-600 md:-translate-x-px"></div>

          <div className="space-y-8">
            {milestones.map((item, i) => (
              <div key={i} className={`relative flex items-start gap-6 ${
                i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}>
                {/* Dot */}
                <div className={`absolute left-4 md:left-1/2 w-4 h-4 rounded-full border-2 -translate-x-1/2 z-10 ${
                  item.status === 'active' 
                    ? 'bg-flux-blue border-flux-blue animate-pulse' 
                    : 'bg-flux-darker border-gray-600'
                }`}></div>

                {/* Content */}
                <div className={`ml-12 md:ml-0 md:w-1/2 ${i % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                  <div className={`glass-card ${
                    item.status === 'active' ? 'border-flux-purple/50' : ''
                  }`}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                        item.status === 'active' 
                          ? 'bg-flux-blue/20 text-flux-blue' 
                          : 'bg-gray-600/20 text-gray-400'
                      }`}>
                        {item.phase}
                      </span>
                      {item.status === 'active' && (
                        <span className="text-xs text-green-400 animate-pulse">● Live</span>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-white">{item.title}</h3>
                    <p className="text-gray-400 text-sm mt-1">{item.desc}</p>
                    <p className="text-flux-blue text-sm mt-3 font-medium">{item.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
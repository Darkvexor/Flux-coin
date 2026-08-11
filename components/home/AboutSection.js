export default function AboutSection() {
  const features = [
    {
      title: 'Lightning Fast',
      desc: 'Transactions confirmed in seconds, not minutes. Built for global scale with enterprise-grade infrastructure.',
      icon: '⚡',
    },
    {
      title: 'Near-Zero Fees',
      desc: 'Send money anywhere in the world for fractions of a cent. No more $50 Bitcoin transaction fees.',
      icon: '💸',
    },
    {
      title: 'Sustainable Mining',
      desc: 'Eco-friendly consensus mechanism that uses 99.9% less energy than Bitcoin mining. Green by design.',
      icon: '🌱',
    },
    {
      title: 'Massively Scalable',
      desc: 'Processes thousands of transactions per second. Ready for global adoption from day one.',
      icon: '🚀',
    },
    {
      title: 'Secure & Decentralized',
      desc: 'Military-grade encryption with true decentralization. Your coins, your control.',
      icon: '🔐',
    },
    {
      title: 'Smart Contract Ready',
      desc: 'Full DeFi ecosystem support. Stake, lend, and earn with Flux on launch day.',
      icon: '📜',
    },
  ];

  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="section-heading">Why Flux Will Surpass Bitcoin</h2>
        <p className="section-subheading">
          Bitcoin proved digital currency works. Flux makes it perfect for everyone.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, i) => (
            <div key={i} className="glass-card hover:glow transition-all duration-300">
              <span className="text-3xl mb-3 block">{item.icon}</span>
              <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="glass-card mt-10 text-center">
          <p className="text-gray-400 text-sm max-w-2xl mx-auto">
            <span className="text-white font-bold">Our Mission:</span> Flux is positioned to become 
            the dominant cryptocurrency worldwide. With a $20M market cap strategy, faster transactions, 
            lower fees, and sustainable technology, Flux has a clear path to surpass Bitcoin and become 
            the global standard for digital currency.
          </p>
        </div>
      </div>
    </section>
  );
}
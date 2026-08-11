import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthContext';

export default function HeroSection() {
  const { user } = useAuth();
  const router = useRouter();

  const handleBuyClick = () => {
    if (!user) {
      router.push('/register?redirect=buy');
    } else {
      router.push('/buy');
    }
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative pt-32 pb-20 px-4 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-flux-purple/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-flux-blue/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-flux-purple/5 to-flux-blue/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-5xl mx-auto text-center">
        {/* Live Badge */}
        <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          <span className="text-sm text-gray-300">Pre-Sale Now Live • $1 per Flux</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6">
          <span className="text-white">The Future of</span>
          <br />
          <span className="gradient-text">Digital Currency</span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-400 mb-4 max-w-3xl mx-auto">
          Built to surpass Bitcoin. Faster transactions, lower fees, and a sustainable future.
        </p>

        <p className="text-lg text-gray-500 mb-10 max-w-2xl mx-auto">
          Flux is positioned to become the dominant cryptocurrency worldwide with a clear path to market dominance.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <button onClick={handleBuyClick} className="btn-primary text-lg px-10 py-4">
            Buy Flux Now →
          </button>
          <button onClick={() => scrollTo('about')} className="btn-secondary text-lg px-10 py-4">
            Learn More
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
          {[
            { label: 'Pre-Sale Price', value: '$1.00', sub: 'per Flux coin' },
            { label: 'Market Cap Target', value: '$20M', sub: 'at public launch' },
            { label: 'Public Launch', value: 'Jan 1, 2027', sub: 'trading begins' },
          ].map((stat, i) => (
            <div key={i} className="glass-card text-center">
              <div className="text-2xl font-bold gradient-text mb-1">{stat.value}</div>
              <div className="text-sm text-gray-300 font-medium">{stat.label}</div>
              <div className="text-xs text-gray-500 mt-1">{stat.sub}</div>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="mt-16">
          <div className="w-6 h-10 rounded-full border-2 border-white/20 mx-auto flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-flux-blue rounded-full animate-bounce"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
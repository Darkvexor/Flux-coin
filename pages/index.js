import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import { LAUNCH_DATE } from '../lib/constants';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PriceCard from '../components/ui/PriceCard';
import PreSaleProgress from '../components/ui/PreSaleProgress';
import CountdownTimer from '../components/ui/CountdownTimer';
import { FiZap, FiDollarSign, FiShield, FiArrowRight, FiLock, FiTrendingUp, FiGlobe, FiStar, FiClock, FiCloud } from 'react-icons/fi';

export default function Home() {
  const router = useRouter();
  const { user } = useAuth();

  const handleBuy = () => {
    if (!user) router.push('/register?redirect=buy');
    else router.push('/buy');
  };

  return (
    <div className="min-h-screen text-white">

      <Navbar />

      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-24">
        <div className="absolute inset-0">
          <div className="absolute top-10 -left-20 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[150px] animate-pulse"></div>
          <div className="absolute bottom-10 -right-20 w-[500px] h-[500px] bg-purple-500/8 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-amber-500/5 rounded-full blur-[100px]" style={{ animationDelay: '4s' }}></div>
        </div>

        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }}></div>

        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-32">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-3 glass rounded-full px-5 py-2 mb-10 border border-amber-500/20">
              <span className="w-2.5 h-2.5 bg-amber-400 rounded-full animate-pulse shadow-lg shadow-amber-400/50"></span>
              <span className="text-gray-300 text-sm font-medium">Pre-Sale Is Live</span>
              <span className="text-amber-400 font-bold">$1.00/FLUX</span>
            </div>

            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.9] mb-8 font-grotesk">
              <span className="text-white">Bitcoin has ruled</span>
              <br />
              <span className="gradient-text">long enough.</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mb-12 leading-relaxed">
              Flux is the first blockchain <span className="text-white font-semibold">engineered to dethrone it.</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-20">
              <button onClick={handleBuy} className="btn-gold group text-lg px-10 py-5">
                <span className="flex items-center gap-2">
                  <FiStar /> Buy Flux Now
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              <a href="#about" className="btn-glass text-lg px-10 py-5">Why Flux</a>
            </div>

            <PriceCard />
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-5 h-8 rounded-full border-2 border-white/10 flex justify-center pt-2">
            <div className="w-1 h-1.5 bg-white/50 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* ─── PRE-SALE PROGRESS ─── */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="glass-card p-8 border border-blue-500/10">
            <PreSaleProgress />
          </div>
        </div>
      </section>

      {/* ─── ABOUT ─── */}
      <section id="about" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-amber-400 text-sm uppercase tracking-widest mb-4 font-bold">The Competition</p>
            <h2 className="text-5xl md:text-7xl font-black mb-6 font-grotesk">
              Why Flux <span className="gradient-text">Competes</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Bitcoin proved crypto works. Flux proves it can work for everyone.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <FiZap className="text-2xl" />, title: '10,000 TPS', desc: 'Bitcoin manages 7. We\'re built for a world that won\'t wait.', gradient: 'from-blue-500 to-cyan-400' },
              { icon: <FiDollarSign className="text-2xl" />, title: '$0.001 Fees', desc: 'While Bitcoin charges $50 per transaction, Flux costs less than a penny.', gradient: 'from-emerald-500 to-green-400' },
              { icon: <FiClock className="text-2xl" />, title: '2-Second Finality', desc: 'Bitcoin takes an hour to truly confirm. Flux takes 2 seconds.', gradient: 'from-purple-500 to-violet-400' },
              { icon: <FiCloud className="text-2xl" />, title: 'Green by Design', desc: 'No wasteful mining. Flux uses 99.9% less energy than Bitcoin.', gradient: 'from-amber-500 to-orange-400' },
            ].map((item, i) => (
              <div key={i} className="glass-card-hover text-center group">
                <div className={`w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="glass-card mt-10 text-center border border-blue-500/10">
            <p className="text-gray-300 text-lg font-medium">
              "Bitcoin proved crypto works. <span className="gradient-text font-bold">Flux proves it can work for everyone.</span>"
            </p>
          </div>
        </div>
      </section>

      {/* ─── COUNTDOWN ─── */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-amber-500/5"></div>
        <div className="relative max-w-3xl mx-auto">
          <div className="glass-card p-12 text-center border border-blue-500/10">
            <CountdownTimer targetDate={LAUNCH_DATE} label="The Challenger Enters The Ring In" />
          </div>
        </div>
      </section>

      {/* ─── TOKENOMICS ─── */}
      <section id="tokenomics" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-amber-400 text-sm uppercase tracking-widest mb-4 font-bold">Tokenomics</p>
            <h2 className="text-5xl md:text-7xl font-black mb-4 font-grotesk">
              $20M <span className="gradient-text">Market Cap</span>
            </h2>
            <p className="text-gray-400 text-lg">20,000,000 FLUX Total Supply</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative w-64 h-64 mx-auto">
              <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
                <circle cx="100" cy="100" r="70" fill="none" stroke="#3B82F6" strokeWidth="25" strokeDasharray="219.9 439.8" />
                <circle cx="100" cy="100" r="70" fill="none" stroke="url(#g)" strokeWidth="25" strokeDasharray="109.9 439.8" strokeDashoffset="-219.9" />
                <circle cx="100" cy="100" r="70" fill="none" stroke="#1E293B" strokeWidth="25" strokeDasharray="109.9 439.8" strokeDashoffset="-329.8" />
                <defs>
                  <linearGradient id="g"><stop offset="0%" stopColor="#3B82F6"/><stop offset="100%" stopColor="#8B5CF6"/></linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center"><div className="text-4xl font-black gradient-text">20M</div><div className="text-gray-500 text-xs">Total Supply</div></div>
              </div>
            </div>

            <div className="space-y-3">
              {[
                { label: 'Early Investors', pct: '50%', amount: '10M FLUX', color: '#3B82F6', badge: 'Sold' },
                { label: 'Public Pre-Sale', pct: '25%', amount: '5M FLUX', color: '#8B5CF6', badge: 'Available', gold: true },
                { label: 'Locked (Jan 2027)', pct: '25%', amount: '5M FLUX', color: '#334155', badge: 'Locked' },
              ].map((item, i) => (
                <div key={i} className={`glass-card flex items-center justify-between ${item.gold ? 'border-amber-500/20' : ''}`}>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full shadow-lg" style={{ backgroundColor: item.color }}></div>
                    <div>
                      <span className="text-white font-medium">{item.label}</span>
                      <span className={`text-xs ml-2 px-2 py-0.5 rounded-full ${item.gold ? 'bg-amber-500/20 text-amber-400' : 'bg-white/5 text-gray-400'}`}>{item.badge}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-white font-bold">{item.pct}</span>
                    <p className="text-gray-500 text-xs">{item.amount}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section id="faq" className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-amber-400 text-sm uppercase tracking-widest mb-4 font-bold">FAQ</p>
            <h2 className="text-5xl md:text-7xl font-black font-grotesk">Got <span className="gradient-text">Questions?</span></h2>
          </div>
          <div className="space-y-4">
            {[
              { q: 'Why does Bitcoin need a competitor?', a: 'Bitcoin has been the king for over a decade, but it was never meant to be the final answer. It\'s slow, expensive, and energy-hungry. Every market needs competition to evolve. Flux is the first blockchain purpose-built to challenge Bitcoin\'s throne — and win.' },
              { q: 'What makes Flux capable of surpassing Bitcoin?', a: 'Technology that Bitcoin can\'t match. 10,000 transactions per second vs 7. Fees under a penny vs $50+. Confirmation in 2 seconds vs an hour. Flux was engineered from scratch to solve every limitation holding Bitcoin back.' },
              { q: 'Is Flux just another "Bitcoin killer"?', a: 'We don\'t use that term lightly. Hundreds of projects have claimed it. None had the technology, the tokenomics, or the strategy. Flux does. $20M market cap. Clear roadmap. Real infrastructure. This isn\'t hype — it\'s engineering.' },
              { q: 'What happens January 1st, 2027?', a: 'The challenger enters the ring. Public launch. Trading goes live. Exchange listings begin. The world meets the first real competitor Bitcoin has ever faced.' },
            ].map((item, i) => (
              <div key={i} className="glass-card hover:border-blue-500/10 transition-all">
                <h3 className="text-lg font-bold text-white mb-3">{item.q}</h3>
                <p className="text-gray-400 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-purple-500/5 to-amber-500/5"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px]"></div>
        
        <div className="relative max-w-3xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-black mb-6 font-grotesk">
            The challenger <span className="gradient-text">is here</span>
          </h2>
          <p className="text-xl text-gray-400 mb-4">Pre-sale price: <span className="text-amber-400 font-bold">$1.00</span> per Flux</p>
          <p className="text-gray-500 mb-12">Join before January 2027. Be part of the revolution.</p>
          <button onClick={handleBuy} className="btn-gold text-xl px-12 py-5 flex items-center gap-2 mx-auto">
            <FiStar /> Buy Flux Now <FiArrowRight />
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
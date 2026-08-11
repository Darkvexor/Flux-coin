import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthContext';

export default function BuyCTASection() {
  const { user } = useAuth();
  const router = useRouter();

  const handleClick = () => {
    if (!user) {
      router.push('/register?redirect=buy');
    } else {
      router.push('/buy');
    }
  };

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-flux-purple/10 to-flux-blue/5"></div>
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-flux-purple/10 rounded-full blur-3xl"></div>
      
      <div className="relative max-w-2xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-black mb-4">
          Ready to Join the <span className="gradient-text">Revolution?</span>
        </h2>
        <p className="text-xl text-gray-400 mb-4">
          5,000,000 Flux coins available now at pre-sale price
        </p>
        <p className="text-3xl font-black gradient-text mb-8">
          $1.00 per Flux
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={handleClick} className="btn-primary text-xl px-12 py-5">
            Buy Flux Now →
          </button>
          <a href="#tokenomics" className="btn-secondary text-xl px-12 py-5">
            Learn More
          </a>
        </div>

        <p className="text-gray-500 text-sm mt-6">
          Minimum purchase: 10 Flux ($10) • Maximum: 5,000 Flux ($5,000) per transaction
        </p>
      </div>
    </section>
  );
}
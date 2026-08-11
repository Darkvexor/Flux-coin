import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import { transactionAPI } from '../lib/api';
import { PAYMENT_METHODS, MIN_PURCHASE, MAX_PURCHASE, FLUX_PRICE_USD, WALLET_ADDRESSES } from '../lib/constants';
import Navbar from '../components/Navbar';
import toast from 'react-hot-toast';
import { FiCopy, FiCheck, FiArrowLeft, FiDollarSign } from 'react-icons/fi';

export default function Buy() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('SOL');
  const [submitting, setSubmitting] = useState(false);
  const [transaction, setTransaction] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!loading && !user) { router.push('/register?redirect=buy'); }
  }, [user, loading]);

  const numAmount = Number(amount) || 0;
  const totalCost = numAmount * FLUX_PRICE_USD;
  const walletAddress = WALLET_ADDRESSES[paymentMethod];

  const handleBuy = async () => {
    if (!user) { toast.error('Please login first'); return; }
    if (numAmount < MIN_PURCHASE || numAmount > MAX_PURCHASE) { 
      toast.error(`Amount must be between ${MIN_PURCHASE.toLocaleString()} and ${MAX_PURCHASE.toLocaleString()} Flux`); 
      return; 
    }
    setSubmitting(true);
    try {
      const { data } = await transactionAPI.purchase({ amount: numAmount, paymentMethod, userId: user.id });
      setTransaction(data.transaction);
      toast.success('Order created! Send payment to complete.');
    } catch (error) {
      toast.error('Failed to create order. Try again.');
    } finally { setSubmitting(false); }
  };

  const handleCopy = () => { navigator.clipboard.writeText(walletAddress); setCopied(true); toast.success('Address copied!'); setTimeout(() => setCopied(false), 2000); };

  if (loading || !user) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-10 h-10 border-2 border-[#3B82F6] border-t-[#8B5CF6] rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-28 pb-20 px-4 relative">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/8 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>

        <div className="relative max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6 border border-amber-500/20">
              <FiDollarSign className="text-amber-400" />
              <span className="text-gray-300 text-sm">Pre-Sale Price: $1.00 USD per Flux</span>
            </div>
            <h1 className="text-5xl font-black mb-3 font-grotesk">Buy <span className="gradient-text">Flux Coins</span></h1>
            <p className="text-gray-400">Send crypto, receive Flux after confirmation</p>
          </div>

          {!transaction ? (
            <div className="glass-card space-y-6">
              <div>
                <label className="text-sm text-gray-400 mb-3 block font-medium">AMOUNT TO PURCHASE</label>
                <input 
                  type="number" 
                  value={amount} 
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === '') {
                      setAmount('');
                    } else {
                      const num = parseInt(val, 10);
                      if (!isNaN(num)) setAmount(num);
                    }
                  }}
                  min={MIN_PURCHASE} 
                  max={MAX_PURCHASE}
                  className="w-full bg-white/[0.03] border border-white/[0.08] rounded-2xl py-5 px-6 text-4xl font-bold text-center text-white focus:outline-none focus:border-[#3B82F6] transition-all" 
                  placeholder="0"
                />
                <div className="flex justify-between mt-3">
                  {[500, 1000, 2500, 5000].map((n) => (
                    <button key={n} onClick={() => setAmount(n)} className="text-xs text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full hover:bg-amber-400/20 transition-all">
                      {n === 5000 ? 'Max: 5,000' : n.toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl p-6 text-center border border-blue-500/10">
                <p className="text-gray-400 text-sm mb-1">TOTAL COST</p>
                <p className="text-4xl font-black gradient-text">${totalCost.toLocaleString()} USD</p>
                <p className="text-gray-500 text-sm mt-2">You receive: <span className="text-white font-bold">{numAmount.toLocaleString()} FLUX</span></p>
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-3 block font-medium">PAY WITH</label>
                <div className="grid grid-cols-2 gap-3">
                  {PAYMENT_METHODS.map((m) => (
                    <button key={m.id} onClick={() => setPaymentMethod(m.id)}
                      className={`p-4 rounded-2xl border text-left transition-all ${paymentMethod === m.id ? 'border-[#3B82F6] bg-[#3B82F6]/10' : 'border-white/[0.08] hover:border-white/20'}`}>
                      <span className="text-2xl mb-2 block">{m.icon}</span>
                      <p className="text-white text-sm font-bold">{m.name}</p>
                      <p className="text-gray-500 text-xs">{m.network}</p>
                    </button>
                  ))}
                </div>
              </div>

              <button onClick={handleBuy} disabled={submitting || numAmount < MIN_PURCHASE} className="btn-primary w-full text-lg disabled:opacity-50">
                {submitting ? 'Creating...' : `Buy ${numAmount || ''} Flux - $${totalCost.toLocaleString()}`}
              </button>
            </div>
          ) : (
            <div className="glass-card space-y-6 text-center">
              <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto">
                <FiCheck className="text-emerald-400 text-4xl" />
              </div>
              <h2 className="text-3xl font-black text-white">Order Created!</h2>
              <p className="text-gray-400">Send <span className="text-white font-bold">${totalCost} USD</span> in {paymentMethod} to:</p>
              <div className="bg-black/30 rounded-2xl p-5 border border-white/[0.08]">
                <p className="text-[#00D4FF] font-mono text-sm break-all">{walletAddress}</p>
              </div>
              <button onClick={handleCopy} className="flex items-center gap-2 mx-auto px-6 py-3 glass rounded-xl hover:bg-white/[0.06] transition-all text-white">
                {copied ? <FiCheck className="text-emerald-400" /> : <FiCopy className="text-[#00D4FF]" />}
                <span>{copied ? 'Copied!' : 'Copy Address'}</span>
              </button>
              <div className="bg-amber-500/5 border border-amber-500/15 rounded-2xl p-5 text-left">
                <p className="text-amber-400 font-bold text-sm mb-2">⚠️ IMPORTANT</p>
                <ul className="text-amber-400/70 text-sm space-y-1">
                  <li>• Send exactly the amount in {paymentMethod}</li>
                  <li>• Your Flux will appear in your dashboard after blockchain confirmation</li>
                  <li>• Check dashboard for balance updates</li>
                </ul>
              </div>
              <button onClick={() => router.push('/dashboard')} className="btn-primary w-full">Go to Dashboard</button>
              <button onClick={() => setTransaction(null)} className="flex items-center gap-2 mx-auto text-gray-400 hover:text-white transition-colors"><FiArrowLeft /> Buy More</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { generateSeedPhrase, getEthereumWallet, saveWallet } from '../lib/wallet';
import { FiCopy, FiCheck, FiShield } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function CreateWallet() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [seedPhrase, setSeedPhrase] = useState('');
  const [confirmWords, setConfirmWords] = useState([]);
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    const phrase = generateSeedPhrase();
    setSeedPhrase(phrase);
    setStep(2);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(seedPhrase);
    setCopied(true);
    toast.success('Seed phrase copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCreatePassword = () => {
    setStep(4);
  };

  const handleFinish = async () => {
    try {
      const ethWallet = getEthereumWallet(seedPhrase);
      
      const walletData = {
        seedPhrase,
        ethAddress: ethWallet.address,
        createdAt: new Date().toISOString(),
      };
      
      saveWallet(password, walletData);
      
      toast.success('Wallet created successfully!');
      router.push('/wallet-dashboard');
    } catch (error) {
      toast.error('Failed to create wallet');
    }
  };

  return (
    <div className="min-h-screen bg-[#030014] flex items-center justify-center px-4 py-20">
      <div className="absolute top-0 -left-40 w-[500px] h-[500px] bg-flux-purple/20 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-0 -right-40 w-[500px] h-[500px] bg-flux-blue/10 rounded-full blur-[120px]"></div>

      <div className="relative w-full max-w-lg z-10">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-flux-purple to-flux-blue rounded-full flex items-center justify-center">
              <span className="text-white font-black text-lg">F</span>
            </div>
            <span className="text-3xl font-black">Flux<span className="gradient-text">Wallet</span></span>
          </Link>
          <h1 className="text-4xl font-black text-white mb-2">Create Wallet</h1>
          <p className="text-gray-400">Secure your Flux with a self-custody wallet</p>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
          {/* Step indicators */}
          <div className="flex justify-center gap-2 mb-8">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className={`h-2 w-16 rounded-full ${step >= s ? 'bg-gradient-to-r from-flux-purple to-flux-blue' : 'bg-white/10'}`}></div>
            ))}
          </div>

          {/* Step 1: Welcome */}
          {step === 1 && (
            <div className="space-y-6 text-center">
              <div className="w-20 h-20 bg-flux-purple/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiShield className="text-flux-blue text-4xl" />
              </div>
              <h2 className="text-2xl font-bold text-white">Your Flux Wallet</h2>
              <p className="text-gray-400">
                Create a self-custody wallet. You control your keys. You control your Flux.
              </p>
              <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-2xl p-4 text-left">
                <p className="text-yellow-400 font-bold text-sm mb-2">⚠️ IMPORTANT</p>
                <ul className="text-yellow-400/70 text-sm space-y-1">
                  <li>• Never share your seed phrase with anyone</li>
                  <li>• Store it offline in a safe place</li>
                  <li>• Flux cannot recover your wallet if you lose it</li>
                </ul>
              </div>
              <button onClick={handleGenerate} className="w-full py-4 bg-gradient-to-r from-flux-purple to-flux-blue rounded-2xl font-bold text-lg hover:opacity-90 transition-all">
                Generate Seed Phrase
              </button>
            </div>
          )}

          {/* Step 2: Show seed phrase */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white text-center">Your Seed Phrase</h2>
              <p className="text-gray-400 text-center text-sm">Write these 12 words down in order. Keep them safe!</p>
              
              <div className="bg-black/30 rounded-2xl p-6 border border-white/10">
                <div className="grid grid-cols-3 gap-3">
                  {seedPhrase.split(' ').map((word, i) => (
                    <div key={i} className="bg-white/5 rounded-lg px-3 py-2 text-center">
                      <span className="text-gray-500 text-xs">{i + 1}</span>
                      <p className="text-white font-medium text-sm">{word}</p>
                    </div>
                  ))}
                </div>
              </div>

              <button onClick={handleCopy} className="flex items-center gap-2 mx-auto px-6 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all">
                {copied ? <FiCheck className="text-green-400" /> : <FiCopy className="text-flux-blue" />}
                <span>{copied ? 'Copied!' : 'Copy to Clipboard'}</span>
              </button>

              <button onClick={() => setStep(3)} className="w-full py-4 bg-gradient-to-r from-flux-purple to-flux-blue rounded-2xl font-bold text-lg hover:opacity-90 transition-all">
                I've Saved My Seed Phrase
              </button>
            </div>
          )}

          {/* Step 3: Confirm seed phrase */}
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white text-center">Verify Seed Phrase</h2>
              <p className="text-gray-400 text-center text-sm">Confirm you've saved your seed phrase correctly</p>
              
              <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-2xl p-4">
                <p className="text-yellow-400 text-sm">✅ I understand that if I lose my seed phrase, I lose access to my Flux forever.</p>
              </div>

              <button onClick={handleCreatePassword} className="w-full py-4 bg-gradient-to-r from-flux-purple to-flux-blue rounded-2xl font-bold text-lg hover:opacity-90 transition-all">
                Confirm & Continue
              </button>
            </div>
          )}

          {/* Step 4: Create password */}
          {step === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white text-center">Create Password</h2>
              <p className="text-gray-400 text-center text-sm">This password encrypts your wallet on this device</p>
              
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-white text-center text-lg focus:outline-none focus:border-flux-purple transition-all"
                placeholder="Enter a strong password"
              />

              <button 
                onClick={handleFinish} 
                disabled={password.length < 8}
                className="w-full py-4 bg-gradient-to-r from-flux-purple to-flux-blue rounded-2xl font-bold text-lg hover:opacity-90 transition-all disabled:opacity-50"
              >
                Create Wallet
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
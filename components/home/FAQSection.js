{/* TEAM SECTION */}
<Team />

{/* NEWSLETTER SECTION */}
<Newsletter />
import { useState } from 'react';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: 'What is Flux Coin?',
      a: 'Flux is a next-generation cryptocurrency designed to surpass Bitcoin with faster transaction speeds, near-zero fees, and environmentally sustainable technology. We\'re building the future of digital currency.',
    },
    {
      q: 'How much does Flux cost during pre-sale?',
      a: 'During the pre-sale phase, 1 Flux = $1.00 USD. This price is available until December 31st, 2026. After public launch on January 1st, 2027, the price may adjust based on market demand.',
    },
    {
      q: 'What payment methods are accepted?',
      a: 'We accept Solana (SOL), USDT on both ERC-20 (Ethereum) and TRC-20 (Tron) networks, and Bitcoin (BTC). Choose your preferred method at checkout.',
    },
    {
      q: 'When can I sell my Flux coins?',
      a: 'Selling functionality will be enabled on January 1st, 2027, when the public launch begins. Until then, all purchased coins are held in your account. On launch day, 5,000,000 locked coins will also be released.',
    },
    {
      q: 'What are the purchase limits?',
      a: 'The minimum purchase is 10 Flux coins ($10 USD). The maximum per transaction is 5,000 Flux coins ($5,000 USD). There is no limit on the number of transactions you can make.',
    },
    {
      q: 'How long does payment confirmation take?',
      a: 'Payment confirmation times vary by network: SOL typically takes 1-2 minutes, USDT and BTC may take 10-30 minutes depending on network congestion. You\'ll receive an email when your coins are credited.',
    },
    {
      q: 'Is Flux a real cryptocurrency?',
      a: 'Yes, Flux is a serious cryptocurrency project with a $20M market cap strategy. We have real tokenomics, a defined roadmap, and are positioning to become a major player in the digital currency space.',
    },
    {
      q: 'How do I get support?',
      a: 'For support, join our Telegram or Discord communities (links in the newsletter section). You can also reach out through our official social media channels on Twitter/X.',
    },
  ];

  return (
    <section id="faq" className="py-20 px-4 bg-flux-dark/50">
      <div className="max-w-3xl mx-auto">
        <h2 className="section-heading">Frequently Asked Questions</h2>
        <p className="section-subheading">
          Everything you need to know about Flux Coin.
        </p>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="glass-card cursor-pointer" onClick={() => setOpenIndex(openIndex === i ? null : i)}>
              <div className="flex justify-between items-center">
                <h3 className="text-white font-medium pr-4">{faq.q}</h3>
                <span className={`text-flux-blue transition-transform text-xl ${openIndex === i ? 'rotate-45' : ''}`}>
                  +
                </span>
              </div>
              {openIndex === i && (
                <p className="text-gray-400 text-sm mt-3 pt-3 border-t border-white/10 leading-relaxed">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
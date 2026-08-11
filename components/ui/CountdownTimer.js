import { useState, useEffect } from 'react';

export default function CountdownTimer({ targetDate, label }) {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = new Date(targetDate).getTime() - now;
      if (distance <= 0) { setExpired(true); clearInterval(timer); return; }
      setTime({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const boxes = [
    { value: time.days, label: 'Days' },
    { value: time.hours, label: 'Hours' },
    { value: time.minutes, label: 'Minutes' },
    { value: time.seconds, label: 'Seconds' },
  ];

  return (
    <div className="text-center">
      {label && <p className="text-gray-500 text-xs uppercase tracking-widest mb-8">{label}</p>}
      {expired ? (
        <p className="text-4xl font-black text-amber-400 font-grotesk">Now Live</p>
      ) : (
        <div className="flex justify-center gap-4 md:gap-8">
          {boxes.map((box, i) => (
            <div key={i} className="text-center">
              <div className="text-5xl md:text-7xl font-black text-white font-grotesk tabular-nums bg-white/[0.03] border border-white/[0.06] rounded-2xl px-4 py-3 min-w-[90px] md:min-w-[120px]">
                {String(box.value).padStart(2, '0')}
              </div>
              <span className="text-gray-500 text-xs uppercase tracking-widest mt-3 block">{box.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
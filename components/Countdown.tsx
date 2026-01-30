import React, { useState, useEffect } from 'react';
import { Timer } from 'lucide-react';

interface CountdownProps {
  targetDate: Date;
  onComplete: () => void;
}

const Countdown: React.FC<CountdownProps> = ({ targetDate, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState<{days: number, hours: number, minutes: number, seconds: number} | null>(null);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();

      if (difference <= 0) {
        setTimeLeft(null);
        onComplete();
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    };

    calculateTimeLeft(); // Initial call
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate, onComplete]);

  if (!timeLeft) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 animate-fade-in-up">
        <div className="p-4 bg-emerald-100 rounded-full text-emerald-600">
           <Timer size={48} />
        </div>
        <h2 className="text-2xl font-bold text-emerald-900">Pengumuman Telah Dibuka</h2>
        <p className="text-emerald-700">Silakan cek status kelulusan Anda di bawah.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        {[
          { label: 'Hari', value: timeLeft.days },
          { label: 'Jam', value: timeLeft.hours },
          { label: 'Menit', value: timeLeft.minutes },
          { label: 'Detik', value: timeLeft.seconds },
        ].map((item, idx) => (
          <div key={idx} className="bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg border-b-4 border-emerald-600 transform hover:scale-105 transition-transform duration-300">
            <span className="block text-4xl md:text-6xl font-black text-emerald-800 tabular-nums">
              {String(item.value).padStart(2, '0')}
            </span>
            <span className="text-sm md:text-base font-semibold text-emerald-600 uppercase tracking-widest">
              {item.label}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center">
        <p className="text-white text-lg font-medium drop-shadow-md bg-black/20 inline-block px-6 py-2 rounded-full backdrop-blur-md">
          Menuju Pengumuman Kelulusan
        </p>
      </div>
    </div>
  );
};

export default Countdown;
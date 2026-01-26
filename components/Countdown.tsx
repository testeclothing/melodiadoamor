import React, { useState, useEffect } from 'react';
import { Timer } from 'lucide-react';

export const Countdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 4,
    minutes: 59,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          // Reset for demo purposes if it hits 0
          return { hours: 4, minutes: 59, seconds: 0 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const format = (num: number) => num.toString().padStart(2, '0');

  return (
    <div className="flex items-center gap-2 text-sm md:text-base font-semibold text-brand-700 bg-brand-50 px-4 py-1 rounded-full border border-brand-100">
      <Timer size={16} className="text-brand-600" />
      <span>Oferta expira em:</span>
      <span className="font-mono text-brand-600">
        {format(timeLeft.hours)}:{format(timeLeft.minutes)}:{format(timeLeft.seconds)}
      </span>
    </div>
  );
};
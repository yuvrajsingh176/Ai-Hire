'use client'
import { useEffect, useState } from 'react';

const TimerComp = ({ duration = '10 minutes', stopInterview }: { duration: string, stopInterview: () => void }) => {
  const totalMinutes = parseInt(duration.split(' ')[0] || '0', 10);
  const totalSeconds = totalMinutes * 60;

  const [remaining, setRemaining] = useState(totalSeconds);

  useEffect(() => {
    if (remaining <= 0) {
      stopInterview();
      return;
    }

    const interval = setInterval(() => {
      setRemaining((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval); // Cleanup
  }, [remaining, stopInterview]);

  const minutes = Math.floor(remaining / 60).toString().padStart(2, '0');
  const seconds = (remaining % 60).toString().padStart(2, '0');

  return (
    <div className="text-2xl font-bold text-red-600">
      ⏳ {minutes}:{seconds}
    </div>
  );
};

export default TimerComp;

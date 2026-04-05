'use client'
import { useEffect, useRef, useState } from 'react';

const TimerComp = ({ duration = '30 minutes', stopInterview }: { duration: string, stopInterview: () => void }) => {
  // Safely parse duration — handles "30 mins", "1 hour", "30 Min", etc.
  const parsed = parseInt(duration.split(' ')[0], 10);
  const totalMinutes = isNaN(parsed) || parsed <= 0 ? 30 : parsed;
  const totalSeconds = totalMinutes * 60;

  const [remaining, setRemaining] = useState(totalSeconds);
  // Keep a stable ref to stopInterview so it never triggers effect re-runs
  const stopRef = useRef(stopInterview);
  useEffect(() => { stopRef.current = stopInterview; }, [stopInterview]);

  useEffect(() => {
    if (totalSeconds <= 0) return; // safety guard

    const interval = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          stopRef.current(); // call via ref — no stale closure
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once on mount only

  const minutes = Math.floor(remaining / 60).toString().padStart(2, '0');
  const seconds = (remaining % 60).toString().padStart(2, '0');

  return (
    <div className="text-2xl font-bold text-red-600">
      ⏳ {minutes}:{seconds}
    </div>
  );
};

export default TimerComp;

import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

export default function HoldToReveal({ onReveal }) {
  const [isHolding, setIsHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef(null);

  const HOLD_DURATION = 2000;
  const UPDATE_INTERVAL = 50;

  const startHold = useCallback(() => {
    setIsHolding(true);
    setProgress(0);
    const startTime = Date.now();

    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min(elapsed / HOLD_DURATION, 1);
      setProgress(newProgress);

      if (newProgress >= 1) {
        clearInterval(intervalRef.current);
        onReveal();
      }
    }, UPDATE_INTERVAL);
  }, [onReveal]);

  const stopHold = useCallback(() => {
    setIsHolding(false);
    setProgress(0);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-6 sm:gap-8">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-xl sm:text-3xl font-light text-gray-300 text-center"
      >
        Concentre-se...
      </motion.p>

      <div className="relative">
        <svg className="w-28 h-28 sm:w-40 sm:h-40 -rotate-90" viewBox="0 0 160 160">
          <circle
            cx="80"
            cy="80"
            r="70"
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="4"
          />
          <motion.circle
            cx="80"
            cy="80"
            r="70"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 70}
            strokeDashoffset={2 * Math.PI * 70 * (1 - progress)}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#a78bfa" />
            </linearGradient>
          </defs>
        </svg>

        <motion.button
          onMouseDown={startHold}
          onMouseUp={stopHold}
          onMouseLeave={stopHold}
          onTouchStart={startHold}
          onTouchEnd={stopHold}
          whileTap={{ scale: 0.95 }}
          className="absolute inset-0 flex items-center justify-center rounded-full glass hover:bg-white/5 transition-colors cursor-pointer select-none"
        >
          <span className="text-xs sm:text-sm text-gray-400 font-medium select-none">
            {isHolding ? 'Segurando...' : 'Segure aqui'}
          </span>
        </motion.button>
      </div>
    </div>
  );
}

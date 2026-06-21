import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HoldToReveal from './HoldToReveal';

export default function ResultScreen({ age, stageMode, onRestart }) {
  const [revealPhase, setRevealPhase] = useState(0);
  const [showAge, setShowAge] = useState(false);

  useEffect(() => {
    if (!stageMode) {
      // Animated reveal sequence
      const timers = [];

      timers.push(setTimeout(() => setRevealPhase(1), 500));
      timers.push(setTimeout(() => setRevealPhase(2), 1200));
      timers.push(setTimeout(() => setRevealPhase(2), 2000));
      timers.push(setTimeout(() => setRevealPhase(3), 2800));
      timers.push(setTimeout(() => {
        setRevealPhase(4);
        setShowAge(true);
      }, 3500));

      return () => timers.forEach(clearTimeout);
    }
  }, [stageMode]);

  const handleHoldReveal = () => {
    setRevealPhase(4);
    setShowAge(true);
  };

  const suspenseMessages = [
    { text: 'Hmm...', delay: 0.5 },
    { text: 'Estou captando...', delay: 1.2 },
    { text: 'Acho que já sei...', delay: 2.0 },
    { text: 'Sua idade é...', delay: 2.8 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center px-4 relative"
    >
      {/* Background glow */}
      {showAge && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-gradient-radial pointer-events-none"
        />
      )}

      <div className="relative z-10 text-center max-w-md">
        {!showAge && !stageMode && (
          <div className="space-y-6">
            <AnimatePresence mode="wait">
              {suspenseMessages.map((msg, index) => (
                revealPhase >= index + 1 && (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5 }}
                    className={`text-xl sm:text-2xl ${
                      index === suspenseMessages.length - 1
                        ? 'text-white font-medium'
                        : 'text-gray-400 font-light'
                    }`}
                  >
                    {msg.text}
                  </motion.p>
                )
              ))}
            </AnimatePresence>
          </div>
        )}

        {!showAge && stageMode && (
          <HoldToReveal onReveal={handleHoldReveal} />
        )}

        {showAge && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-lg text-gray-400 font-light"
            >
              Sua idade é
            </motion.p>

            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 15,
                delay: 0.2,
              }}
              className="relative"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-neon-blue/20 rounded-3xl blur-3xl animate-glow" />

              <div className="relative glass rounded-3xl p-10 sm:p-12 border border-neon-blue/30">
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 20,
                    delay: 0.4,
                  }}
                  className="text-7xl sm:text-8xl font-bold text-gradient block"
                >
                  {age}
                </motion.span>
              </div>
            </motion.div>

            {/* Restart button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onRestart}
              className="px-10 py-4 bg-gradient-to-r from-neon-blue to-blue-600 text-white font-semibold text-lg rounded-2xl shadow-lg shadow-neon-blue/30 hover:shadow-neon-blue/50 transition-all duration-300 tracking-wide uppercase"
            >
              Recomeçar
            </motion.button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

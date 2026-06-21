import { motion } from 'framer-motion';

export default function ProgressBar({ current, total, progress }) {
  return (
    <div className="w-full max-w-md mx-auto px-4 pt-3 pb-1 shrink-0">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs text-gray-400 font-medium">
          Cartão {current + 1} de {total}
        </span>
        <span className="text-xs text-neon-glow font-mono font-semibold">
          {Math.round(progress)}%
        </span>
      </div>

      <div className="w-full h-1.5 bg-dark-surface rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-neon-blue to-blue-400 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <div className="flex justify-center gap-1.5 mt-2">
        {Array.from({ length: total }).map((_, i) => (
          <motion.div
            key={i}
            className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
              i < current
                ? 'bg-neon-blue'
                : i === current
                ? 'bg-neon-glow'
                : 'bg-gray-700'
            }`}
            animate={
              i === current
                ? { scale: [1, 1.4, 1] }
                : { scale: 1 }
            }
            transition={{ duration: 1, repeat: i === current ? Infinity : 0 }}
          />
        ))}
      </div>
    </div>
  );
}

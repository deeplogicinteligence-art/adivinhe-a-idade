import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import AgeGrid from './AgeGrid';

export default function CardScreen({ card, cardIndex, totalCards, onAnswer }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="absolute inset-0 flex flex-col items-center justify-between px-3 py-3 sm:px-4"
    >
      <div className="flex-1 w-full max-w-lg glass rounded-2xl sm:rounded-3xl p-3 sm:p-5 shadow-2xl flex flex-col min-h-0">
        <div className="text-center mb-2 sm:mb-3 shrink-0">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="inline-flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-neon-blue/20 to-purple-500/20 border border-neon-blue/30 mb-1.5 sm:mb-2"
          >
            <span className="text-base sm:text-lg font-bold text-neon-glow font-mono">
              {card.id}
            </span>
          </motion.div>
          <h2 className="text-sm sm:text-base font-semibold text-white">
            Cartão {card.id}
          </h2>
        </div>

        <div className="flex-1 min-h-0">
          <AgeGrid numbers={card.numbers} />
        </div>
      </div>

      <div className="flex gap-3 pt-3 pb-1 w-full max-w-lg shrink-0">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => onAnswer(true)}
          className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 text-emerald-400 font-semibold text-base rounded-xl transition-all duration-300"
        >
          <Check className="w-4 h-4" />
          Sim
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => onAnswer(false)}
          className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 text-red-400 font-semibold text-base rounded-xl transition-all duration-300"
        >
          <X className="w-4 h-4" />
          Não
        </motion.button>
      </div>
    </motion.div>
  );
}

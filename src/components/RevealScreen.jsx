import { motion } from 'framer-motion';
import { Brain } from 'lucide-react';

export default function RevealScreen({ onReveal, stageMode, darkReveal }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full flex flex-col items-center justify-center px-4 relative"
    >
      {darkReveal && (
        <div className="absolute inset-0 bg-black/50 pointer-events-none" />
      )}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="text-center max-w-md relative z-10"
      >
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="mx-auto mb-6 sm:mb-8 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-purple-500/20 to-neon-blue/20 border border-purple-500/30 flex items-center justify-center"
        >
          <Brain className="w-8 h-8 sm:w-10 sm:h-10 text-purple-400" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xl sm:text-3xl font-light text-gray-300 mb-6 sm:mb-8"
        >
          Perfeito. <br />
          <span className="text-white font-medium">Já sei a resposta.</span>
        </motion.p>

        {!stageMode ? (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onReveal}
            className="px-8 py-3 sm:px-10 sm:py-4 bg-gradient-to-r from-purple-600 to-neon-blue text-white font-semibold text-base sm:text-lg rounded-2xl shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 tracking-wide uppercase"
          >
            Adivinhar
          </motion.button>
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.5, 1] }}
            transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
            className="text-gray-500 text-sm"
          >
            Pressione e segure a tela para revelar...
          </motion.p>
        )}
      </motion.div>
    </motion.div>
  );
}

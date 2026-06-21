import { motion } from 'framer-motion';
import { Sparkles, Settings } from 'lucide-react';

export default function IntroScreen({ onStart, onSettings }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full flex flex-col items-center justify-center px-4 relative"
    >
      <div className="absolute inset-0 bg-gradient-radial pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-neon-blue/5 rounded-full blur-[120px] pointer-events-none" />

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        onClick={onSettings}
        className="absolute top-4 right-4 p-2.5 rounded-xl glass-light hover:bg-white/10 transition-all duration-300 group"
        aria-label="Configurações"
      >
        <Settings className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="text-center max-w-lg"
      >
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.2, type: 'spring', stiffness: 200 }}
          className="mx-auto mb-6 w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-neon-blue/20 to-purple-500/20 border border-neon-blue/30 flex items-center justify-center animate-glow"
        >
          <Sparkles className="w-10 h-10 sm:w-12 sm:h-12 text-neon-glow" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-3xl sm:text-5xl font-bold mb-3 sm:mb-4 tracking-tight"
        >
          <span className="text-gradient">Adivinhe sua Idade</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-base sm:text-lg text-gray-300 mb-2 font-light"
        >
          Pense em uma idade entre 1 e 63 anos e mantenha segredo.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-sm sm:text-base text-gray-500 mb-8 sm:mb-10"
        >
          Vou fazer apenas algumas perguntas.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          className="px-8 py-3 sm:px-10 sm:py-4 bg-gradient-to-r from-neon-blue to-blue-600 text-white font-semibold text-base sm:text-lg rounded-2xl shadow-lg shadow-neon-blue/30 hover:shadow-neon-blue/50 transition-all duration-300 tracking-wide uppercase"
        >
          Começar
        </motion.button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-4 text-xs text-gray-600"
      >
        Truque de mágica profissional
      </motion.div>
    </motion.div>
  );
}

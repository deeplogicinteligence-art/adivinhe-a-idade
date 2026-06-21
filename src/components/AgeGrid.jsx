import { motion } from 'framer-motion';

export default function AgeGrid({ numbers }) {
  return (
    <div className="w-full overflow-y-auto max-h-[45vh] sm:max-h-[50vh] pr-1">
      <div className="grid grid-cols-5 sm:grid-cols-6 lg:grid-cols-7 gap-1.5 sm:gap-2 p-2">
        {numbers.map((number, index) => (
          <motion.div
            key={number}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.2,
              delay: index * 0.015,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="aspect-square flex items-center justify-center rounded-lg bg-dark-surface/80 border border-white/5 text-gray-300 font-mono text-xs sm:text-sm font-medium hover:bg-white/5 hover:border-white/10 transition-all duration-200"
          >
            {number}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

import { motion } from 'framer-motion';

export default function AgeGrid({ numbers }) {
  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 p-4">
        {numbers.map((number, index) => (
          <motion.div
            key={number}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.3,
              delay: index * 0.02,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="aspect-square flex items-center justify-center rounded-xl bg-dark-surface/80 border border-white/5 text-gray-300 font-mono text-sm sm:text-base font-medium hover:bg-white/5 hover:border-white/10 transition-all duration-200"
          >
            {number}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

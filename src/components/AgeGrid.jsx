import { motion } from 'framer-motion';

export default function AgeGrid({ numbers }) {
  return (
    <div className="w-full h-full overflow-hidden">
      <div className="grid grid-cols-5 sm:grid-cols-6 lg:grid-cols-7 gap-1 sm:gap-1.5 auto-rows-fr h-full content-center">
        {numbers.map((number, index) => (
          <motion.div
            key={number}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.15,
              delay: index * 0.01,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex items-center justify-center rounded-lg bg-dark-surface/80 border border-white/5 text-gray-300 font-mono text-[10px] sm:text-xs font-medium"
          >
            {number}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

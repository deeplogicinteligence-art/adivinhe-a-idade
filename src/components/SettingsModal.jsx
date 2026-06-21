import { motion, AnimatePresence } from 'framer-motion';
import { X, Eye, Monitor, Moon, Volume2 } from 'lucide-react';

export default function SettingsModal({ isOpen, onClose, settings, onUpdate }) {
  const settingsItems = [
    {
      key: 'hideResult',
      label: 'Ocultar resultado até toque longo',
      description: 'O resultado só aparece após interação do mágico',
      icon: Eye,
    },
    {
      key: 'stageMode',
      label: 'Modo Palco',
      description: 'Requer segurar a tela por 2 segundos para revelar',
      icon: Monitor,
    },
    {
      key: 'darkReveal',
      label: 'Tela escura durante revelação',
      description: 'Escurece o fundo para criar suspense',
      icon: Moon,
    },
    {
      key: 'sounds',
      label: 'Sons de suspense',
      description: 'Efeitos sonoros durante a revelação',
      icon: Volume2,
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed inset-x-4 top-1/2 -translate-y-1/2 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-md z-50"
          >
            <div className="glass rounded-3xl p-6 shadow-2xl border border-white/10">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">
                  Modo Mágico
                </h3>
                <button
                  onClick={onClose}
                  className="p-2 rounded-xl hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {/* Settings */}
              <div className="space-y-4">
                {settingsItems.map(({ key, label, description, icon: Icon }) => (
                  <div
                    key={key}
                    className="flex items-start gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors"
                  >
                    <div className="p-2 rounded-lg bg-white/5 border border-white/5">
                      <Icon className="w-4 h-4 text-gray-400" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white">{label}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{description}</p>
                    </div>

                    {/* Toggle switch */}
                    <button
                      onClick={() => onUpdate(key, !settings[key])}
                      className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${
                        settings[key] ? 'bg-neon-blue' : 'bg-gray-700'
                      }`}
                    >
                      <motion.div
                        className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md"
                        animate={{ x: settings[key] ? 20 : 2 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    </button>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="mt-6 pt-4 border-t border-white/5">
                <p className="text-xs text-gray-600 text-center">
                  Configurações para uso profissional
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

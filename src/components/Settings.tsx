import { motion } from 'framer-motion';
import { Settings as SettingsIcon, X } from 'lucide-react';
import { useState } from 'react';
import { useMusicStore } from '../store/musicStore';

export const Settings = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { settings, updateSettings } = useMusicStore();

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed top-6 right-6 p-3 rounded-full bg-gray-800/50 backdrop-blur-lg text-white hover:bg-gray-700/50 transition-colors z-40"
        aria-label="Settings"
      >
        <SettingsIcon size={24} />
      </motion.button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gray-800 rounded-2xl p-8 max-w-md w-full shadow-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Settings</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-gray-700 transition-colors"
              >
                <X size={24} className="text-gray-400" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Autoplay Toggle */}
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-white font-semibold">Autoplay</label>
                  <p className="text-sm text-gray-400">
                    Automatically play next track
                  </p>
                </div>
                <button
                  onClick={() => updateSettings({ autoplay: !settings.autoplay })}
                  className={`
                    relative w-14 h-8 rounded-full transition-colors
                    ${settings.autoplay ? 'bg-purple-500' : 'bg-gray-600'}
                  `}
                >
                  <motion.div
                    layout
                    className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full"
                    animate={{
                      x: settings.autoplay ? 24 : 0,
                    }}
                  />
                </button>
              </div>

              {/* Content Filter */}
              <div>
                <label className="text-white font-semibold block mb-3">
                  Content Filter
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => updateSettings({ contentFilter: 'all' })}
                    className={`
                      flex-1 py-2 px-4 rounded-lg transition-colors
                      ${
                        settings.contentFilter === 'all'
                          ? 'bg-purple-500 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }
                    `}
                  >
                    All
                  </button>
                  <button
                    onClick={() => updateSettings({ contentFilter: 'clean' })}
                    className={`
                      flex-1 py-2 px-4 rounded-lg transition-colors
                      ${
                        settings.contentFilter === 'clean'
                          ? 'bg-purple-500 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }
                    `}
                  >
                    Clean
                  </button>
                </div>
              </div>

              {/* About */}
              <div className="pt-4 border-t border-gray-700">
                <h3 className="text-white font-semibold mb-2">About TuneMood</h3>
                <p className="text-sm text-gray-400">
                  A mood-based music player that curates playlists based on how you feel.
                </p>
                <p className="text-xs text-gray-500 mt-2">Version 1.0.0</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

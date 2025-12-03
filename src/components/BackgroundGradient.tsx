import { motion } from 'framer-motion';
import { useMusicStore } from '../store/musicStore';
import { moodPlaylists } from '../data/playlists';

export const BackgroundGradient = () => {
  const { selectedMood } = useMusicStore();

  const currentPlaylist = selectedMood
    ? moodPlaylists.find((p) => p.mood === selectedMood)
    : null;

  const gradient = currentPlaylist?.gradient || 'from-gray-900 via-gray-800 to-gray-900';

  return (
    <>
      <motion.div
        key={selectedMood || 'default'}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className={`fixed inset-0 bg-gradient-to-br ${gradient} -z-10`}
      />
      
      {/* Animated particles/orbs */}
      {selectedMood && (
        <>
          <motion.div
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="fixed top-20 left-20 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl -z-10"
          />
          <motion.div
            animate={{
              x: [0, -100, 0],
              y: [0, 100, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="fixed bottom-20 right-20 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl -z-10"
          />
          <motion.div
            animate={{
              x: [0, 50, 0],
              y: [0, -50, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="fixed top-1/2 left-1/2 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl -z-10"
          />
        </>
      )}
    </>
  );
};

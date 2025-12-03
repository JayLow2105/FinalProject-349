import { motion } from 'framer-motion';
import { Heart, ExternalLink } from 'lucide-react';
import { useMusicStore } from '../store/musicStore';

export const NowPlayingCard = () => {
  const { currentTrack, toggleFavorite, isFavorite } = useMusicStore();

  if (!currentTrack) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 text-center"
      >
        <p className="text-gray-400">Select a mood to start playing music</p>
      </motion.div>
    );
  }

  const isTrackFavorite = isFavorite(currentTrack.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 shadow-xl"
    >
      <div className="flex items-center gap-6">
        <motion.img
          key={currentTrack.id}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          src={currentTrack.coverUrl}
          alt={currentTrack.title}
          className="w-24 h-24 rounded-lg object-cover shadow-lg"
        />
        <div className="flex-1 min-w-0">
          <motion.h3
            key={currentTrack.title}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="text-2xl font-bold text-white truncate mb-1"
          >
            {currentTrack.title}
          </motion.h3>
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-2"
          >
            <p className="text-gray-400 truncate">{currentTrack.artist}</p>
            <button
              className="text-gray-400 hover:text-white transition-colors"
              title="Open artist profile"
            >
              <ExternalLink size={16} />
            </button>
          </motion.div>
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => toggleFavorite(currentTrack.id)}
          className={`p-3 rounded-full transition-all ${
            isTrackFavorite
              ? 'bg-pink-500 text-white'
              : 'bg-gray-700 text-gray-400 hover:text-pink-500'
          }`}
          aria-label={isTrackFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart size={24} fill={isTrackFavorite ? 'currentColor' : 'none'} />
        </motion.button>
      </div>
    </motion.div>
  );
};

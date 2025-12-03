import { motion } from 'framer-motion';
import { Mood } from '../types';
import { moodPlaylists } from '../data/playlists';
import { useMusicStore } from '../store/musicStore';

export const MoodSelector = () => {
  const { selectedMood, setSelectedMood, setCurrentTrack, setIsPlaying } = useMusicStore();

  const handleMoodSelect = (mood: Mood) => {
    setSelectedMood(mood);
    const playlist = moodPlaylists.find((p) => p.mood === mood);
    if (playlist && playlist.tracks.length > 0) {
      setCurrentTrack(playlist.tracks[0]);
      setIsPlaying(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
          TuneMood
        </h1>
        <p className="text-gray-400 text-lg">How are you feeling today?</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {moodPlaylists.map((playlist, index) => (
          <motion.button
            key={playlist.mood}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleMoodSelect(playlist.mood)}
            className={`
              relative overflow-hidden rounded-2xl p-6 transition-all duration-300
              ${
                selectedMood === playlist.mood
                  ? 'ring-4 ring-white shadow-2xl'
                  : 'hover:shadow-xl'
              }
            `}
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${playlist.gradient} opacity-90`}
            />
            <div className="relative z-10 text-white">
              <div className="text-6xl mb-4 animate-float">{playlist.icon}</div>
              <h3 className="text-2xl font-bold mb-2">{playlist.name}</h3>
              <p className="text-sm opacity-90">{playlist.description}</p>
              <div className="mt-4 text-xs opacity-75">
                {playlist.tracks.length} tracks
              </div>
            </div>
            {selectedMood === playlist.mood && (
              <motion.div
                layoutId="selected-mood"
                className="absolute inset-0 border-4 border-white rounded-2xl"
                initial={false}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

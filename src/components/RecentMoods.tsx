import { motion } from 'framer-motion';
import { useMusicStore } from '../store/musicStore';
import { moodPlaylists } from '../data/playlists';

export const RecentMoods = () => {
  const { recentMoods, setSelectedMood, setCurrentTrack, setIsPlaying } = useMusicStore();

  if (recentMoods.length === 0) return null;

  const handleMoodClick = (mood: string) => {
    setSelectedMood(mood as any);
    const playlist = moodPlaylists.find((p) => p.mood === mood);
    if (playlist && playlist.tracks.length > 0) {
      setCurrentTrack(playlist.tracks[0]);
      setIsPlaying(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 mb-8">
      <h2 className="text-2xl font-bold text-white mb-4">Recent Moods</h2>
      <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
        {recentMoods.map((mood, index) => {
          const playlist = moodPlaylists.find((p) => p.mood === mood);
          if (!playlist) return null;

          return (
            <motion.button
              key={`${mood}-${index}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleMoodClick(mood)}
              className="flex-shrink-0 w-32 h-32 rounded-xl relative overflow-hidden"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${playlist.gradient} opacity-90`}
              />
              <div className="relative z-10 h-full flex flex-col items-center justify-center text-white p-3">
                <div className="text-4xl mb-2">{playlist.icon}</div>
                <div className="text-sm font-semibold">{playlist.name}</div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

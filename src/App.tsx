import { useMusicStore } from './store/musicStore';
import { moodPlaylists } from './data/playlists';
import { MoodSelector } from './components/MoodSelector';
import { NowPlayingCard } from './components/NowPlayingCard';
import { AudioPlayer } from './components/AudioPlayer';
import { PlaylistView } from './components/PlaylistView';
import { BackgroundGradient } from './components/BackgroundGradient';
import { RecentMoods } from './components/RecentMoods';
import { Settings } from './components/Settings';
import { motion } from 'framer-motion';

function App() {
  const { selectedMood } = useMusicStore();
  const currentPlaylist = selectedMood
    ? moodPlaylists.find((p) => p.mood === selectedMood)
    : null;

  return (
    <div className="min-h-screen relative overflow-hidden">
      <BackgroundGradient />
      <Settings />

      <div className="relative z-10 py-8">
        {/* Recent Moods Section */}
        <RecentMoods />

        {/* Mood Selector */}
        <MoodSelector />

        {/* Player Section */}
        {currentPlaylist && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-6xl mx-auto px-4 mt-12 space-y-6"
          >
            {/* Now Playing Card */}
            <NowPlayingCard />

            {/* Audio Player Controls */}
            <AudioPlayer />

            {/* Playlist */}
            <div className="bg-gray-800/30 backdrop-blur-lg rounded-2xl p-6">
              <h2 className="text-2xl font-bold text-white mb-6">
                {currentPlaylist.name} Playlist
              </h2>
              <PlaylistView tracks={currentPlaylist.tracks} />
            </div>
          </motion.div>
        )}

        {/* Empty State */}
        {!currentPlaylist && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full max-w-2xl mx-auto px-4 mt-16 text-center"
          >
            <div className="bg-gray-800/30 backdrop-blur-lg rounded-2xl p-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Welcome to TuneMood
              </h2>
              <p className="text-gray-400 text-lg">
                Select a mood above to start discovering music that matches how you feel
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default App;

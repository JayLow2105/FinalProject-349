import { motion } from 'framer-motion';
import { Track } from '../types';
import { useMusicStore } from '../store/musicStore';
import { Play, Heart } from 'lucide-react';

interface PlaylistViewProps {
  tracks: Track[];
}

export const PlaylistView = ({ tracks }: PlaylistViewProps) => {
  const { currentTrack, setCurrentTrack, setIsPlaying, toggleFavorite, isFavorite } = useMusicStore();

  const handlePlayTrack = (track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  return (
    <div className="space-y-3">
      {tracks.map((track, index) => (
        <motion.div
          key={track.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
          className={`
            flex items-center gap-4 p-4 rounded-xl transition-all cursor-pointer
            ${
              currentTrack?.id === track.id
                ? 'bg-purple-500/20 border-2 border-purple-500'
                : 'bg-gray-800/30 hover:bg-gray-700/50'
            }
          `}
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handlePlayTrack(track)}
            className="relative group"
          >
            <img
              src={track.coverUrl}
              alt={track.title}
              className="w-14 h-14 rounded-lg object-cover"
            />
            <div className="absolute inset-0 bg-black/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Play size={20} fill="white" className="text-white" />
            </div>
          </motion.button>

          <div className="flex-1 min-w-0" onClick={() => handlePlayTrack(track)}>
            <h4 className="font-semibold text-white truncate">{track.title}</h4>
            <p className="text-sm text-gray-400 truncate">{track.artist}</p>
          </div>

          <div className="text-sm text-gray-400">
            {Math.floor(track.duration / 60)}:{(track.duration % 60).toString().padStart(2, '0')}
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(track.id);
            }}
            className={`p-2 rounded-full transition-colors ${
              isFavorite(track.id)
                ? 'text-pink-500'
                : 'text-gray-500 hover:text-pink-500'
            }`}
          >
            <Heart size={20} fill={isFavorite(track.id) ? 'currentColor' : 'none'} />
          </motion.button>
        </motion.div>
      ))}
    </div>
  );
};

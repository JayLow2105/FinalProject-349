import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';
import { useMusicStore } from '../store/musicStore';
import { moodPlaylists } from '../data/playlists';

export const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const {
    selectedMood,
    currentTrack,
    isPlaying,
    currentTime,
    volume,
    isMuted,
    setIsPlaying,
    setCurrentTime,
    setCurrentTrack,
    setVolume,
    toggleMute,
  } = useMusicStore();

  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.play().catch(() => {
        setIsPlaying(false);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, setIsPlaying]);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  useEffect(() => {
    if (!audioRef.current || !currentTrack) return;
    audioRef.current.src = currentTrack.audioUrl;
    audioRef.current.load();
    if (isPlaying) {
      audioRef.current.play().catch(() => setIsPlaying(false));
    }
  }, [currentTrack, isPlaying, setIsPlaying]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handlePreviousTrack = () => {
    if (!selectedMood || !currentTrack) return;
    const playlist = moodPlaylists.find((p) => p.mood === selectedMood);
    if (!playlist) return;
    
    const currentIndex = playlist.tracks.findIndex((t) => t.id === currentTrack.id);
    const previousIndex = currentIndex > 0 ? currentIndex - 1 : playlist.tracks.length - 1;
    setCurrentTrack(playlist.tracks[previousIndex]);
    setIsPlaying(true);
  };

  const handleNextTrack = () => {
    if (!selectedMood || !currentTrack) return;
    const playlist = moodPlaylists.find((p) => p.mood === selectedMood);
    if (!playlist) return;
    
    const currentIndex = playlist.tracks.findIndex((t) => t.id === currentTrack.id);
    const nextIndex = currentIndex < playlist.tracks.length - 1 ? currentIndex + 1 : 0;
    setCurrentTrack(playlist.tracks[nextIndex]);
    setIsPlaying(true);
  };

  if (!currentTrack) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 shadow-xl"
    >
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleNextTrack}
      />

      {/* Progress Bar */}
      <div className="mb-6">
        <input
          type="range"
          min="0"
          max={currentTrack.duration}
          value={currentTime}
          onChange={handleSeek}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
          style={{
            background: `linear-gradient(to right, #a855f7 0%, #a855f7 ${
              (currentTime / currentTrack.duration) * 100
            }%, #374151 ${(currentTime / currentTrack.duration) * 100}%, #374151 100%)`,
          }}
        />
        <div className="flex justify-between text-sm text-gray-400 mt-2">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(currentTrack.duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 mb-6">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handlePreviousTrack}
          className="p-3 rounded-full bg-gray-700 text-white hover:bg-gray-600 transition-colors"
          aria-label="Previous track"
        >
          <SkipBack size={24} />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsPlaying(!isPlaying)}
          className="p-4 rounded-full bg-purple-500 text-white hover:bg-purple-600 transition-colors shadow-lg"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" />}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleNextTrack}
          className="p-3 rounded-full bg-gray-700 text-white hover:bg-gray-600 transition-colors"
          aria-label="Next track"
        >
          <SkipForward size={24} />
        </motion.button>
      </div>

      {/* Volume Control */}
      <div className="flex items-center gap-3">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleMute}
          className="text-gray-400 hover:text-white transition-colors"
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </motion.button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={isMuted ? 0 : volume}
          onChange={handleVolumeChange}
          className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
          style={{
            background: `linear-gradient(to right, #a855f7 0%, #a855f7 ${
              (isMuted ? 0 : volume) * 100
            }%, #374151 ${(isMuted ? 0 : volume) * 100}%, #374151 100%)`,
          }}
        />
      </div>
    </motion.div>
  );
};

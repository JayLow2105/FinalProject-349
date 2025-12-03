import { create } from 'zustand';
import { Mood, Track, AppSettings } from '../types';

interface MusicStore {
  // Current state
  selectedMood: Mood | null;
  currentTrack: Track | null;
  isPlaying: boolean;
  currentTime: number;
  volume: number;
  isMuted: boolean;
  
  // Favorites and history
  favorites: Set<string>;
  recentMoods: Mood[];
  
  // Settings
  settings: AppSettings;
  
  // Actions
  setSelectedMood: (mood: Mood) => void;
  setCurrentTrack: (track: Track | null) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setCurrentTime: (time: number) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  toggleFavorite: (trackId: string) => void;
  isFavorite: (trackId: string) => boolean;
  addRecentMood: (mood: Mood) => void;
  updateSettings: (settings: Partial<AppSettings>) => void;
}

// Load from localStorage
const loadFavorites = (): Set<string> => {
  try {
    const saved = localStorage.getItem('tunemood-favorites');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  } catch {
    return new Set();
  }
};

const loadRecentMoods = (): Mood[] => {
  try {
    const saved = localStorage.getItem('tunemood-recent-moods');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const loadSettings = (): AppSettings => {
  try {
    const saved = localStorage.getItem('tunemood-settings');
    return saved ? JSON.parse(saved) : { autoplay: false, contentFilter: 'all', volume: 0.7 };
  } catch {
    return { autoplay: false, contentFilter: 'all', volume: 0.7 };
  }
};

export const useMusicStore = create<MusicStore>((set, get) => ({
  selectedMood: null,
  currentTrack: null,
  isPlaying: false,
  currentTime: 0,
  volume: loadSettings().volume,
  isMuted: false,
  favorites: loadFavorites(),
  recentMoods: loadRecentMoods(),
  settings: loadSettings(),

  setSelectedMood: (mood) => {
    set({ selectedMood: mood });
    get().addRecentMood(mood);
  },

  setCurrentTrack: (track) => set({ currentTrack: track, currentTime: 0 }),

  setIsPlaying: (isPlaying) => set({ isPlaying }),

  setCurrentTime: (time) => set({ currentTime: time }),

  setVolume: (volume) => {
    set({ volume });
    const settings = get().settings;
    const newSettings = { ...settings, volume };
    set({ settings: newSettings });
    localStorage.setItem('tunemood-settings', JSON.stringify(newSettings));
  },

  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),

  toggleFavorite: (trackId) => {
    const favorites = new Set(get().favorites);
    if (favorites.has(trackId)) {
      favorites.delete(trackId);
    } else {
      favorites.add(trackId);
    }
    set({ favorites });
    localStorage.setItem('tunemood-favorites', JSON.stringify(Array.from(favorites)));
  },

  isFavorite: (trackId) => get().favorites.has(trackId),

  addRecentMood: (mood) => {
    const recent = get().recentMoods.filter((m) => m !== mood);
    const newRecent = [mood, ...recent].slice(0, 4);
    set({ recentMoods: newRecent });
    localStorage.setItem('tunemood-recent-moods', JSON.stringify(newRecent));
  },

  updateSettings: (newSettings) => {
    const settings = { ...get().settings, ...newSettings };
    set({ settings });
    localStorage.setItem('tunemood-settings', JSON.stringify(settings));
  },
}));

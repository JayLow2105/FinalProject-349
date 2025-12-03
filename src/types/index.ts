export type Mood = 'happy' | 'chill' | 'sad' | 'energetic';

export interface Track {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
  audioUrl: string;
  duration: number;
}

export interface MoodPlaylist {
  mood: Mood;
  name: string;
  description: string;
  tracks: Track[];
  gradient: string;
  icon: string;
}

export interface PlayerState {
  currentTrack: Track | null;
  isPlaying: boolean;
  currentTime: number;
  volume: number;
  isMuted: boolean;
}

export interface AppSettings {
  autoplay: boolean;
  contentFilter: 'all' | 'clean';
  volume: number;
}

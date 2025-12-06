# TuneMood — Mood-Based Music Player

A React web application that curates and plays songs based on your selected mood (Happy, Chill, Sad, Energetic).

## Features

- **Mood Selector**: Choose from 4 different moods with beautiful themed UI
- **Curated Playlists**: Each mood has a custom playlist with multiple tracks
- **Now Playing Card**: Displays current track with cover art, title, and artist
- **Audio Player**: Full-featured player with play/pause, seek, volume controls
- **Favorites**: Mark your favorite tracks with persistent storage
- **Recent Moods**: Quick access to recently selected moods
- **Mood-Themed UI**: Background gradients and animations that match your mood
- **Settings**: Customize autoplay and content filter preferences

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Zustand** for state management
- **Framer Motion** for smooth animations
- **Lucide React** for icons
- **localStorage** for data persistence

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open your browser to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` folder, ready for deployment.

## Project Structure

```
src/
├── components/        # React components
│   ├── MoodSelector.tsx
│   ├── NowPlayingCard.tsx
│   ├── AudioPlayer.tsx
│   ├── PlaylistView.tsx
│   ├── BackgroundGradient.tsx
│   ├── RecentMoods.tsx
│   └── Settings.tsx
├── store/            # Zustand store
│   └── musicStore.ts
├── data/             # Mock data
│   └── playlists.ts
├── types/            # TypeScript types
│   └── index.ts
├── App.tsx           # Main app component
├── main.tsx          # Entry point
└── index.css         # Global styles
```

## Features in Detail

### Mood Selection

Click on any mood card to instantly load a themed playlist. Each mood has:

- Unique color gradient
- Custom emoji icon
- Curated track selection
- Animated background

### Music Player

- Play/pause controls
- Track seeking with progress bar
- Volume control with mute option
- Next/previous track navigation
- Time display (current/total)

### Favorites System

- Click the heart icon on any track
- Persists across sessions using localStorage
- Visual indicator for favorited tracks

### Recent Moods

- Shows up to 4 recently selected moods
- Quick access to previously explored playlists
- Automatically updated as you explore

### Settings

- Toggle autoplay for next track
- Content filter (all/clean)
- Persistent preferences

## Browser Compatibility

Works on all modern browsers that support:

- ES2020
- CSS Grid & Flexbox
- Web Audio API
- localStorage

## Future Enhancements

- Integration with Spotify/YouTube APIs
- User authentication
- Custom playlist creation
- Social sharing
- Search functionality
- Dark/light theme toggle

## License

MIT

## Live URL:

https://jaylow2105.github.io/FinalProject-349/

## Author

Quoc Nguyen

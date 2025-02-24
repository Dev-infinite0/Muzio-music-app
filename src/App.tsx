import { useState, useRef, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Main } from './components/Main';
import { Player } from './components/Player';
import { Song } from './types';
import { songs } from './data';

function App() {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playlists, setPlaylists] = useState<{ id: string; name: string; songs: Song[] }[]>([
    { id: '1', name: 'My Playlist #1', songs: [] },
    { id: '2', name: 'Chill Vibes', songs: [] }
  ]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleSelectSong = async (song: Song) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.src = song.url;
      
      try {
        await audioRef.current.load();
        setCurrentSong(song);
        audioRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.error('Error loading audio:', error);
        setIsPlaying(false);
      }
    }
  };

  const handlePlayPause = () => {
    if (currentSong && audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleNext = () => {
    if (currentSong) {
      const currentIndex = songs.findIndex(song => song.id === currentSong.id);
      const nextSong = songs[(currentIndex + 1) % songs.length];
      handleSelectSong(nextSong);
    }
  };

  const handlePrevious = () => {
    if (currentSong) {
      const currentIndex = songs.findIndex(song => song.id === currentSong.id);
      const previousSong = songs[(currentIndex - 1 + songs.length) % songs.length];
      handleSelectSong(previousSong);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (value: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value;
      setCurrentTime(value);
    }
  };

  const handleVolumeChange = (value: number) => {
    if (audioRef.current) {
      audioRef.current.volume = value;
      setVolume(value);
    }
  };

  const addToPlaylist = (playlistId: string, song: Song) => {
    setPlaylists(prevPlaylists => 
      prevPlaylists.map(playlist => 
        playlist.id === playlistId
          ? { ...playlist, songs: [...playlist.songs, song] }
          : playlist
      )
    );
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('ended', handleNext);
      audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
      audioRef.current.volume = volume;
      
      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener('ended', handleNext);
          audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
        }
      };
    }
  }, []);

  return (
    <div className="h-screen flex flex-col bg-spotify-dark text-white font-bold">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar playlists={playlists} />
        <Main 
          onSelectSong={handleSelectSong} 
          onAddToPlaylist={(song) => {
            const playlistId = window.prompt('Enter playlist ID (1 for My Playlist #1, 2 for Chill Vibes):');
            if (playlistId) {
              addToPlaylist(playlistId, song);
            }
          }}
        />
      </div>
      
      <Player
        currentSong={currentSong}
        isPlaying={isPlaying}
        currentTime={currentTime}
        duration={duration}
        volume={volume}
        onPlayPause={handlePlayPause}
        onNext={handleNext}
        onPrevious={handlePrevious}
        onSeek={handleSeek}
        onVolumeChange={handleVolumeChange}
      />
      
      <audio ref={audioRef} />
    </div>
  );
}

export default App;
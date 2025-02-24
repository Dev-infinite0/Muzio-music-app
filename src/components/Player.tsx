
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { Song } from '../types';
import { clsx } from 'clsx';

interface PlayerProps {
  currentSong: Song | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onSeek: (time: number) => void;
  onVolumeChange: (volume: number) => void;
}

export function Player({ 
  currentSong, 
  isPlaying, 
  currentTime, 
  duration, 
  volume,
  onPlayPause, 
  onNext, 
  onPrevious,
  onSeek,
  onVolumeChange
}: PlayerProps) {
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <footer className="bg-spotify-dark-secondary border-t border-spotify-dark-hover px-6 py-4 fixed bottom-0 w-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 w-1/3">
          {currentSong && (
            <>
              <img src={currentSong.cover} alt={currentSong.title} className="w-16 h-16 rounded-lg" />
              <div className="flex flex-col">
                <strong className="text-sm font-bold text-white">{currentSong.title}</strong>
                <span className="text-xs font-bold text-violet-300">{currentSong.artist}</span>
              </div>
            </>
          )}
        </div>
        
        <div className="flex flex-col items-center w-1/3">
          <div className="flex items-center gap-6">
            <button 
              className="w-8 h-8 flex items-center justify-center text-violet-300 hover:text-white transition-colors"
              onClick={onPrevious}
            >
              <SkipBack className="w-5 h-5" />
            </button>
            
            <button 
              className={clsx(
                "w-10 h-10 flex items-center justify-center rounded-full",
                "bg-spotify-primary text-white hover:bg-spotify-secondary transition-colors"
              )}
              onClick={onPlayPause}
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
            </button>
            
            <button 
              className="w-8 h-8 flex items-center justify-center text-violet-300 hover:text-white transition-colors"
              onClick={onNext}
            >
              <SkipForward className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs font-bold text-violet-300">{formatTime(currentTime)}</span>
            <input
              type="range"
              min="0"
              max={duration || 100}
              value={currentTime}
              onChange={(e) => onSeek(Number(e.target.value))}
              className="h-1 w-96 rounded-full appearance-none bg-spotify-dark-hover [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white hover:[&::-webkit-slider-thumb]:bg-spotify-primary cursor-pointer"
            />
            <span className="text-xs font-bold text-violet-300">{formatTime(duration)}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4 w-1/3 justify-end">
          <Volume2 className="text-violet-300" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => onVolumeChange(Number(e.target.value))}
            className="h-1 w-24 rounded-full appearance-none bg-spotify-dark-hover [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white hover:[&::-webkit-slider-thumb]:bg-spotify-primary cursor-pointer"
          />
        </div>
      </div>
    </footer>
  );
}
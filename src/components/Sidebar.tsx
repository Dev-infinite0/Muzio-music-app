
import { Home, Search, Library, Plus } from 'lucide-react';
import { Song } from '../types';

interface SidebarProps {
  playlists: {
    id: string;
    name: string;
    songs: Song[];
  }[];
}

export function Sidebar({ playlists }: SidebarProps) {
  return (
    <aside className="w-72 bg-spotify-dark p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-white">MUZIO</h1>
      </div>
      
      <nav className="space-y-5">
        <a href="/" className="flex items-center gap-3 text-sm font-bold text-white hover:text-spotify-primary transition-colors">
          <Home className="h-6 w-6" />
          Home
        </a>
        <a href="/search" className="flex items-center gap-3 text-sm font-bold text-white hover:text-spotify-primary transition-colors">
          <Search className="h-6 w-6" />
          Search
        </a>
        <a href="/library" className="flex items-center gap-3 text-sm font-bold text-white hover:text-spotify-primary transition-colors">
          <Library className="h-6 w-6" />
          Your Library
        </a>
      </nav>

      <nav className="mt-6 pt-6 border-t border-spotify-dark-secondary flex flex-col gap-3">
        <a href="#" className="text-sm font-bold text-violet-300 hover:text-white transition-colors flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create Playlist
        </a>
      </nav>

      <nav className="mt-6 pt-6 border-t border-spotify-dark-secondary flex flex-col gap-2">
        {playlists.map(playlist => (
          <div key={playlist.id} className="space-y-1">
            <h3 className="text-sm font-bold text-violet-300 hover:text-white transition-colors cursor-pointer">
              {playlist.name} ({playlist.songs.length})
            </h3>
            {playlist.songs.length > 0 && (
              <ul className="pl-4 space-y-1">
                {playlist.songs.map(song => (
                  <li key={song.id} className="text-xs font-bold text-violet-400 truncate">
                    {song.title}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
}
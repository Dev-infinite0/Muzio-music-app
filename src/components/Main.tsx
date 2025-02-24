import { Play, Plus } from 'lucide-react';
import { Song } from '../types';
import { songs } from '../data';

interface MainProps {
  onSelectSong: (song: Song) => void;
  onAddToPlaylist: (song: Song) => void;
}

export function Main({ onSelectSong, onAddToPlaylist }: MainProps) {
  return (
    <main className="flex-1 p-6 bg-gradient-to-b from-spotify-dark-secondary to-spotify-dark overflow-y-auto">
      <div className="flex items-center gap-4 mb-8">
        <h1 className="text-4xl font-black text-white">MUZIO</h1>
      </div>

      <section className="mb-8">
        <h2 className="text-2xl font-black mb-4">Recently Played</h2>
        <div className="grid grid-cols-3 gap-4">
          {songs.map((song) => (
            <div
              key={song.id}
              className="group relative bg-spotify-dark-secondary rounded-lg flex items-center gap-4 overflow-hidden hover:bg-spotify-dark-hover transition-colors"
            >
              <img src={song.cover} alt={song.title} className="w-24 h-24" />
              <strong className="font-bold">{song.title}</strong>
              <div className="absolute right-4 flex items-center gap-2">
                <button 
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-spotify-primary text-white hover:bg-spotify-secondary transition-colors"
                  onClick={() => onAddToPlaylist(song)}
                >
                  <Plus className="w-5 h-5" />
                </button>
                <button 
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-spotify-primary text-white hover:bg-spotify-secondary transition-colors"
                  onClick={() => onSelectSong(song)}
                >
                  <Play className="w-5 h-5 ml-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-black mb-4">Your Daily Mix</h2>
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3].map((mix) => (
            <div
              key={`daily-mix-${mix}`}
              className="bg-spotify-dark-secondary p-4 rounded-lg hover:bg-spotify-dark-hover transition-colors"
            >
              <div className="relative aspect-square mb-4">
                <div className="grid grid-cols-2 gap-1">
                  <img src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop" alt="" className="w-full h-full object-cover" />
                  <img src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop" alt="" className="w-full h-full object-cover" />
                  <img src="https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop" alt="" className="w-full h-full object-cover" />
                  <img src="https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop" alt="" className="w-full h-full object-cover" />
                </div>
                <button className="absolute bottom-2 right-2 w-12 h-12 flex items-center justify-center rounded-full bg-spotify-primary text-white hover:bg-spotify-secondary transition-colors shadow-lg">
                  <Play className="w-6 h-6 ml-1" />
                </button>
              </div>
              <h3 className="font-bold text-lg mb-2">Daily Mix {mix}</h3>
              <p className="text-sm text-violet-300 font-semibold">A perfect mix of new and familiar music</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-black mb-4">Featured Albums</h2>
        <div className="grid grid-cols-5 gap-4">
          {[
            {
              title: "Summer Vibes",
              artist: "Various Artists",
              cover: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&h=300&fit=crop"
            },
            {
              title: "Night Drive",
              artist: "The Midnight",
              cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop"
            },
            {
              title: "Urban Jazz",
              artist: "City Collective",
              cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop"
            },
            {
              title: "Electronic Dreams",
              artist: "Synthwave",
              cover: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop"
            },
            {
              title: "Acoustic Sessions",
              artist: "Folk Band",
              cover: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=300&h=300&fit=crop"
            }
          ].map((album) => (
            <div
              key={album.title}
              className="bg-spotify-dark-secondary p-3 rounded-lg hover:bg-spotify-dark-hover transition-colors group"
            >
              <div className="relative mb-4">
                <img src={album.cover} className="w-full aspect-square object-cover rounded-lg" alt={album.title} />
                <button className="absolute bottom-2 right-2 w-10 h-10 flex items-center justify-center rounded-full bg-spotify-primary text-white opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-spotify-secondary">
                  <Play className="w-5 h-5 ml-0.5" />
                </button>
              </div>
              <strong className="font-bold block mb-1">{album.title}</strong>
              <span className="text-sm text-violet-300 font-semibold">{album.artist}</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-black mb-4">Made for You</h2>
        <div className="grid grid-cols-5 gap-4">
          {songs.map((song) => (
            <div
              key={song.id}
              className="bg-spotify-dark-secondary p-3 rounded-lg hover:bg-spotify-dark-hover transition-colors flex flex-col gap-2"
            >
              <div className="relative group">
                <img src={song.cover} className="w-full rounded-lg" alt={song.title} />
                <div className="absolute bottom-2 right-2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-spotify-primary text-white hover:bg-spotify-secondary transition-colors"
                    onClick={() => onAddToPlaylist(song)}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                  <button 
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-spotify-primary text-white hover:bg-spotify-secondary transition-colors"
                    onClick={() => onSelectSong(song)}
                  >
                    <Play className="w-4 h-4 ml-0.5" />
                  </button>
                </div>
              </div>
              <strong className="font-bold mt-2">{song.title}</strong>
              <span className="text-sm text-violet-300 font-semibold">{song.artist}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
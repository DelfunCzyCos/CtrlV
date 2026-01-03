import { Movie } from "../data/movies";
import { Eye, MonitorPlay } from "lucide-react";
import { Button } from "./ui/button";

interface MovieDetailProps {
  movie: Movie;
}

export function MovieDetail({ movie }: MovieDetailProps) {
  return (
    <div className="pt-24 px-4 md:px-12 max-w-7xl mx-auto pb-20 text-white animate-in fade-in duration-500">
      
      {/* Top Section: Trailer & Poster */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Left: Trailer */}
        <div className="lg:col-span-2 space-y-4">
          <div className="aspect-video w-full bg-black rounded-xl overflow-hidden shadow-2xl border border-zinc-800">
            <iframe 
              width="100%" 
              height="100%" 
              src={movie.trailerUrl + "?autoplay=1&mute=1"} 
              title="Movie Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
          <div className="flex items-center gap-4">
             <h1 className="text-3xl md:text-5xl font-bold">{movie.title}</h1>
          </div>
        </div>

        {/* Right: Poster & Stats */}
        <div className="flex flex-col gap-6">
          <div className="relative aspect-[2/3] w-full max-w-sm mx-auto lg:max-w-none rounded-xl overflow-hidden shadow-2xl">
            <img 
              src={movie.imageUrl} 
              alt={movie.title} 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="bg-zinc-900/50 p-4 rounded-xl border border-zinc-800 flex items-center justify-center gap-3">
            <Eye className="w-5 h-5 text-blue-400" />
            <span className="font-semibold text-lg">{movie.views.toLocaleString()}</span>
            <span className="text-gray-400 text-sm">osób obejrzało</span>
          </div>
        </div>
      </div>

      {/* Details & Where to Watch */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Description */}
        <div className="lg:col-span-2 space-y-6">
           <div className="flex flex-wrap gap-3 text-sm font-medium text-gray-300">
            <span className="bg-zinc-800 px-3 py-1 rounded-full text-white">{movie.year}</span>
            <span className="bg-zinc-800 px-3 py-1 rounded-full text-white">{movie.duration}</span>
            <span className="bg-zinc-800 px-3 py-1 rounded-full text-white">{movie.category}</span>
          </div>
          
          <h2 className="text-2xl font-bold border-b border-zinc-800 pb-2">Opis fabuły</h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            {movie.description}
          </p>
        </div>

        {/* Where to Watch */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold border-b border-zinc-800 pb-2 flex items-center gap-2">
            <MonitorPlay className="w-6 h-6 text-red-500" />
            Gdzie obejrzeć
          </h2>
          
          <div className="space-y-3">
            {movie.platforms.map((platform) => (
              <a 
                key={platform.name}
                href={platform.url}
                className={`flex items-center justify-between p-4 rounded-xl transition-transform hover:scale-105 ${platform.color} shadow-lg cursor-pointer group`}
              >
                <span className="font-bold text-xl">{platform.name}</span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium group-hover:bg-white/30">
                  Oglądaj
                </span>
              </a>
            ))}
            
            {movie.platforms.length === 0 && (
              <p className="text-gray-500 italic">Obecnie niedostępne na platformach streamingowych.</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

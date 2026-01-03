import { Movie } from "../data/movies";
import { Play, Plus, ThumbsUp, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <div className="group relative h-40 md:h-48 aspect-video bg-gray-900 rounded-md overflow-hidden cursor-pointer transition-transform duration-300 hover:z-20 hover:scale-105">
      <img
        src={movie.imageUrl}
        alt={movie.title}
        className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
      />
      
      {/* Hover Card */}
      <div className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-zinc-900 shadow-xl rounded-md flex flex-col overflow-hidden">
         <img
          src={movie.imageUrl}
          alt={movie.title}
          className="w-full h-1/2 object-cover"
        />
        <div className="p-3 flex flex-col justify-between h-1/2">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Button size="icon" className="w-8 h-8 rounded-full bg-white text-black hover:bg-gray-200">
                        <Play className="w-4 h-4 fill-black" />
                    </Button>
                    <Button size="icon" variant="ghost" className="w-8 h-8 rounded-full border border-gray-500 text-gray-300 hover:border-white hover:text-white hover:bg-transparent">
                        <Plus className="w-4 h-4" />
                    </Button>
                     <Button size="icon" variant="ghost" className="w-8 h-8 rounded-full border border-gray-500 text-gray-300 hover:border-white hover:text-white hover:bg-transparent">
                        <ThumbsUp className="w-4 h-4" />
                    </Button>
                </div>
                 <Button size="icon" variant="ghost" className="w-8 h-8 rounded-full border border-gray-500 text-gray-300 hover:border-white hover:text-white hover:bg-transparent">
                        <ChevronDown className="w-4 h-4" />
                    </Button>
            </div>
            
            <div className="mt-2">
                <div className="flex items-center gap-2 text-[10px] text-gray-400 font-semibold">
                     <span className="text-green-400">98% trafności</span>
                     <span className="border border-gray-500 px-1 rounded-[2px]">16+</span>
                     <span>{movie.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-gray-200 mt-1">
                    <span>{movie.category}</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

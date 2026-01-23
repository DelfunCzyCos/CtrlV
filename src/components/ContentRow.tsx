import {Movie} from "../routes/movies";
import {MovieCard} from "./MovieCard";
import {ChevronRight} from "lucide-react";

interface ContentRowProps {
    title: string,
    movies: Movie[],
    onMovieClick: (movie: Movie) => void,
    key?: string
}

export function ContentRow({title, movies, onMovieClick, key}: ContentRowProps) {
    return (
        <div className="py-4 px-6 md:px-12 space-y-4">
            <div className="flex items-center gap-2 text-gray-100 mb-2 cursor-pointer group/title">
                <h2 className="text-xl md:text-2xl font-semibold transition-colors group-hover/title:text-red-500">
                    {title}
                </h2>
                <div
                    className="text-sm font-semibold opacity-0 -translate-x-4 transition-all duration-300 group-hover/title:opacity-100 group-hover/title:translate-x-0 text-red-500 flex items-center">
                    Przeglądaj wszystko <ChevronRight className="w-4 h-4"/>
                </div>
            </div>

            <div className="relative">
                <div className="flex gap-12 overflow-x-auto overflow-y-hidden scrollbar-hide snap-x px-8 pt-12 pb-20 -my-12">
                    {movies.map((movie) => (
                        <div
                            key={movie.id}
                            className="flex-none w-[280px] md:w-[320px] snap-start"
                            onClick={() => onMovieClick(movie)}
                        >
                            <MovieCard movie={movie}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
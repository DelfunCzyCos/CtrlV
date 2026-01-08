import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { StreamingApps } from "./components/StreamingApps";
import { MovieDetail } from "./components/MovieDetail";
import { ContentRow } from "./components/ContentRow"; // We need to modify ContentRow to accept onClick
import { movies, categories, Movie } from "./data/movies";

export default function App() {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  return (
    <div className="min-h-screen bg-[#141414] text-foreground font-sans selection:bg-red-500 selection:text-white">
      <Navbar
        showBack={!!selectedMovie}
        onBack={() => setSelectedMovie(null)}
      />

      {selectedMovie ? (
        <MovieDetail movie={selectedMovie} />
      ) : (
        <>
          <StreamingApps />

          <div className="relative z-20 pb-20 space-y-4">
            {categories.map((category) => (
              <ContentRow
                key={category}
                title={category}
                movies={category === "Polecane" ? movies : movies.filter(m => m.category === category || category === "Polecane")}
                onMovieClick={(movie) => setSelectedMovie(movie)}
              />
            ))}
          </div>
        </>
      )}

      <footer className="py-10 px-6 md:px-12 text-gray-500 text-sm border-t border-zinc-900 mt-auto">
        <p className="text-center">&copy; 2024 Streaming Aggregator. All rights reserved.</p>
      </footer>
    </div>
  );
}

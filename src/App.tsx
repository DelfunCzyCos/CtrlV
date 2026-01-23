import { useEffect, useState } from "react";
import { Navbar } from "./components/Navbar";
import { StreamingApps } from "./components/StreamingApps";
import { MovieDetail } from "./components/MovieDetail";
import { ContentRow } from "./components/ContentRow";
import { movies, categories, Movie } from "./data/movies";

export default function App() {
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
    const [isDarkMode, setIsDarkMode] = useState(true);

    useEffect(() => {
        // Dodajemy klasę do <html>
        if (isDarkMode) {
            document.documentElement.classList.add("dark");
            document.documentElement.classList.remove("light");
        } else {
            document.documentElement.classList.add("light");
            document.documentElement.classList.remove("dark");
        }
    }, [isDarkMode]);

    return (
        <div className={`min-h-screen ${isDarkMode ? "bg-[#141414] text-white" : "bg-white text-black"} font-sans`}>
            <Navbar
                showBack={!!selectedMovie}
                onBack={() => setSelectedMovie(null)}
                onSearch={(q) => console.log("Search query:", q)}
                onSelectFavorite={(id: string) => {
                    const m = movies.find((x) => String(x.id) === String(id));
                    if (m) setSelectedMovie(m);
                }}
                isDarkMode={isDarkMode}
                setIsDarkMode={setIsDarkMode}
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

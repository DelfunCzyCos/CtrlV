import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { movies as initialMovies } from '../../data/movies';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Plus, Trash2, Search } from 'lucide-react';

const AdminDashboard: React.FC = () => {
    const navigate = useNavigate();
    const [moviesList, setMoviesList] = useState(initialMovies);

    const handleNavigate = (movieId: string) => {
        navigate(`/admin/detail/${movieId}`);
    };

    const handleDelete = (e: React.MouseEvent, movieId: string, title: string) => {
        e.stopPropagation();
        if (window.confirm(`Czy na pewno chcesz usunąć film "${title}"?`)) {
            setMoviesList(prev => prev.filter(m => m.id !== movieId));
        }
    };

    const handleAddMovie = () => {
        alert("Otwieranie formularza dodawania nowego filmu");
    };

    return (
        <div className="min-h-screen bg-[#141414] p-4 md:p-8 text-white font-sans">
            <header className="max-w-5xl mx-auto mb-8 space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <h1 className="text-3xl font-bold">Panel Administratora</h1>
                    <Button
                        onClick={handleAddMovie}
                        className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2 h-11 px-6 transition-colors duration-200"
                    >
                        <Plus className="w-5 h-5" /> Dodaj nowy film
                    </Button>
                </div>

                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                        className="w-full pl-10 bg-zinc-800 border-zinc-700 text-white placeholder:text-gray-400 focus-visible:ring-red-600 rounded-lg h-12 text-base"
                        placeholder="Szukaj filmów do edycji..."
                    />
                </div>
            </header>

            <div className="max-w-5xl mx-auto">
                <div className="bg-zinc-900/50 rounded-xl border border-zinc-800 overflow-hidden">
                    <div className="p-4 border-b border-zinc-800 bg-zinc-900 text-zinc-400 text-xs font-bold uppercase tracking-wider flex justify-between">
                        <span>Lista Filmów</span>
                        <span>Akcje</span>
                    </div>

                    <ul className="divide-y divide-zinc-800">
                        {moviesList.map((movie) => (
                            <li key={movie.id} className="transition-colors duration-200">
                                <div className="flex items-center justify-between p-4 hover:bg-zinc-800/80 group">
                                    <button
                                        onClick={() => handleNavigate(movie.id)}
                                        className="flex-1 text-left flex flex-col gap-1 hover:text-red-500 transition-colors"
                                    >
                                        <span className="text-lg font-bold leading-tight">
                                            {movie.title}
                                        </span>
                                        <span className="text-xs text-zinc-400 font-medium">
                                            {movie.category} <span className="mx-1 text-zinc-600">•</span> {movie.year}
                                        </span>
                                    </button>

                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={(e) => handleDelete(e, movie.id, movie.title)}
                                            className="text-zinc-500 hover:text-red-500 hover:bg-red-900/30 rounded-full transition-all duration-200"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </Button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {moviesList.length === 0 && (
                    <div className="text-center py-20 text-zinc-500 border-2 border-dashed border-zinc-800 rounded-xl mt-4">
                        Brak filmów.
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
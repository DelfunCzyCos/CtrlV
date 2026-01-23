import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Plus, Trash2, Search } from 'lucide-react';

type Movie = {
    id: number;
    title: string;
    year: number | null;
    categories: string[];
};

const AdminDashboard: React.FC = () => {
    const [moviesList, setMoviesList] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const res = await fetch('/api/movies');
                const data = await res.json();
                setMoviesList(data);
            } catch (e) {
                console.error('Błąd pobierania filmów', e);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    const handleDelete = (e: React.MouseEvent, id: number, title: string) => {
        e.stopPropagation();
        if (window.confirm(`Usunąć film "${title}"?`)) {
            setMoviesList(prev => prev.filter(m => m.id !== id));
            // TODO: wywołanie DELETE /api/movies/:id jeśli dodasz endpoint
        }
    };

    return (
        <div className="min-h-screen bg-[#141414] p-4 md:p-8 text-white">
            <header className="max-w-5xl mx-auto mb-8 space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <h1 className="text-3xl font-bold">Panel Administratora</h1>
                    <Button className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2 h-11 px-6">
                        <Plus className="w-5 h-5" /> Dodaj nowy film
                    </Button>
                </div>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input className="w-full pl-10 bg-zinc-800 border-zinc-700 text-white h-12" placeholder="Szukaj filmów..." />
                </div>
            </header>

            <div className="max-w-5xl mx-auto">
                {loading ? (
                    <div className="text-center py-20 text-zinc-500">Ładowanie danych...</div>
                ) : moviesList.length === 0 ? (
                    <div className="text-center py-20 text-zinc-500 border-2 border-dashed border-zinc-800 rounded-xl mt-4">
                        Brak filmów.
                    </div>
                ) : (
                    <div className="bg-zinc-900/50 rounded-xl border border-zinc-800 overflow-hidden">
                        <div className="p-4 border-b border-zinc-800 bg-zinc-900 text-zinc-400 text-xs font-bold uppercase tracking-wider flex justify-between">
                            <span>Lista Filmów</span>
                            <span>Akcje</span>
                        </div>
                        <ul className="divide-y divide-zinc-800">
                            {moviesList.map((movie) => (
                                <li key={movie.id} className="transition-colors duration-200">
                                    <div className="flex items-center justify-between p-4 hover:bg-zinc-800/80 group">
                                        <button className="flex-1 text-left flex flex-col gap-1 hover:text-red-500">
                                            <span className="text-lg font-bold leading-tight">{movie.title}</span>
                                            <span className="text-xs text-zinc-400 font-medium">
                        {movie.categories.join(', ')} <span className="mx-1 text-zinc-600">•</span> {movie.year ?? '—'}
                      </span>
                                        </button>
                                        <div className="flex items-center gap-2">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={(e) => handleDelete(e, movie.id, movie.title)}
                                                className="text-zinc-500 hover:text-red-500 hover:bg-red-900/30 rounded-full duration-200"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </Button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
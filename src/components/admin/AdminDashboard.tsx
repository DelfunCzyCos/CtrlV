import React from 'react';
import { useNavigate } from 'react-router-dom';
import { movies } from '../../data/movies';
import { Input } from '../ui/input';

const AdminDashboard: React.FC = () => {
    const navigate = useNavigate(); // Hook służący do nawigacji

    const handleNavigate = (movieId: string) => {
        navigate(`/admin/detail/${movieId}`);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-4 md:p-8">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-4">Panel Administratora - Lista Filmów</h1>
                <div className="relative max-w-md mx-auto">
                    <Input
                        className="w-full pl-10 bg-zinc-800 border border-zinc-700 text-white placeholder:text-gray-400 focus-visible:ring-red-600 rounded-lg h-10 md:h-12 text-base"
                        placeholder="Szukaj filmów, seriali, gatunków..."
                    />
                </div>
            </header>

            <ul className="space-y-4">
                {movies.map((movie) => (
                    <li key={movie.id}>
                        <button
                            onClick={() => handleNavigate(movie.id)}
                            className="w-full text-left text-lg font-medium text-white bg-zinc-900 p-4 rounded-md shadow-md border border-zinc-800 hover:bg-zinc-800 transition"
                        >
                            {movie.title}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminDashboard;
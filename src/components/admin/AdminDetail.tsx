import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { movies } from '../../data/movies';

const AdminDetail: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const selectedMovie = movies.find((movie) => movie.id === id);

    if (!selectedMovie) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-4 md:p-8 text-center">
                <h1 className="text-3xl font-bold text-white mb-4">Film nie został znaleziony</h1>
                <button
                    onClick={() => navigate('/admin')}
                    className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700 transition"
                >
                    Powrót do panelu administracyjnego
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-4 md:p-8">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-4">{selectedMovie.title}</h1>
            </header>

            <div className="space-y-4 text-white">
                <p><strong>ID filmu:</strong> {selectedMovie.id}</p>
                <p><strong>Opis:</strong> {selectedMovie.description || 'Brak opisu'}</p>
            </div>

            <footer className="mt-8">
                <button
                    onClick={() => navigate('/admin')}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                >
                    Powrót do panelu
                </button>
            </footer>
        </div>
    );
};

export default AdminDetail;
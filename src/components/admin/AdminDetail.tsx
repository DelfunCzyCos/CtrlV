import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { movies, Movie, PLATFORMS, Platform } from '../../data/movies';
import { Eye, MonitorPlay, Save, ArrowLeft, Trash2, Link as LinkIcon, CheckCircle2, Plus, List  } from "lucide-react";
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface EditableEpisode {
    id: number;
    title: string;
    code: string;
    description: string;
    platforms: { name: string; url: string; color: string }[];
}

const AdminDetail: React.FC = () => {
    const { movieId } = useParams<{ movieId: string }>();
    const navigate = useNavigate();

    const originalMovie = movies.find((m) => m.id === movieId);
    const [editedMovie, setEditedMovie] = useState<Movie | null>(null);

    const [episodes, setEpisodes] = useState<EditableEpisode[]>([
        {
            id: 1,
            title: "Odcinek 1",
            code: "S1 O1",
            description: "Opis pierwszego odcinka",
            platforms: []
        }
    ]);

    useEffect(() => {
        if (originalMovie) {
            setEditedMovie({ ...originalMovie });
        }
    }, [originalMovie]);

    if (!editedMovie) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center text-white">
                <div className="text-center">
                    <h1 className="text-3xl font-bold mb-4">Film nie został znaleziony</h1>
                    <Button onClick={() => navigate('/admin/dashboard')} variant="destructive">Powrót</Button>
                </div>
            </div>
        );
    }

    const handleEpisodeChange = (index: number, field: keyof EditableEpisode, value: string) => {
        const newEpisodes = [...episodes];
        newEpisodes[index] = { ...newEpisodes[index], [field]: value };
        setEpisodes(newEpisodes);
    };

    const addEpisode = () => {
        const newId = episodes.length > 0 ? Math.max(...episodes.map(e => e.id)) + 1 : 1;
        setEpisodes([...episodes, { id: newId, title: "", code: `S1 O${newId}`, description: "", platforms: [] }]);
    };

    const removeEpisode = (id: number) => {
        setEpisodes(episodes.filter(ep => ep.id !== id));
    };

    const toggleEpisodePlatform = (episodeIndex: number, platform: Platform) => {
        const newEpisodes = [...episodes];
        const ep = { ...newEpisodes[episodeIndex] };
        const exists = ep.platforms.find(p => p.name === platform.name);

        if (exists) {
            ep.platforms = ep.platforms.filter(p => p.name !== platform.name);
        } else {
            ep.platforms = [...ep.platforms, { ...platform, url: '' }];
        }

        newEpisodes[episodeIndex] = ep;
        setEpisodes(newEpisodes);
    };

    const updateEpisodePlatformUrl = (episodeIndex: number, platformName: string, newUrl: string) => {
        const newEpisodes = [...episodes];
        newEpisodes[episodeIndex].platforms = newEpisodes[episodeIndex].platforms.map(p =>
            p.name === platformName ? { ...p, url: newUrl } : p
        );
        setEpisodes(newEpisodes);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEditedMovie(prev => prev ? ({ ...prev, [name]: value }) : null);
    };

    const togglePlatform = (platform: Platform) => {
        setEditedMovie(prev => {
            if (!prev) return null;
            const exists = prev.platforms.find(p => p.name === platform.name);
            if (exists) {
                return { ...prev, platforms: prev.platforms.filter(p => p.name !== platform.name) };
            } else {
                return { ...prev, platforms: [...prev.platforms, { ...platform }] };
            }
        });
    };

    const updatePlatformUrl = (platformName: string, newUrl: string) => {
        setEditedMovie(prev => {
            if (!prev) return null;
            return {
                ...prev,
                platforms: prev.platforms.map(p => p.name === platformName ? { ...p, url: newUrl } : p)
            };
        });
    };

    const handleSave = () => {
        setEditedMovie(prev => prev ? ({ ...prev }) : null);
    };

    const handleDelete = () => {
        if (window.confirm(`Czy na pewno chcesz usunąć film "${editedMovie.title}"?`)) {
            navigate('/admin/dashboard');
        }
    };

    return (
        <div className="min-h-screen bg-[#141414] text-white">
            <div className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-zinc-800 p-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <Button variant="ghost" onClick={() => navigate('/admin/dashboard')} className="hover:bg-zinc-800">
                        <ArrowLeft className="w-5 h-5 mr-2" /> Panel
                    </Button>
                    <div className="flex gap-3">
                        <Button onClick={handleDelete} variant="ghost" className="text-red-500 hover:bg-red-500/10">
                            <Trash2 className="w-4 h-4 mr-2" /> Usuń film
                        </Button>
                        <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700 text-white font-bold">
                            <Save className="w-4 h-4 mr-2" /> Zapisz zmiany
                        </Button>
                    </div>
                </div>
            </div>

            <div className="pt-8 px-4 md:px-12 max-w-7xl mx-auto pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                    <div className="lg:col-span-2 space-y-4">
                        <div className="aspect-video w-full bg-black rounded-xl overflow-hidden shadow-2xl border border-zinc-800">
                            <iframe width="100%" height="100%" src={editedMovie.trailerUrl} title="Trailer" frameBorder="0" className="w-full h-full"></iframe>
                        </div>
                        <Input name="trailerUrl" value={editedMovie.trailerUrl} onChange={handleChange} className="bg-zinc-900 border-zinc-700" placeholder="Link do trailera" />
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="relative aspect-[2/3] rounded-xl overflow-hidden shadow-2xl border border-zinc-800">
                            <img src={editedMovie.imageUrl} alt="Poster" className="w-full h-full object-cover" />
                        </div>
                        <Input name="imageUrl" value={editedMovie.imageUrl} onChange={handleChange} className="bg-zinc-900 border-zinc-700" placeholder="Link do plakatu" />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-8">
                        <div className="space-y-4">
                            <Input name="title" value={editedMovie.title} onChange={handleChange} className="text-3xl font-black bg-zinc-900 border-zinc-700 h-16 uppercase tracking-tighter" />
                            <div className="flex flex-wrap gap-4">
                                <Input name="year" type="number" value={editedMovie.year} onChange={handleChange} className="bg-zinc-900 border-zinc-700 flex-1" />
                                <Input name="duration" value={editedMovie.duration} onChange={handleChange} className="bg-zinc-900 border-zinc-700 flex-1" />
                                <Input name="category" value={editedMovie.category} onChange={handleChange} className="bg-zinc-900 border-zinc-700 flex-1" />
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
                                <h2 className="text-2xl font-bold flex items-center gap-2"><List className="w-6 h-6 text-sky-400" /> Odcinki serialu</h2>
                                <Button onClick={addEpisode} size="sm" className="bg-sky-600 hover:bg-sky-700 font-bold"><Plus className="w-4 h-4 mr-1" /> Dodaj odcinek</Button>
                            </div>

                            <div className="space-y-8">
                                {episodes.map((ep, index) => (
                                    <div key={ep.id} className="bg-[#0a0f1d] border border-zinc-800 rounded-2xl p-6 space-y-6 shadow-2xl">
                                        <div className="flex gap-4">
                                            <div className="w-32"><Input value={ep.code} onChange={(e) => handleEpisodeChange(index, 'code', e.target.value)} className="bg-black/40 border-zinc-700 text-sky-400 font-black h-12 text-center" /></div>
                                            <div className="flex-1"><Input value={ep.title} onChange={(e) => handleEpisodeChange(index, 'title', e.target.value)} className="bg-black/40 border-zinc-700 h-12 font-bold" /></div>
                                            <Button variant="ghost" onClick={() => removeEpisode(ep.id)} className="h-12 text-red-500 hover:bg-red-500/10"><Trash2 className="w-5 h-5" /></Button>
                                        </div>
                                        <textarea value={ep.description} onChange={(e) => handleEpisodeChange(index, 'description', e.target.value)} className="w-full h-24 bg-black/40 border border-zinc-700 rounded-xl p-4 text-gray-400" placeholder="Opis odcinka..." />

                                        <div className="space-y-4">
                                            <label className="text-xs font-black text-zinc-500 uppercase tracking-widest">Dostępność odcinka na platformach:</label>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {PLATFORMS.map((platform) => {
                                                    const isSelected = ep.platforms.find(p => p.name === platform.name);
                                                    return (
                                                        <div key={platform.name} className="space-y-3 bg-zinc-900/40 p-4 rounded-2xl border border-zinc-800/50">
                                                            <div onClick={() => toggleEpisodePlatform(index, platform)} className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all ${isSelected ? platform.color + " shadow-lg scale-[1.02]" : "bg-zinc-800 opacity-40 hover:opacity-60"}`}>
                                                                <span className="font-black text-lg">{platform.name}</span>
                                                                {isSelected ? <CheckCircle2 className="w-6 h-6" /> : <div className="w-6 h-6 rounded-full border-2 border-zinc-600" />}
                                                            </div>
                                                            {isSelected && (
                                                                <div className="flex items-center gap-3 px-1">
                                                                    <LinkIcon className="w-5 h-5 text-zinc-500" />
                                                                    <Input placeholder="Wklej bezpośredni link do odcinka..." value={isSelected.url} onChange={(e) => updateEpisodePlatformUrl(index, platform.name, e.target.value)} className="h-10 bg-black/60 border-zinc-700 text-sm font-medium" />
                                                                </div>
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4 pt-8 border-t border-zinc-800">
                            <h2 className="text-3xl font-black uppercase tracking-tighter">Opis fabuły</h2>
                            <textarea name="description" value={editedMovie.description} onChange={handleChange} className="w-full h-48 bg-zinc-900 border border-zinc-700 rounded-2xl p-6 text-gray-300 text-lg leading-relaxed outline-none focus:ring-2 focus:ring-red-600" />
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div className="bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800 flex items-center gap-4 shadow-xl">
                            <Eye className="w-8 h-8 text-blue-400" />
                            <div className="flex-1">
                                <label className="text-xs font-black text-zinc-500 uppercase block mb-1">Wyświetlenia ogółem</label>
                                <input name="views" type="number" value={editedMovie.views} onChange={handleChange} className="bg-transparent text-2xl font-black w-full outline-none" />
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h2 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-2"><MonitorPlay className="w-6 h-6 text-red-500" /> Platformy główne</h2>
                            <div className="space-y-4">
                                {PLATFORMS.map((platform) => {
                                    const isSelected = editedMovie.platforms.find(p => p.name === platform.name);
                                    const selectedPlatform = editedMovie.platforms.find(p => p.name === platform.name);
                                    return (
                                        <div key={platform.name} className="space-y-3 bg-zinc-900/30 p-4 rounded-2xl border border-zinc-800 shadow-lg">
                                            <div onClick={() => togglePlatform(platform)} className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all ${isSelected ? platform.color + " shadow-xl scale-[1.02]" : "bg-zinc-800 opacity-50 hover:opacity-70"}`}>
                                                <span className="font-black text-xl">{platform.name}</span>
                                                {isSelected ? <CheckCircle2 className="w-6 h-6" /> : <div className="w-6 h-6 rounded-full border-2 border-zinc-600" />}
                                            </div>
                                            {isSelected && (
                                                <div className="flex items-center gap-3 px-1">
                                                    <LinkIcon className="w-5 h-5 text-zinc-500" />
                                                    <Input placeholder="Link główny..." value={selectedPlatform?.url || ''} onChange={(e) => updatePlatformUrl(platform.name, e.target.value)} className="h-10 bg-black/40 border-zinc-700 font-medium" />
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDetail;
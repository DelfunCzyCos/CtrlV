import React, { useEffect, useRef, useState } from "react";
import { Heart, X } from "lucide-react";
import { getFavoritesItems, removeFavorite, subscribeFavorites, type FavoriteItem } from "../lib/favoritesCookie";
import { movies as allMovies } from "../data/movies";

type Props = {
    onSelect?: (id: string) => void;
};

export const FavoriteButton: React.FC<Props> = ({ onSelect }) => {
    const [items, setItems] = useState<FavoriteItem[]>([]);
    const [open, setOpen] = useState(false);
    const panelRef = useRef<HTMLDivElement | null>(null);
    const btnRef = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
        setItems(getFavoritesItems());
        const unsub = subscribeFavorites((itms) => setItems(itms));
        return unsub;
    }, []);

    useEffect(() => {
        const onOutside = (e: MouseEvent) => {
            const t = e.target as Node;
            if (open && panelRef.current && !panelRef.current.contains(t) && btnRef.current && !btnRef.current.contains(t)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", onOutside);
        return () => document.removeEventListener("mousedown", onOutside);
    }, [open]);

    return (
        <div className="relative">
            <button
                ref={btnRef}
                onClick={() => setOpen((s) => !s)}
                aria-expanded={open}
                title="Ulubione"
                className={`flex items-center gap-2 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 ${
                    open ? "bg-red-600 text-white" : "bg-transparent text-gray-300 hover:bg-white/5"
                }`}
            >
                <Heart className="w-5 h-5" />
                <span className="text-sm font-medium">{items.length}</span>
            </button>

            {open && (
                <div ref={panelRef} role="menu" aria-label="Twoje ulubione" className="absolute right-0 mt-2 w-80 max-h-[60vh] bg-zinc-900 border border-zinc-700 rounded-lg p-3 shadow-lg z-50 overflow-auto">
                    <h4 className="text-sm font-semibold text-white mb-3">Twoje ulubione</h4>

                    {items.length === 0 ? (
                        <p className="text-xs text-gray-400">Brak ulubionych</p>
                    ) : (
                        <ul className="space-y-3">
                            {items.map((it) => {
                                const movie = allMovies.find((m) => String(m.id) === String(it.id));
                                return (
                                    <li key={it.id} className="flex items-start justify-between gap-3 p-2 rounded hover:bg-zinc-900/60">
                                        <div className="flex-1 min-w-0">
                                            {movie ? (
                                                <>
                                                    <button
                                                        onClick={() => { onSelect?.(String(movie.id)); setOpen(false); }}
                                                        className="text-sm font-semibold text-white text-left block truncate"
                                                        title={movie.title}
                                                    >
                                                        {movie.title}
                                                    </button>
                                                    <div className="text-xs text-gray-400 mt-1">
                                                        <span>{(movie as any).year ?? it.year ?? "—"}</span>
                                                        <span className="mx-2">•</span>
                                                        <span>{(movie as any).genre ?? it.genre ?? "Brak gatunku"}</span>
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <div className="text-sm font-semibold text-white">{it.title ?? `ID: ${it.id}`}</div>
                                                    <div className="text-xs text-gray-400 mt-1">
                                                        <span>{it.year ?? "—"}</span>
                                                        <span className="mx-2">•</span>
                                                        <span>{it.genre ?? "Brak gatunku"}</span>
                                                    </div>
                                                    <div className="text-xs text-rose-400 mt-1">Film nie występuje w lokalnej liście</div>
                                                </>
                                            )}
                                        </div>

                                        <div className="flex items-start">
                                            <button onClick={() => removeFavorite(it.id)} title={`Usuń ${it.title ?? it.id} z ulubionych`} className="p-1 rounded hover:bg-white/5" aria-label={`Usuń ${it.title ?? it.id} z ulubionych`}>
                                                <X className="w-4 h-4 text-gray-300" />
                                            </button>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    )}

                    {items.length > 0 && (
                        <div className="mt-3 flex justify-end">
                            <button onClick={() => setOpen(false)} className="px-3 py-1 rounded-md bg-white/5 text-sm text-gray-200">Zamknij</button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
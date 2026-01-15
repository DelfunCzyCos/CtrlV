import { Search, ArrowLeft, Sun, Moon, Type, SlidersHorizontal, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState, useRef, useEffect } from "react";
import { PLATFORMS, categories as MOVIE_CATEGORIES, movies } from "../data/movies";

interface NavbarProps {
    onBack?: () => void;
    showBack?: boolean;
    onFiltersChange?: (filters: { platforms: string[]; categories: string[]; directors: string[] }) => void;
}

export function Navbar({ onBack, showBack, onFiltersChange }: NavbarProps) {
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [showFilters, setShowFilters] = useState(false);

    const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedDirectors, setSelectedDirectors] = useState<string[]>([]);

    // Section expand state (controls whether the options are rendered at all)
    const [expandPlatforms, setExpandPlatforms] = useState(false);
    const [expandCategories, setExpandCategories] = useState(false);
    const [expandDirectors, setExpandDirectors] = useState(false);

    const panelRef = useRef<HTMLDivElement | null>(null);
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    // Extract unique directors from movies data
    const directors = Array.from(new Set(movies.map((m) => m.director))).filter(Boolean) as string[];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            if (
                showFilters &&
                panelRef.current &&
                !panelRef.current.contains(target) &&
                buttonRef.current &&
                !buttonRef.current.contains(target)
            ) {
                setShowFilters(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [showFilters]);

    // Close on Escape and restore focus to the toggle button
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape" && showFilters) {
                setShowFilters(false);
                buttonRef.current?.focus();
            }
        };
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [showFilters]);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
        document.documentElement.classList.toggle("light-theme");
    };

    const toggleFontSize = () => {
        console.log("Zmiana wielkości czcionki");
    };

    const toggleSelection = (value: string, list: string[], setList: (s: string[]) => void) => {
        if (list.includes(value)) {
            setList(list.filter((v) => v !== value));
        } else {
            setList([...list, value]);
        }
    };

    const clearFilters = () => {
        setSelectedPlatforms([]);
        setSelectedCategories([]);
        setSelectedDirectors([]);
        buttonRef.current?.focus();
    };

    const applyFilters = () => {
        const filters = {
            platforms: selectedPlatforms,
            categories: selectedCategories,
            directors: selectedDirectors,
        };
        console.log("Applied filters:", filters);
        if (onFiltersChange) onFiltersChange(filters);
        setShowFilters(false);
        buttonRef.current?.focus();
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 border-b border-white/10 px-4 py-3 md:px-8">
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
                <div className="flex items-center">
                    {showBack && (
                        <Button variant="ghost" size="icon" onClick={onBack} className="text-white hover:bg-white/10 mr-2">
                            <ArrowLeft className="w-6 h-6" />
                        </Button>
                    )}

                    <div className="flex-shrink-0 mr-4">
                        <a
                            href="#"
                            className="text-red-600 font-bold tracking-tighter text-2xl md:text-3xl"
                            onClick={(e) => {
                                e.preventDefault();
                                if (onBack) onBack();
                            }}
                        >
                            STREAM
                        </a>
                    </div>
                </div>

                <div className="flex-1 max-w-xl relative hidden sm:block">
                    {/* Search icon (left) */}
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

                    {/* Input with extra right padding so filter button doesn't overlap */}
                    <Input
                        className="w-full pl-10 pr-14 bg-zinc-800 border-zinc-700 text-white placeholder:text-gray-400 focus-visible:ring-red-600 rounded-lg h-10 md:h-12 text-base"
                        placeholder="Szukaj filmów, seriali, gatunków..."
                    />

                    {/* Filters panel (opens anchored to the right of the search area) */}
                    {showFilters && (
                        <div
                            ref={panelRef}
                            id="filters-panel"
                            role="menu"
                            aria-labelledby="filters-toggle"
                            className="absolute right-0 mt-2 w-80 bg-zinc-900 border border-zinc-700 rounded-lg p-4 shadow-lg z-50"
                        >
                            <h3 className="text-sm font-semibold text-white mb-3">Filtruj wyniki</h3>

                            {/* PLATFORMS SECTION */}
                            <div className="mb-3">
                                <div className="flex items-center justify-between mb-2">
                                    <p className="text-xs text-gray-300">Platformy</p>

                                    {/* Icon-only toggle */}
                                    <button
                                        type="button"
                                        onClick={() => setExpandPlatforms((s) => !s)}
                                        className="p-1 text-gray-300 hover:text-white rounded focus:outline-none focus:ring-2 focus:ring-red-600"
                                        aria-expanded={expandPlatforms}
                                        aria-controls="platforms-list"
                                        aria-label={expandPlatforms ? "Zwiń platformy" : "Rozwiń platformy"}
                                    >
                                        <ChevronDown
                                            className={`w-4 h-4 transition-transform ${expandPlatforms ? "rotate-180" : ""}`}
                                        />
                                    </button>
                                </div>

                                {/* Render options only when expanded to keep them completely hidden when collapsed */}
                                {expandPlatforms && (
                                    <div
                                        id="platforms-list"
                                        className="grid grid-cols-1 gap-2 pr-1 max-h-48 overflow-auto"
                                    >
                                        {PLATFORMS.map((p) => (
                                            <label key={p.name} className="flex items-center gap-2 text-sm text-gray-200">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedPlatforms.includes(p.name)}
                                                    onChange={() => toggleSelection(p.name, selectedPlatforms, setSelectedPlatforms)}
                                                    className="accent-red-600"
                                                />
                                                <span className="flex items-center gap-2">
                                                    <span className={`w-3 h-3 rounded-sm ${p.color}`} />
                                                    {p.name}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* CATEGORIES SECTION */}
                            <div className="mb-3">
                                <div className="flex items-center justify-between mb-2">
                                    <p className="text-xs text-gray-300">Kategorie</p>

                                    {/* Icon-only toggle */}
                                    <button
                                        type="button"
                                        onClick={() => setExpandCategories((s) => !s)}
                                        className="p-1 text-gray-300 hover:text-white rounded focus:outline-none focus:ring-2 focus:ring-red-600"
                                        aria-expanded={expandCategories}
                                        aria-controls="categories-list"
                                        aria-label={expandCategories ? "Zwiń kategorie" : "Rozwiń kategorie"}
                                    >
                                        <ChevronDown
                                            className={`w-4 h-4 transition-transform ${expandCategories ? "rotate-180" : ""}`}
                                        />
                                    </button>
                                </div>

                                {expandCategories && (
                                    <div
                                        id="categories-list"
                                        className="grid grid-cols-1 gap-2 pr-1 max-h-48 overflow-auto"
                                    >
                                        {MOVIE_CATEGORIES.map((c) => (
                                            <label key={c} className="flex items-center gap-2 text-sm text-gray-200">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedCategories.includes(c)}
                                                    onChange={() => toggleSelection(c, selectedCategories, setSelectedCategories)}
                                                    className="accent-red-600"
                                                />
                                                {c}
                                            </label>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* DIRECTORS SECTION */}
                            <div className="mb-3">
                                <div className="flex items-center justify-between mb-2">
                                    <p className="text-xs text-gray-300">Reżyserzy</p>

                                    {/* Icon-only toggle */}
                                    <button
                                        type="button"
                                        onClick={() => setExpandDirectors((s) => !s)}
                                        className="p-1 text-gray-300 hover:text-white rounded focus:outline-none focus:ring-2 focus:ring-red-600"
                                        aria-expanded={expandDirectors}
                                        aria-controls="directors-list"
                                        aria-label={expandDirectors ? "Zwiń reżyserów" : "Rozwiń reżyserów"}
                                    >
                                        <ChevronDown
                                            className={`w-4 h-4 transition-transform ${expandDirectors ? "rotate-180" : ""}`}
                                        />
                                    </button>
                                </div>

                                {expandDirectors && (
                                    <div
                                        id="directors-list"
                                        className="grid grid-cols-1 gap-2 pr-1 max-h-48 overflow-auto"
                                    >
                                        {directors.length > 0 ? (
                                            directors.map((d) => (
                                                <label key={d} className="flex items-center gap-2 text-sm text-gray-200">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedDirectors.includes(d)}
                                                        onChange={() => toggleSelection(d, selectedDirectors, setSelectedDirectors)}
                                                        className="accent-red-600"
                                                    />
                                                    {d}
                                                </label>
                                            ))
                                        ) : (
                                            <p className="text-xs text-gray-400">Brak zdefiniowanych reżyserów</p>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center justify-between gap-2 mt-3">
                                <Button variant="ghost" onClick={clearFilters} className="text-gray-300 hover:bg-white/5">
                                    Wyczyść
                                </Button>
                                <div className="flex items-center gap-2">
                                    <Button variant="secondary" onClick={() => setShowFilters(false)}>
                                        Anuluj
                                    </Button>
                                    <Button onClick={applyFilters}>Zastosuj</Button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-2 md:gap-4">
                    {/* Filter button placed at the right side of the search bar */}
                    <Button
                        ref={buttonRef}
                        variant="ghost"
                        size="icon"
                        onClick={() => setShowFilters((s) => !s)}
                        className="text-gray-400 hover:text-white hover:bg-white/10 z-10"
                        title="Filtry"
                        aria-label="Filtry"
                        aria-haspopup="menu"
                        aria-expanded={showFilters}
                        aria-controls="filters-panel"
                    >
                        <SlidersHorizontal className="w-5 h-5" />
                    </Button>

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleFontSize}
                        className="text-gray-400 hover:text-white hover:bg-white/10"
                        title="Zmień wielkość czcionki"
                    >
                        <Type className="w-5 h-5" />
                    </Button>

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleTheme}
                        className="text-gray-400 hover:text-white hover:bg-white/10"
                        title={isDarkMode ? "Przełącz na tryb jasny" : "Przełącz na tryb ciemny"}
                    >
                        {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    </Button>
                </div>
            </div>
        </nav>
    );
}
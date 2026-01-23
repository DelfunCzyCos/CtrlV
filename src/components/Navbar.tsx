import { ArrowLeft, Sun, Moon, Type, SlidersHorizontal, ChevronDown, X } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState, useRef, useEffect } from "react";
import { PLATFORMS, categories as MOVIE_CATEGORIES, movies } from "../data/movies";
import { FavoriteButton } from "./FavoriteButton";

interface NavbarProps {
    onBack?: () => void;
    showBack?: boolean;
    onSearch: (query: string) => void;
    onFiltersChange?: (filters: { platforms: string[]; categories: string[]; directors: string[] }) => void;
    onSelectFavorite?: (id: string) => void;
    isDarkMode: boolean;
    setIsDarkMode: (v: boolean) => void;
}

export function Navbar({ onBack, showBack, onSearch, onFiltersChange, onSelectFavorite, isDarkMode, setIsDarkMode }: NavbarProps) {
    const [inputValue, setInputValue] = useState("");
    const [showFilters, setShowFilters] = useState(false);

    const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedDirectors, setSelectedDirectors] = useState<string[]>([]);

    const [expandPlatforms, setExpandPlatforms] = useState(false);
    const [expandCategories, setExpandCategories] = useState(false);
    const [expandDirectors, setExpandDirectors] = useState(false);

    const panelRef = useRef<HTMLDivElement | null>(null);
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const closeBtnRef = useRef<HTMLButtonElement | null>(null);

    const [isMobile, setIsMobile] = useState<boolean>(() => {
        if (typeof window === "undefined") return false;
        return window.innerWidth < 768;
    });

    useEffect(() => {
        const onResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

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

    useEffect(() => {
        if (showFilters && isMobile) {
            document.body.classList.add("overflow-hidden");
            setTimeout(() => closeBtnRef.current?.focus(), 0);
        } else {
            document.body.classList.remove("overflow-hidden");
        }
        return () => document.body.classList.remove("overflow-hidden");
    }, [showFilters, isMobile]);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
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
        if (onFiltersChange) onFiltersChange({ platforms: [], categories: [], directors: [] });
    };

    const applyFilters = () => {
        const filters = {
            platforms: selectedPlatforms,
            categories: selectedCategories,
            directors: selectedDirectors,
        };
        if (onFiltersChange) onFiltersChange(filters);
        setShowFilters(false);
        buttonRef.current?.focus();
    };

    const textColor = isDarkMode ? "text-white" : "text-black";
    const bgNavbar = isDarkMode ? "bg-black/90 border-white/10" : "bg-white border-gray-200";
    const bgInput = isDarkMode ? "bg-zinc-800 border-zinc-700 text-white placeholder:text-gray-400" : "bg-white border-gray-300 text-black placeholder:text-gray-500";

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 px-4 py-3 md:px-8 ${bgNavbar} border-b`}>
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
                <div className="flex items-center">
                    {showBack && (
                        <Button variant="ghost" size="icon" onClick={onBack} className={`hover:bg-white/10 mr-2 ${textColor}`}>
                            <ArrowLeft className="w-6 h-6" />
                        </Button>
                    )}

                    <div className="flex-shrink-0 mr-4">
                        <a
                            href="#"
                            className={`font-bold tracking-tighter text-2xl md:text-3xl ${isDarkMode ? "text-red-600" : "text-red-600"}`}
                            onClick={(e) => {
                                e.preventDefault();
                                if (onBack) onBack();
                                setInputValue("");
                                onSearch("");
                            }}
                        >
                            STREAM
                        </a>
                    </div>
                </div>

                <div className="flex-1 max-w-2xl relative flex items-center gap-2">
                    <div className="relative flex-1">
                        <Input
                            className={`w-full md:w-[720px] lg:w-[900px] rounded-lg h-12 md:h-14 text-base md:text-lg ${bgInput}`}
                            placeholder="Szukaj filmów, seriali, gatunków..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    onSearch(inputValue);
                                }
                            }}
                        />

                        {showFilters && !isMobile && (
                            <div
                                ref={panelRef}
                                id="filters-panel"
                                role="menu"
                                aria-labelledby="filters-toggle"
                                className={`absolute top-full left-0 mt-2 w-full md:w-96 rounded-lg p-4 shadow-lg z-50 ${
                                    isDarkMode ? "bg-zinc-900 border border-zinc-700" : "bg-white border border-gray-200"
                                }`}
                            >
                                <h3 className={`${textColor} text-sm font-semibold mb-3`}>Filtruj wyniki</h3>

                                <div className="mb-3">
                                    <div className="flex items-center justify-between mb-2">
                                        <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"} text-xs`}>Platformy</p>
                                        <button
                                            type="button"
                                            onClick={() => setExpandPlatforms((s) => !s)}
                                            className={`p-1 rounded focus:outline-none focus:ring-2 focus:ring-red-600 ${
                                                isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-black"
                                            }`}
                                        >
                                            <ChevronDown className={`w-4 h-4 transition-transform ${expandPlatforms ? "rotate-180" : ""}`} />
                                        </button>
                                    </div>
                                    {expandPlatforms && (
                                        <div className="grid grid-cols-1 gap-2 pr-1 max-h-48 overflow-auto">
                                            {PLATFORMS.map((p) => (
                                                <label key={p.name} className={`flex items-center gap-2 text-sm cursor-pointer ${isDarkMode ? "text-gray-200" : "text-gray-800"}`}>
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedPlatforms.includes(p.name)}
                                                        onChange={() => toggleSelection(p.name, selectedPlatforms, setSelectedPlatforms)}
                                                        className="accent-red-600 w-4 h-4"
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

                                <div className="mb-3">
                                    <div className="flex items-center justify-between mb-2">
                                        <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"} text-xs`}>Kategorie</p>
                                        <button
                                            type="button"
                                            onClick={() => setExpandCategories((s) => !s)}
                                            className={`p-1 rounded focus:outline-none focus:ring-2 focus:ring-red-600 ${
                                                isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-black"
                                            }`}
                                        >
                                            <ChevronDown className={`w-4 h-4 transition-transform ${expandCategories ? "rotate-180" : ""}`} />
                                        </button>
                                    </div>
                                    {expandCategories && (
                                        <div className="grid grid-cols-1 gap-2 pr-1 max-h-48 overflow-auto">
                                            {MOVIE_CATEGORIES.map((c) => (
                                                <label key={c} className={`flex items-center gap-2 text-sm cursor-pointer ${isDarkMode ? "text-gray-200" : "text-gray-800"}`}>
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedCategories.includes(c)}
                                                        onChange={() => toggleSelection(c, selectedCategories, setSelectedCategories)}
                                                        className="accent-red-600 w-4 h-4"
                                                    />
                                                    {c}
                                                </label>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div className="mb-3">
                                    <div className="flex items-center justify-between mb-2">
                                        <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"} text-xs`}>Reżyserzy</p>
                                        <button
                                            type="button"
                                            onClick={() => setExpandDirectors((s) => !s)}
                                            className={`p-1 rounded focus:outline-none focus:ring-2 focus:ring-red-600 ${
                                                isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-black"
                                            }`}
                                        >
                                            <ChevronDown className={`w-4 h-4 transition-transform ${expandDirectors ? "rotate-180" : ""}`} />
                                        </button>
                                    </div>
                                    {expandDirectors && (
                                        <div className="grid grid-cols-1 gap-2 pr-1 max-h-48 overflow-auto">
                                            {directors.length > 0 ? (
                                                directors.map((d) => (
                                                    <label key={d} className={`flex items-center gap-2 text-sm cursor-pointer ${isDarkMode ? "text-gray-200" : "text-gray-800"}`}>
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedDirectors.includes(d)}
                                                            onChange={() => toggleSelection(d, selectedDirectors, setSelectedDirectors)}
                                                            className="accent-red-600 w-4 h-4"
                                                        />
                                                        {d}
                                                    </label>
                                                ))
                                            ) : (
                                                <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"} text-xs`}>Brak zdefiniowanych reżyserów</p>
                                            )}
                                        </div>
                                    )}
                                </div>

                                <div className="flex items-center justify-between gap-2 mt-3">
                                    <Button
                                        variant="ghost"
                                        onClick={clearFilters}
                                        className={`${isDarkMode ? "text-gray-300 hover:bg-white/5" : "text-gray-600 hover:bg-black/5"} h-8 px-3 text-xs`}
                                    >
                                        Wyczyść
                                    </Button>
                                    <div className="flex items-center gap-2">
                                        <Button variant="secondary" onClick={() => setShowFilters(false)} className="h-8 px-3 text-xs">
                                            Anuluj
                                        </Button>
                                        <Button onClick={applyFilters} className="bg-red-600 hover:bg-red-700 h-8 px-3 text-xs">
                                            Zastosuj
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <Button
                        onClick={() => onSearch(inputValue)}
                        className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 h-10 md:h-12"
                    >
                        Szukaj
                    </Button>

                    <button
                        ref={buttonRef}
                        id="filters-toggle"
                        type="button"
                        onClick={() => setShowFilters((s) => !s)}
                        aria-expanded={showFilters}
                        aria-controls="filters-panel"
                        title="Filtry"
                        className={`ml-2 flex items-center justify-center w-10 h-10 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-red-600 ${
                            showFilters
                                ? "bg-red-600 text-white shadow"
                                : isDarkMode
                                    ? "bg-transparent text-gray-300 hover:bg-white/5"
                                    : "bg-transparent text-gray-600 hover:bg-black/5"
                        }`}
                    >
                        <SlidersHorizontal className="w-5 h-5" />
                    </button>

                    {showFilters && isMobile && (
                        <div
                            ref={panelRef}
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="filters-title"
                            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end"
                        >
                            <div className={`w-full h-[85%] rounded-t-xl p-4 overflow-auto ${
                                isDarkMode ? "bg-zinc-900 border-t border-zinc-700" : "bg-white border-t border-gray-200"
                            }`}>
                                <div className="flex items-center justify-between mb-3">
                                    <h3 id="filters-title" className={`${textColor} text-sm font-semibold`}>Filtruj wyniki</h3>
                                    <div className="flex items-center gap-2">
                                        <Button ref={closeBtnRef} variant="ghost" size="icon" onClick={() => setShowFilters(false)} className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                                            <X className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>

                                {/* reszta panelu mobile... (bez zmian) */}
                                {/* ... */}
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-2 md:gap-4">
                    <FavoriteButton onSelect={(id) => onSelectFavorite?.(id)} />

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleFontSize}
                        className={`${isDarkMode ? "text-gray-400 hover:text-white hover:bg-white/10" : "text-gray-600 hover:text-black hover:bg-black/5"}`}
                        title="Zmień wielkość czcionki"
                    >
                        <Type className="w-5 h-5" />
                    </Button>

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleTheme}
                        className={`${isDarkMode ? "text-gray-400 hover:text-white hover:bg-white/10" : "text-gray-600 hover:text-black hover:bg-black/5"}`}
                        title={isDarkMode ? "Przełącz na tryb jasny" : "Przełącz na tryb ciemny"}
                    >
                        {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    </Button>
                </div>
            </div>
        </nav>
    );
}

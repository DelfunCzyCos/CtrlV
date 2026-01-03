import { Search, ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface NavbarProps {
    onBack?: () => void;
    showBack?: boolean;
}

export function Navbar({ onBack, showBack }: NavbarProps) {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 border-b border-white/10 px-4 py-3 md:px-8">
            <div className="max-w-7xl mx-auto flex items-center gap-4">
                {showBack && (
                    <Button variant="ghost" size="icon" onClick={onBack} className="text-white hover:bg-white/10 mr-2">
                        <ArrowLeft className="w-6 h-6" />
                    </Button>
                )}

                <div className="flex-shrink-0 mr-4">
                    <a href="#" className="text-red-600 font-bold tracking-tighter text-2xl md:text-3xl" onClick={(e) => {
                        e.preventDefault();
                        if(onBack) onBack();
                    }}>STREAM</a>
                </div>

                <div className="flex-1 max-w-2xl relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                        className="w-full pl-10 bg-zinc-800 border-zinc-700 text-white placeholder:text-gray-400 focus-visible:ring-red-600 rounded-lg h-10 md:h-12 text-base"
                        placeholder="Szukaj filmów, seriali, gatunków..."
                    />
                </div>
            </div>
        </nav>
    );
}
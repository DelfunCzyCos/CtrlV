import { useState } from "react";
import { Movie } from "../data/movies";
import { Eye, MonitorPlay, Heart, BookmarkPlus, Share2, Link as LinkIcon, Check, Send, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";

interface MovieDetailProps {
  movie: Movie;
}

export function MovieDetail({ movie }: MovieDetailProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [copied, setCopied] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const episodes = [
    {
      id: 4,
      title: "Film",
      code: "Cz.1",
      description: "Część 1"
    }
  ];

  const toggleEpisode = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: movie.title,
          text: `Zobacz film ${movie.title} na platformie STREAM!`,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Błąd udostępniania:", err);
      }
    } else {
      handleCopyLink();
    }
  };

  const handleSubmitReview = () => {
    console.log("Wysłano recenzję:", { reviewText });
    alert("Dziękujemy za dodanie recenzji!");
    setReviewText("");
  };

  return (
      <div className="pt-24 px-4 md:px-12 max-w-7xl mx-auto pb-20 text-white animate-in fade-in duration-500">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <div className="lg:col-span-2 space-y-8">
            <div className="aspect-video w-full bg-black rounded-xl overflow-hidden shadow-2xl border border-zinc-800">
              <iframe
                  width="100%"
                  height="100%"
                  src={movie.trailerUrl + "?autoplay=1&mute=1"}
                  title="Movie Trailer"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
              ></iframe>
            </div>

            <div className="space-y-4">
              <h1 className="text-3xl font-bold md:text-6xl font-black uppercase tracking-tighter">{movie.title}</h1>

              <div className="flex flex-wrap gap-3 text-sm font-medium text-gray-300 border-b border-zinc-800 pb-4">
                <span className="bg-zinc-800 px-3 py-1 rounded-full text-white">{movie.year}</span>
                <span className="bg-zinc-800 px-3 py-1 rounded-full text-white">{movie.duration}</span>
                <span className="bg-zinc-800 px-3 py-1 rounded-full text-white">{movie.category}</span>
              </div>

              <div className="space-y-3 py-4">
                {episodes.map((ep) => (
                    <div key={ep.id} className="overflow-hidden bg-[#0a0f1d] border border-zinc-800/50 rounded-lg">
                      <div
                          onClick={() => toggleEpisode(ep.id)}
                          className="flex items-center justify-between p-4 cursor-pointer hover:bg-[#111827] transition-colors group"
                      >
                        <div className="text-sky-400 font-medium md:text-lg">
                          {ep.code} - {ep.title}
                        </div>
                        <div className={`transition-transform duration-300 ${expandedId === ep.id ? "rotate-180" : ""}`}>
                          <ChevronDown className="w-6 h-6 text-zinc-500 group-hover:text-white" />
                        </div>
                      </div>

                      {expandedId === ep.id && (
                          <div className="px-4 pb-4 animate-in slide-in-from-top-2 duration-300 space-y-4">
                            <p className="text-zinc-400 text-sm md:text-base leading-relaxed border-t border-zinc-800 pt-3">
                              {ep.description}
                            </p>

                            <div className="space-y-2 pt-2">
                              <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">Oglądaj odcinek na:</span>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {movie.platforms.map((platform) => (
                                    <a
                                        key={platform.name}
                                        href={platform.url}
                                        className={`flex items-center justify-between p-3 rounded-lg transition-transform hover:scale-[1.02] ${platform.color} shadow-md group/btn`}
                                    >
                                      <span className="font-bold text-sm md:text-base">{platform.name}</span>
                                      <span className="bg-white/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase group-hover/btn:bg-white/30">Oglądaj</span>
                                    </a>
                                ))}
                              </div>
                            </div>
                          </div>
                      )}
                    </div>
                ))}
              </div>

              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold pt-4 text-white uppercase tracking-tight">Opis fabuły</h2>
                <p className="text-xl text-gray-300 leading-relaxed">{movie.description}</p>
              </div>
            </div>

            <div className="mt-24 pt-12 border-t border-zinc-800 space-y-6">
              <h2 className="text-2xl font-bold text-white">Dodaj recenzję</h2>
              <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Napisz co sądzisz o tym filmie..."
                  className="w-full h-32 bg-zinc-800/50 border border-zinc-700 rounded-xl p-4 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all resize-none"
              />
              <div className="flex justify-end">
                <Button onClick={handleSubmitReview} disabled={!reviewText} className="gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-6 rounded-xl font-bold transition-all disabled:opacity-50 disabled:bg-zinc-800">
                  <Send className="w-5 h-5" /> Wyślij recenzję
                </Button>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="relative aspect-[2/3] w-full max-w-sm mx-auto lg:max-w-none rounded-xl overflow-hidden shadow-2xl border border-zinc-800">
              <img src={movie.imageUrl} alt={movie.title} className="w-full h-full object-cover" />
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setIsLiked(!isLiked)} className={`flex-1 gap-2 border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 transition-colors ${isLiked ? 'text-red-500 border-red-500/50' : 'text-white'}`}>
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} /> {isLiked ? 'Polubiono' : 'Lubię to'}
              </Button>
              <Button variant="outline" onClick={() => setIsFavorite(!isFavorite)} className={`flex-1 gap-2 border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 transition-colors ${isFavorite ? 'text-yellow-500 border-yellow-500/50' : 'text-white'}`}>
                <BookmarkPlus className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} /> Ulubione
              </Button>
            </div>

            <div className="bg-zinc-900/50 p-4 rounded-xl border border-zinc-800 flex items-center justify-center gap-3">
              <Eye className="w-5 h-5 text-blue-400" /> <span className="font-semibold text-lg">{movie.views.toLocaleString()}</span> <span className="text-gray-400 text-sm">osób obejrzało</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" onClick={handleShare} className="gap-2 border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 text-zinc-400 hover:text-white">
                <Share2 className="w-4 h-4" /> Udostępnij
              </Button>
              <Button variant="outline" onClick={handleCopyLink} className={`gap-2 border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 transition-all ${copied ? 'text-green-500 border-green-500/50' : 'text-zinc-400 hover:text-white'}`}>
                {copied ? <Check className="w-4 h-4" /> : <LinkIcon className="w-4 h-4" />} {copied ? 'Skopiowano' : 'Kopiuj link'}
              </Button>
            </div>

            <div className="space-y-4 pt-6 ">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <MonitorPlay className="w-5 h-5 text-red-500" /> Gdzie obejrzeć
              </h2>
              <div className="space-y-3">
                {movie.platforms.map((platform) => (
                    <a key={platform.name} href={platform.url} className={`flex items-center justify-between p-4 rounded-xl transition-transform hover:scale-[1.03] ${platform.color} shadow-lg cursor-pointer group`}>
                      <span className="font-bold text-lg">{platform.name}</span> <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-medium group-hover:bg-white/30">Oglądaj</span>
                    </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
import { PLATFORMS } from "../data/movies";

export function StreamingApps() {
  return (
    <div className="px-6 md:px-12 py-8 pt-28">
      <h2 className="text-2xl font-bold text-white mb-6">Aplikacje Streamingowe</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {PLATFORMS.map((platform) => (
          <div 
            key={platform.name}
            className={`${platform.color} h-32 rounded-xl flex items-center justify-center cursor-pointer hover:scale-105 transition-transform shadow-lg relative overflow-hidden group`}
          >
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
            <h3 className="text-2xl font-bold text-white drop-shadow-md z-10">{platform.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

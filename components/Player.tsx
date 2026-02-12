import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Wifi, AlertTriangle, Server, MonitorPlay, Layers, Loader2, ChevronDown } from 'lucide-react';
import { Movie, Episode } from '../types';
import { fetchShowEpisodes } from '../services/gemini';

interface PlayerProps {
  movie: Movie | null;
  onClose: () => void;
}

// Custom Glassy Bouncy Dropdown Component
interface GlassDropdownProps {
  options: any[];
  value: any;
  onChange: (val: any) => void;
  labelFn: (item: any) => React.ReactNode;
  triggerLabel: React.ReactNode;
  placeholder?: string;
  disabled?: boolean;
}

const GlassDropdown: React.FC<GlassDropdownProps> = ({ 
  options, value, onChange, labelFn, triggerLabel, placeholder = 'Select', disabled = false 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (val: any) => {
    onChange(val);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 rounded-full text-[10px] md:text-xs font-bold transition-all active:scale-95 group ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <span className="text-white truncate max-w-[150px]">{triggerLabel}</span>
        <ChevronDown size={14} className={`text-white/50 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Bouncy Dropdown Panel */}
      <div 
        className={`absolute top-full mt-2 left-0 w-56 md:w-64 max-h-64 overflow-y-auto custom-scrollbar bg-[#1a1a1a]/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-2 shadow-[0_10px_40px_rgba(0,0,0,0.5)] z-50 origin-top-left transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]
        ${isOpen ? 'opacity-100 scale-100 translate-y-0 visible' : 'opacity-0 scale-50 -translate-y-4 invisible pointer-events-none'}`}
      >
        {options.map((opt) => (
          <div 
            key={opt.value || opt} 
            onClick={() => handleSelect(opt.value || opt)}
            className={`px-3 py-2 rounded-xl text-xs font-medium cursor-pointer transition-all duration-200 mb-1 last:mb-0
            ${value === (opt.value || opt) 
              ? 'bg-white text-black shadow-lg translate-x-1' 
              : 'text-gray-400 hover:bg-white/10 hover:text-white hover:translate-x-1'}`}
          >
            {labelFn(opt)}
          </div>
        ))}
        {options.length === 0 && (
          <div className="p-3 text-center text-gray-500 text-xs">No options</div>
        )}
      </div>
    </div>
  );
};

const Player: React.FC<PlayerProps> = ({ movie, onClose }) => {
  const [currentServer, setCurrentServer] = useState<number>(2); // Default to Server 2
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  
  const [season, setSeason] = useState(1);
  const [episode, setEpisode] = useState(1);
  
  const [episodeList, setEpisodeList] = useState<Episode[]>([]);
  const [isEpisodesLoading, setIsEpisodesLoading] = useState(false);

  if (!movie) return null;

  const saveProgress = (s: number, e: number) => {
      localStorage.setItem(`vodkaflix_progress_${movie.id}`, JSON.stringify({
          season: s,
          episode: e,
          lastWatched: Date.now()
      }));
  };

  useEffect(() => {
    // 1. Reset Server on movie change (Always start at 2 now)
    setCurrentServer(2);

    // 2. Load Saved Progress (Season/Episode) from LocalStorage
    let initialSeason = 1;
    let initialEpisode = 1;

    try {
        const savedData = localStorage.getItem(`vodkaflix_progress_${movie.id}`);
        if (savedData) {
            const parsed = JSON.parse(savedData);
            if (parsed.season) initialSeason = parsed.season;
            if (parsed.episode) initialEpisode = parsed.episode;
        }
    } catch (e) {
        console.warn("Could not load progress", e);
    }

    setSeason(initialSeason);
    setEpisode(initialEpisode);
    
    // Save immediately so it appears in "Continue Watching" even if they close instantly
    saveProgress(initialSeason, initialEpisode);
    
    if (movie.mediaType === 'tv') {
        loadEpisodes(initialSeason);
    }
  }, [movie.id]);

  const loadEpisodes = async (seasonNum: number) => {
      setIsEpisodesLoading(true);
      try {
          const episodes = await fetchShowEpisodes(movie.title, seasonNum);
          setEpisodeList(episodes);
          
          // Ensure the current episode actually exists in the new list, else reset to 1
          // But only if we aren't using the saved initial state which might be waiting for the list
          // We rely on the useEffect setter for the initial load.
          
      } catch (e) {
          console.error("Failed to load episodes", e);
          setEpisodeList(Array.from({length: 24}, (_, i) => ({ episode: i+1, title: `Episode ${i+1}` })));
      } finally {
          setIsEpisodesLoading(false);
      }
  };

  const getEmbedUrl = (server: number) => {
      const id = movie.id;
      const type = movie.mediaType === 'movie' ? 'movie' : 'tv';
      
      switch(server) {
          case 1: 
              // VidLink - Best for TV
              if (type === 'tv') return `https://vidlink.pro/tv/${id}/${season}/${episode}`;
              return `https://vidlink.pro/movie/${id}`;
          case 2: 
              // VidSrc CC - Very reliable (DEFAULT)
              if (type === 'tv') return `https://vidsrc.cc/v2/embed/tv/${id}/${season}/${episode}`;
              return `https://vidsrc.cc/v2/embed/movie/${id}`;
          case 3: 
              // VidSrc VIP
              if (type === 'tv') return `https://vidsrc.vip/embed/tv/${id}/${season}/${episode}`;
              return `https://vidsrc.vip/embed/movie/${id}`;
          case 4: 
              // Embed.su
              if (type === 'tv') return `https://embed.su/embed/tv/${id}/${season}/${episode}`;
              return `https://embed.su/embed/movie/${id}`;
          case 5:
              // VidSrc XYZ - Backup
              if (type === 'tv') return `https://vidsrc.xyz/embed/tv/${id}/${season}/${episode}`;
              return `https://vidsrc.xyz/embed/movie/${id}`;
          case 6:
              // VidSrc Net - Extra Backup
              if (type === 'tv') return `https://vidsrc.net/embed/tv/${id}/${season}/${episode}`;
              return `https://vidsrc.net/embed/movie/${id}`;
          default: 
              return `https://vidsrc.cc/v2/embed/movie/${id}`;
      }
  };

  const handleServerSwitch = (serverNum: number) => {
      if (serverNum === currentServer) return;
      setCurrentServer(serverNum);
      setIsLoading(true);
      setHasError(false);
  }

  const handleSeasonChange = (val: number) => {
      const newSeason = val;
      const newEpisode = 1; // Default to ep 1 on season switch usually
      
      setSeason(newSeason);
      setEpisode(newEpisode);
      saveProgress(newSeason, newEpisode);
      
      setIsLoading(true);
      loadEpisodes(newSeason);
  }

  const handleEpisodeChange = (val: number) => {
      setEpisode(val);
      saveProgress(season, val);
      setIsLoading(true);
  }

  const totalSeasons = movie.totalSeasons || 1; 
  const seasonOptions = Array.from({ length: totalSeasons }, (_, i) => i + 1);
  
  // Helper to find current episode title
  const currentEpisodeTitle = episodeList.find(e => e.episode === episode)?.title || `Episode ${episode}`;

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col font-sans">
      
      {/* Floating Sleek Capsule Header */}
      <div className="absolute top-4 left-0 w-full z-50 flex justify-center pointer-events-none">
          <div className="pointer-events-auto flex items-center justify-between w-auto max-w-5xl bg-black/60 backdrop-blur-xl rounded-full px-3 py-2 border border-white/10 shadow-2xl gap-4 transition-all animate-[scaleIn_0.4s_ease-out]">
              
              <button 
                onClick={onClose} 
                className="group flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-all active:scale-95 flex-shrink-0"
              >
                  <ArrowLeft size={18} className="text-white group-hover:-translate-x-0.5 transition-transform" />
              </button>

              <div className="hidden md:flex flex-col overflow-hidden max-w-[200px] text-center">
                  <h2 className="text-white font-bold text-sm truncate px-2">{movie.title}</h2>
                  <span className="text-[10px] text-gray-400 flex items-center justify-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_5px_rgba(74,222,128,0.5)]"></span>
                      SRV {currentServer}
                  </span>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-3">
                {movie.mediaType === 'tv' && (
                    <div className="flex items-center gap-2">
                        {/* Season Dropdown */}
                        <GlassDropdown 
                            options={seasonOptions}
                            value={season}
                            onChange={handleSeasonChange}
                            labelFn={(s) => `Season ${s}`}
                            triggerLabel={`S${season}`}
                        />
                        
                        {/* Episode Dropdown */}
                        <GlassDropdown 
                            options={episodeList}
                            value={episode}
                            onChange={(val) => handleEpisodeChange(val.episode || val)} // handle if obj passed
                            disabled={isEpisodesLoading}
                            triggerLabel={isEpisodesLoading ? <Loader2 size={12} className="animate-spin"/> : `E${episode}: ${currentEpisodeTitle}`}
                            labelFn={(e: Episode) => (
                                <div className="flex flex-col">
                                    <span className="font-bold">Episode {e.episode}</span>
                                    <span className="opacity-70 text-[10px] truncate">{e.title}</span>
                                </div>
                            )}
                        />
                    </div>
                )}

                {/* Server Pills */}
                <div className="hidden sm:flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/5">
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                        <button
                            key={num}
                            onClick={() => handleServerSwitch(num)}
                            className={`w-7 h-7 rounded-full text-[10px] font-bold transition-all duration-300 flex items-center justify-center
                            ${currentServer === num 
                                ? 'bg-white text-black shadow-lg scale-105' 
                                : 'text-gray-400 hover:text-white hover:bg-white/10'}`}
                        >
                            {num}
                        </button>
                    ))}
                </div>
              </div>
          </div>
      </div>
      
      {/* Mobile Title (Since header title is hidden on mobile) */}
      <div className="md:hidden absolute top-20 left-0 w-full z-40 flex justify-center pointer-events-none">
           <div className="pointer-events-auto px-4 py-1 rounded-full bg-black/40 backdrop-blur-sm border border-white/5 text-white/80 text-xs font-medium">
               {movie.title} • S{season}:E{episode}
           </div>
      </div>

      <div className="flex-1 relative w-full h-full bg-[#000]">
         {/* Loading State */}
         {isLoading && (
             <div className="absolute inset-0 flex flex-col items-center justify-center z-0 bg-[#000]">
                 <div className="relative mb-8">
                    <div className="w-16 h-16 border-4 border-red-600/10 border-t-red-600 rounded-full animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <MonitorPlay size={20} className="text-red-600" />
                    </div>
                 </div>
                 <p className="text-white/60 text-xs font-medium tracking-[0.2em] uppercase animate-pulse">Connecting</p>
             </div>
         )}

         {/* Error State */}
         {hasError && (
             <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-[#000] text-white">
                 <AlertTriangle size={48} className="text-red-500 mb-4 opacity-80" />
                 <h3 className="text-xl font-bold mb-2">Signal Lost</h3>
                 <button 
                    onClick={() => handleServerSwitch(currentServer === 6 ? 1 : currentServer + 1)}
                    className="px-6 py-2 bg-white text-black rounded-full text-sm font-bold hover:bg-gray-200 transition-all mt-4"
                 >
                     Switch Server
                 </button>
             </div>
         )}

         <iframe 
            key={`${currentServer}-${season}-${episode}`}
            src={getEmbedUrl(currentServer)} 
            className={`w-full h-full border-none relative z-10 transition-all duration-1000 ${isLoading ? 'opacity-0 scale-95 blur-sm' : 'opacity-100 scale-100 blur-0'}`}
            title="Video Player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            referrerPolicy="origin"
            // Liberal sandbox permissions to prevent 'Sandbox Not Allowed' errors from providers
            sandbox="allow-forms allow-scripts allow-same-origin allow-top-navigation allow-presentation allow-popups allow-popups-to-escape-sandbox"
            onLoad={() => setIsLoading(false)}
            onError={() => setHasError(true)}
         />
      </div>
    </div>
  );
};

export default Player;
import React, { useState, useEffect } from 'react';
import { Play, Info, RefreshCw } from 'lucide-react';
import { Movie } from '../types';

interface HeroProps {
  movie: Movie | null;
  onPlay: (movie: Movie) => void;
  onMoreInfo: (movie: Movie) => void;
  onRefresh: () => void;
}

const Hero: React.FC<HeroProps> = ({ movie, onPlay, onMoreInfo, onRefresh }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    setIsImageLoaded(false);
  }, [movie?.id]);

  if (!movie) return (
    <div className="h-[95vh] w-full bg-[#050505] relative z-0 flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin opacity-50"></div>
    </div>
  );

  return (
    <div key={movie.id} className="relative h-[95vh] w-full text-white overflow-hidden bg-[#050505]">

      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#121212] via-[#050505] to-black" />

        <img
          src={movie.backdropUrl}
          alt={movie.title}
          loading="eager"
          onLoad={() => setIsImageLoaded(true)}
          onError={() => setIsImageLoaded(true)}
          className={`w-full h-full object-cover scale-105 animate-[slowZoom_40s_infinite_alternate] origin-center transition-opacity duration-1000 ease-in-out ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
        />

        {/* Fluid Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/40 to-transparent mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
        <div className="absolute bottom-0 w-full h-64 bg-gradient-to-t from-[#050505] to-transparent" />
      </div>

      {/* Content Layer - Lifted position to prevent overlap */}
      <div className="absolute bottom-[35%] md:bottom-[25%] left-6 md:left-16 max-w-3xl space-y-6 z-10 pr-4 animate-[scaleIn_0.6s_cubic-bezier(0.16,1,0.3,1)]">

        <div className="flex items-center gap-3 opacity-0 animate-[fadeIn_0.5s_0.2s_forwards]">
          <span className="px-3 py-1 text-xs font-bold tracking-widest uppercase liquid-glass-light rounded-full text-red-500 shadow-[0_0_15px_rgba(220,38,38,0.3)]">
            Featured
          </span>
          <span className="px-3 py-1 text-xs font-bold tracking-widest uppercase liquid-glass-light rounded-full text-gray-300">
            {movie.mediaType === 'tv' ? 'Series' : 'Movie'}
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black drop-shadow-[0_4px_30px_rgba(0,0,0,0.8)] leading-[0.9] tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/60">
          {movie.title}
        </h1>

        <div className="flex items-center gap-4 text-sm font-medium drop-shadow-xl text-gray-300">
          <span className="text-green-400 font-bold">{movie.matchScore}% Match</span>
          <span className="w-1 h-1 rounded-full bg-white/30"></span>
          <span>{movie.year}</span>
          <span className="w-1 h-1 rounded-full bg-white/30"></span>
          <span className="border border-white/20 px-1.5 rounded text-xs">{movie.rating}</span>
          <span className="w-1 h-1 rounded-full bg-white/30"></span>
          <span>{movie.duration}</span>
        </div>

        <p className="text-lg md:text-xl drop-shadow-lg text-gray-200 font-light max-w-2xl leading-relaxed line-clamp-3">
          {movie.description}
        </p>

        <div className="flex flex-wrap items-center gap-4 pt-6">
          <button
            onClick={() => onPlay(movie)}
            className="liquid-hover relative flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full transition-all transform hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.3)] overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
            <Play className="fill-black relative z-10" size={20} />
            <span className="text-lg font-bold relative z-10">Play Now</span>
          </button>

          <button
            onClick={() => onMoreInfo(movie)}
            className="relative flex items-center gap-3 px-8 py-4 liquid-glass text-white rounded-full transition-all transform hover:scale-105 active:scale-95 hover:bg-white/20 group"
          >
            <Info size={24} className="group-hover:text-blue-200 transition-colors" />
            <span className="text-lg font-semibold">More Info</span>
          </button>

          <button
            onClick={onRefresh}
            className="flex items-center justify-center w-14 h-14 liquid-glass text-white/70 rounded-full hover:text-white hover:rotate-180 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:bg-white/10 active:scale-95"
          >
            <RefreshCw size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
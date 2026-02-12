import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, PlayCircle, X } from 'lucide-react';
import { Movie } from '../types';

interface RowProps {
  title: string;
  movies: Movie[];
  onMovieClick: (movie: Movie) => void;
  onRemove?: (movie: Movie) => void; // Optional prop for removing items
}

const Row: React.FC<RowProps> = ({ title, movies, onMovieClick, onRemove }) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const [isMoved, setIsMoved] = useState(false);

  const handleClick = (direction: 'left' | 'right') => {
    setIsMoved(true);
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo =
        direction === 'left'
          ? scrollLeft - clientWidth * 0.75
          : scrollLeft + clientWidth * 0.75;

      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = "https://placehold.co/500x750/1a1a1a/666666?text=No+Image&font=outfit";
  };

  if (!movies || movies.length === 0) return null;

  return (
    <div className="group relative z-30 my-10 md:my-14 pl-6 md:pl-16">
      <div className="mb-5 flex items-center gap-4 group/title cursor-pointer">
        <div className="w-1.5 h-8 bg-red-600 rounded-full shadow-[0_0_15px_rgba(220,38,38,0.8)] group-hover/title:scale-y-125 transition-transform duration-300"></div>
        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-wide drop-shadow-lg group-hover/title:text-red-500 transition-colors">
          {title}
        </h2>
      </div>

      <div className="relative group/row">
        <button
          className={`absolute top-0 bottom-0 left-0 z-40 m-auto h-full w-12 bg-gradient-to-r from-black/80 to-transparent flex items-center justify-center 
          opacity-0 group-hover/row:opacity-100 transition-all duration-300 hover:w-16 ${!isMoved && 'hidden'}`}
          onClick={() => handleClick('left')}
        >
          <ChevronLeft className="text-white drop-shadow-lg hover:scale-125 transition-transform" size={40} />
        </button>

        <div
          ref={rowRef}
          className="flex items-center gap-5 overflow-x-auto scrollbar-hide no-scrollbar scroll-smooth py-6 pr-16"
          style={{ perspective: '1000px' }}
        >
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="relative flex-none w-[180px] md:w-[240px] min-w-[180px] md:min-w-[240px] h-[270px] md:h-[360px] 
                         cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] 
                         hover:scale-105 hover:-translate-y-2 hover:z-50 group/card rounded-xl"
              onClick={() => onMovieClick(movie)}
            >
              {/* Main Card Container */}
              <div className="w-full h-full rounded-xl overflow-hidden relative shadow-lg border border-white/5 bg-[#121212]">
                <img
                  src={movie.imageUrl}
                  alt={movie.title}
                  onError={handleImageError}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                  loading="lazy"
                />

                {/* Liquid Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-[200%] group-hover/card:animate-[shimmer_1.5s_infinite] pointer-events-none z-20" />

                {/* Remove Button (Only if onRemove is provided) */}
                {onRemove && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemove(movie);
                    }}
                    className="absolute top-2 right-2 z-50 p-1.5 bg-black/60 hover:bg-red-600 rounded-full text-white/70 hover:text-white transition-all opacity-0 group-hover/card:opacity-100"
                    title="Remove from Continue Watching"
                  >
                    <X size={14} />
                  </button>
                )}

                {/* Glass Info Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover/card:opacity-100 transition-all duration-300 flex flex-col justify-end p-5">
                  <div className="transform translate-y-4 group-hover/card:translate-y-0 transition-transform duration-500 ease-out">
                    <h4 className="text-white font-bold text-lg leading-tight mb-2 drop-shadow-md line-clamp-2">{movie.title}</h4>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <span className="text-green-400 text-[10px] font-extrabold bg-green-900/30 px-2 py-0.5 rounded backdrop-blur-sm border border-green-500/20">{movie.matchScore}%</span>
                        <span className="text-white/80 text-[10px] font-bold border border-white/20 px-2 py-0.5 rounded backdrop-blur-sm">{movie.year}</span>
                      </div>
                      <PlayCircle className="text-white w-8 h-8 hover:scale-110 transition-transform drop-shadow-lg" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          className="absolute top-0 bottom-0 right-0 z-40 m-auto h-full w-12 bg-gradient-to-l from-black/80 to-transparent flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-all duration-300 hover:w-16"
          onClick={() => handleClick('right')}
        >
          <ChevronRight className="text-white drop-shadow-lg hover:scale-125 transition-transform" size={40} />
        </button>
      </div>
    </div>
  );
};

export default Row;
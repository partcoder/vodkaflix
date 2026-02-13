import React, { useState, useEffect } from 'react';
import { X, Play, Plus, ThumbsUp, Check } from 'lucide-react';
import { Movie } from '../types';

interface ModalProps {
    movie: Movie | null;
    isOpen: boolean;
    onClose: () => void;
    onPlay: (movie: Movie) => void;
    isInList?: boolean;
    isLiked?: boolean;
    onToggleList?: () => void;
    onToggleLike?: () => void;
}

const Modal: React.FC<ModalProps> = ({
    movie,
    isOpen,
    onClose,
    onPlay,
    isInList = false,
    isLiked = false,
    onToggleList,
    onToggleLike
}) => {
    const [imageSrc, setImageSrc] = useState<string>('');

    useEffect(() => {
        if (movie) {
            setImageSrc(movie.backdropUrl);
        }
    }, [movie]);

    if (!isOpen || !movie) return null;

    const handleBackdropError = () => {
        if (imageSrc !== movie.imageUrl) {
            setImageSrc(movie.imageUrl);
        } else {
            setImageSrc("https://placehold.co/1920x1080/121212/666666?text=Image+Unavailable&font=outfit");
        }
    };

    const handlePosterError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src = "https://placehold.co/500x750/1a1a1a/666666?text=No+Poster&font=outfit";
    };

    return (
        <div className="fixed inset-0 z-[60] overflow-y-auto custom-scrollbar" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            {/* Heavy Blur Backdrop */}
            <div
                className="fixed inset-0 bg-black/60 backdrop-blur-3xl transition-opacity animate-[fadeIn_0.4s_ease-out]"
                onClick={onClose}
            />

            <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-6">

                {/* iOS Glass Modal Container - Smaller Max Width */}
                <div
                    className="relative w-full max-w-4xl transform overflow-hidden rounded-[2rem] bg-[#0f0f0f] text-left shadow-[0_0_50px_rgba(0,0,0,0.5)] transition-all animate-[scaleIn_0.3s_cubic-bezier(0.2,0.8,0.2,1)] ring-1 ring-white/10 liquid-glass"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        onClick={onClose}
                        className="absolute right-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white/70 hover:text-white hover:bg-white/20 transition-all duration-300 hover:rotate-90 group"
                    >
                        <X size={22} />
                    </button>

                    {/* Banner Section - Fixed Height to prevent stretching */}
                    <div className="relative h-[250px] md:h-[400px] w-full bg-[#1a1a1a] overflow-hidden group">
                        <img
                            src={imageSrc}
                            alt={movie.title}
                            onError={handleBackdropError}
                            className="h-full w-full object-cover transition-transform duration-[20s] group-hover:scale-110"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent" />

                        <div className="absolute bottom-0 left-0 p-8 z-10 w-full md:w-3/4">
                            <h2 className="text-3xl md:text-5xl font-black text-white drop-shadow-2xl tracking-tighter mb-4 leading-[0.9]">
                                {movie.title}
                            </h2>

                            <div className="flex items-center gap-4 pt-2">
                                <button
                                    onClick={() => onPlay(movie)}
                                    className="flex items-center gap-2 rounded-full bg-white text-black px-6 py-2.5 font-bold hover:bg-gray-200 transition-all active:scale-95 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] text-sm md:text-base"
                                >
                                    <Play className="h-4 w-4 md:h-5 md:w-5 fill-current" />
                                    <span>Play</span>
                                </button>

                                <button
                                    onClick={onToggleList}
                                    className={`p-2.5 rounded-full border transition-all duration-300 hover:scale-110 active:scale-95 liquid-glass ${isInList ? 'bg-green-600 border-green-500 text-white shadow-[0_0_15px_rgba(22,163,74,0.4)]' : 'border-white/10 text-white hover:bg-white/20'}`}
                                >
                                    {isInList ? <Check size={18} /> : <Plus size={18} />}
                                </button>

                                <button
                                    onClick={onToggleLike}
                                    className={`p-2.5 rounded-full border transition-all duration-300 hover:scale-110 active:scale-95 liquid-glass ${isLiked ? 'bg-white text-red-600 border-white shadow-[0_0_15px_rgba(255,255,255,0.4)]' : 'border-white/10 text-white hover:bg-white/20'}`}
                                >
                                    <ThumbsUp size={18} className={isLiked ? "fill-current" : ""} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Info Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-6 md:p-8 bg-[#0f0f0f]">

                        {/* Poster */}
                        <div className="hidden md:block relative">
                            <img
                                src={movie.imageUrl}
                                alt={movie.title}
                                onError={handlePosterError}
                                className="w-full rounded-xl border border-white/10 shadow-2xl aspect-[2/3] object-cover"
                            />
                        </div>

                        {/* Main Details */}
                        <div className="space-y-4">
                            <div className="flex flex-wrap items-center gap-3 text-sm font-medium">
                                <span className="text-green-400 font-bold">{movie.matchScore}% Match</span>
                                <span className="text-gray-400">{movie.year}</span>
                                <span className="border border-white/20 rounded px-1.5 py-0.5 text-xs text-gray-300">{movie.rating}</span>
                                <span className="text-gray-400">{movie.duration}</span>
                                <span className="border border-white/20 rounded px-1.5 py-0.5 text-[10px] text-gray-400 uppercase tracking-widest">HD</span>
                            </div>

                            {/* Mobile Poster - floated */}
                            <div className="md:hidden float-left w-24 mr-4 mb-2">
                                <img
                                    src={movie.imageUrl}
                                    alt={movie.title}
                                    onError={handlePosterError}
                                    className="w-full rounded-lg border border-white/10 shadow-lg aspect-[2/3] object-cover"
                                />
                            </div>

                            <p className="text-gray-300 text-base leading-relaxed font-light">
                                {movie.description}
                            </p>

                            <div className="pt-4 clear-both border-t border-white/5 flex flex-col gap-2">
                                <div className="flex flex-wrap gap-2 items-center">
                                    <span className="text-gray-500 text-xs font-bold uppercase tracking-wider mr-2">Genres:</span>
                                    {movie.genre.map(g => (
                                        <span key={g} className="px-2 py-0.5 rounded-full bg-white/5 text-gray-300 text-xs border border-white/5">
                                            {g}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex gap-4">
                                    <div>
                                        <span className="text-gray-500 text-xs font-bold mr-2 uppercase tracking-wider">Audio:</span>
                                        <span className="text-gray-400 text-xs">English, Spanish</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500 text-xs font-bold mr-2 uppercase tracking-wider">Subtitles:</span>
                                        <span className="text-gray-400 text-xs">English, French</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
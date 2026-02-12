export interface Movie {
  id: string;
  imdbId?: string; // Made optional as we use TMDB ID mostly
  title: string;
  description: string;
  genre: string[];
  imageUrl: string;
  backdropUrl: string;
  matchScore: number;
  year: number;
  duration: string;
  rating: string;
  mediaType: 'movie' | 'tv';
  totalSeasons?: number; // Added for dropdown support
}

export interface Episode {
  episode: number;
  title: string;
}

export interface Category {
  title: string;
  movies: Movie[];
}

export enum ViewState {
  BROWSING,
  PLAYING,
}
import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Row from './components/Row';
import Modal from './components/Modal';
import Player from './components/Player';
import { fetchMoviesForCategory, searchMovies, fetchHeroMovie, getMoviesByIds } from './services/gemini';
import { Category, Movie, ViewState } from './types';
import { AlertCircle } from 'lucide-react';

// Updated categories to match the specific content requested
const CATEGORIES = [
  "Trending Now",
  "Marvel Universe",
  "DC Universe",
  "CW TV Shows",
  "TV Hits",
  "Family & Comedy",
  "Action Hits"
];

const App: React.FC = () => {
  const [allCategories, setAllCategories] = useState<Category[]>([]); // Store master list
  const [categories, setCategories] = useState<Category[]>([]); // Store displayed list
  
  // User Personalization State
  const [myList, setMyList] = useState<Movie[]>([]);
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());
  
  const [heroMovie, setHeroMovie] = useState<Movie | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [viewState, setViewState] = useState<ViewState>(ViewState.BROWSING);
  const [isAppLoading, setIsAppLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');

  // Helper to load "Continue Watching"
  const loadContinueWatching = async (): Promise<Category | null> => {
      try {
          const progressKeys = Object.keys(localStorage).filter(k => k.startsWith('vodkaflix_progress_'));
          if (progressKeys.length === 0) return null;

          const ids = progressKeys.map(k => k.replace('vodkaflix_progress_', ''));
          const movies = await getMoviesByIds(ids);

          if (movies.length > 0) {
              // Sort by last watched time
              movies.sort((a, b) => {
                  const aData = JSON.parse(localStorage.getItem(`vodkaflix_progress_${a.id}`) || '{}');
                  const bData = JSON.parse(localStorage.getItem(`vodkaflix_progress_${b.id}`) || '{}');
                  return (bData.lastWatched || 0) - (aData.lastWatched || 0);
              });
              return { title: "Continue Watching", movies };
          }
      } catch (e) {
          console.warn("Failed to load continue watching", e);
      }
      return null;
  };

  useEffect(() => {
    const loadContent = async () => {
      try {
        // Load content strictly from internal DB
        
        // Initial Load (Home context)
        const initialHero = await fetchHeroMovie('general'); 
        setHeroMovie(initialHero);
        
        // Fetch categories in parallel
        const promises = CATEGORIES.map(async (cat) => {
            const movies = await fetchMoviesForCategory(cat);
            return { title: cat, movies };
        });
        
        const results = await Promise.all(promises);
        let validCategories = results.filter(c => c.movies.length > 0);
        
        // Load Continue Watching
        const continueWatchingCat = await loadContinueWatching();
        if (continueWatchingCat) {
            validCategories = [continueWatchingCat, ...validCategories];
        }

        setAllCategories(validCategories);
        setCategories(validCategories);
      } catch (e) {
        console.error("Failed to load content", e);
      } finally {
        setIsAppLoading(false);
      }
    };

    loadContent();
  }, []);

  const handleNavigate = async (tab: string) => {
      setActiveTab(tab);
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // Reset search if navigating via tabs
      if (categories.length === 1 && categories[0].title === "Search Results") {
          // handled by logic below naturally
      }

      if (tab === 'Home') {
          // Re-load categories to refresh Continue Watching
          let displayedCats = [...allCategories];
          
          // Re-check Continue Watching specifically to ensure it's up to date
          // Filter out old CW first to avoid duplicates or stale data
          displayedCats = displayedCats.filter(c => c.title !== "Continue Watching");
          
          const cw = await loadContinueWatching();
          if (cw) {
              displayedCats.unshift(cw);
          }
          
          setCategories(displayedCats);
          // Update master list reference too if needed, but safe to just set display here
          
          const hero = await fetchHeroMovie('general');
          setHeroMovie(hero);
      } else if (tab === 'TV Shows') {
          const filtered = allCategories.filter(c => c.title !== "Continue Watching").map(c => ({
              ...c,
              movies: c.movies.filter(m => m.mediaType === 'tv')
          })).filter(c => c.movies.length > 0);
          setCategories(filtered);
          
          const hero = await fetchHeroMovie('tv'); // The 100
          setHeroMovie(hero);

      } else if (tab === 'Movies') {
          const filtered = allCategories.filter(c => c.title !== "Continue Watching").map(c => ({
              ...c,
              movies: c.movies.filter(m => m.mediaType === 'movie')
          })).filter(c => c.movies.length > 0);
          setCategories(filtered);

          const hero = await fetchHeroMovie('general');
          setHeroMovie(hero);

      } else if (tab === 'My List') {
          if (myList.length > 0) {
              setCategories([{ title: "My List", movies: myList }]);
          } else {
              setCategories([]);
          }
      }
  };

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handlePlay = (movie: Movie) => {
      setSelectedMovie(movie); 
      setViewState(ViewState.PLAYING);
  };

  const closePlayer = async () => {
      setViewState(ViewState.BROWSING);
      
      // Refresh Continue Watching when closing player
      if (activeTab === 'Home') {
          const cw = await loadContinueWatching();
          if (cw) {
              setCategories(prev => {
                  const withoutCW = prev.filter(c => c.title !== "Continue Watching");
                  return [cw, ...withoutCW];
              });
          }
      }
  };

  const handleSearch = async (query: string) => {
      if(!query.trim()) return;
      
      setIsSearching(true);
      setActiveTab('Home'); // Deselect tabs during search
      
      try {
        const results = await searchMovies(query);
        
        if (results && results.length > 0) {
            setCategories([{ title: "Search Results", movies: results }]);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
             setCategories([{ title: "No Results Found", movies: [] }]);
        }
      } catch(e) {
          console.error("Search failed", e);
      } finally {
        setIsSearching(false);
      }
  }

  const handleRefreshHero = async () => {
      let context: 'general' | 'tv' = 'general';
      if (activeTab === 'TV Shows') {
          context = 'tv';
      }
      const movie = await fetchHeroMovie(context);
      setHeroMovie(movie);
  };

  // --- List & Like Handlers ---

  const toggleMyList = (movie: Movie) => {
      const exists = myList.some(m => m.id === movie.id);
      let newList: Movie[];
      if (exists) {
          newList = myList.filter(m => m.id !== movie.id);
      } else {
          newList = [...myList, movie];
      }
      setMyList(newList);

      // If we are currently viewing "My List", update the view immediately
      if (activeTab === 'My List') {
           if (newList.length > 0) {
              setCategories([{ title: "My List", movies: newList }]);
          } else {
              setCategories([]);
          }
      }
  };

  const toggleLike = (movie: Movie) => {
      const newSet = new Set(likedIds);
      if (newSet.has(movie.id)) {
          newSet.delete(movie.id);
      } else {
          newSet.add(movie.id);
      }
      setLikedIds(newSet);
  };

  const handleRemoveFromContinueWatching = (movie: Movie) => {
      if (window.confirm(`Are you sure you want to remove "${movie.title}" from Continue Watching?`)) {
          localStorage.removeItem(`vodkaflix_progress_${movie.id}`);
          
          setCategories(prevCategories => {
              return prevCategories.map(cat => {
                  if (cat.title === "Continue Watching") {
                      return {
                          ...cat,
                          movies: cat.movies.filter(m => m.id !== movie.id)
                      };
                  }
                  return cat;
              }).filter(cat => cat.movies.length > 0); // Remove empty rows
          });
      }
  };

  if (viewState === ViewState.PLAYING) {
      return <Player movie={selectedMovie} onClose={closePlayer} />;
  }

  if (isAppLoading) {
      return (
        <div className="flex h-screen w-full items-center justify-center bg-[#050505] font-[Outfit]">
             <div className="relative flex flex-col items-center justify-center gap-6">
                 <div className="relative flex items-center justify-center">
                     <div className="absolute animate-ping inline-flex h-20 w-20 rounded-full bg-red-600 opacity-20"></div>
                     <div className="w-6 h-6 bg-red-600 rounded-full animate-pulse shadow-[0_0_40px_rgba(220,38,38,1)]"></div>
                 </div>
                 <span className="text-white/50 tracking-[0.2em] text-sm font-light uppercase animate-pulse">Loading Library...</span>
             </div>
        </div>
      );
  }

  return (
    <div className="relative min-h-screen bg-[#050505] pb-20 overflow-x-hidden font-[Outfit] text-white selection:bg-red-500/30 selection:text-white">
      <Navbar 
        onSearch={handleSearch} 
        isSearchingExternal={isSearching} 
        activeTab={activeTab}
        onNavigate={handleNavigate}
      />
      
      {activeTab === 'My List' && categories.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[80vh] text-center space-y-6 animate-[fadeIn_0.5s_ease-out]">
               <AlertCircle size={64} className="text-white/20" />
               <div>
                   <h2 className="text-3xl font-bold mb-2">Your List is Empty</h2>
                   <p className="text-white/50 max-w-md mx-auto">Add movies and shows to your list to keep track of what you want to watch.</p>
               </div>
               <button 
                onClick={() => handleNavigate('Home')}
                className="px-8 py-3 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition-colors"
               >
                   Browse Content
               </button>
          </div>
      ) : (
          <>
            <Hero 
                movie={heroMovie} 
                onPlay={handlePlay}
                onMoreInfo={handleMovieClick}
                onRefresh={handleRefreshHero}
            />
            
            {/* Shifted up to cover more hero space, now with smooth gradient fade */}
            <div className="relative z-20 -mt-20 md:-mt-32 pb-20 space-y-4 bg-gradient-to-b from-transparent via-[#050505] to-[#050505] pt-0 min-h-[500px]">
                {categories.length > 0 ? (
                     categories.map((category) => (
                        <Row 
                            key={category.title} 
                            title={category.title} 
                            movies={category.movies} 
                            onMovieClick={handleMovieClick}
                            onRemove={category.title === "Continue Watching" ? handleRemoveFromContinueWatching : undefined}
                        />
                     ))
                ) : (
                    <div className="flex items-center justify-center h-40 text-white/40">
                        <p>No content found in this category.</p>
                    </div>
                )}
            </div>
          </>
      )}

      <Modal 
        movie={selectedMovie} 
        isOpen={!!selectedMovie} 
        onClose={() => setSelectedMovie(null)} 
        onPlay={handlePlay}
        isInList={selectedMovie ? myList.some(m => m.id === selectedMovie.id) : false}
        isLiked={selectedMovie ? likedIds.has(selectedMovie.id) : false}
        onToggleList={selectedMovie ? () => toggleMyList(selectedMovie) : undefined}
        onToggleLike={selectedMovie ? () => toggleLike(selectedMovie) : undefined}
      />
    </div>
  );
};

export default App;
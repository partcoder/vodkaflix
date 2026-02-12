import React, { useState, useEffect, useRef } from 'react';
import { Search, Bell, User, Loader2, X, LayoutGrid, LogOut, Settings } from 'lucide-react';

interface NavbarProps {
    onSearch: (query: string) => void;
    isSearchingExternal?: boolean;
    activeTab: string;
    onNavigate: (tab: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch, isSearchingExternal = false, activeTab, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
        inputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Handle click outside to close search if empty, and close profile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        // Search Logic
        if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
            if (!searchQuery && isSearchOpen) {
                setIsSearchOpen(false);
            }
        }
        // Profile Logic
        if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
            setIsProfileOpen(false);
        }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [searchQuery, isSearchOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSearch(searchQuery);
  }

  const toggleSearch = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (isSearchOpen) {
          setSearchQuery('');
          onSearch('');
          setIsSearchOpen(false);
      } else {
          setIsSearchOpen(true);
      }
  }

  const navItems = ['Home', 'TV Shows', 'Movies', 'My List'];
  const showNavBlob = isScrolled && isSearchOpen;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4 pointer-events-none">
      <div 
        className={`pointer-events-auto flex items-center justify-between px-4 md:px-6 transition-all duration-700 cubic-bezier(0.25, 0.8, 0.25, 1) h-16 border border-transparent
        ${isScrolled 
            ? 'w-[95%] md:w-[85%] max-w-6xl bg-black/40 backdrop-blur-xl rounded-full shadow-2xl translate-y-2 border-white/10' 
            : 'w-full bg-transparent translate-y-0'
        }`}
      >
        {/* Logo Section - Hides on mobile when search is active to prevent overlap */}
        <div className={`flex items-center gap-6 md:gap-10 transition-all duration-300 flex-shrink-0 ${isSearchOpen ? 'hidden md:flex' : 'flex'}`}>
           <h1 
             onClick={() => onNavigate('Home')}
             className="text-red-600 text-2xl md:text-3xl font-black tracking-tighter cursor-pointer select-none drop-shadow-[0_0_25px_rgba(220,38,38,0.6)] hover:scale-105 transition-transform"
             style={{ textShadow: '0 2px 10px rgba(220, 38, 38, 0.4)' }}
           >
             VODKAFLIX
           </h1>
           
           {/* Desktop Nav - Collapses to blob on Glassy Search */}
           <div className="relative hidden md:flex items-center">
                {/* Full Menu List */}
               <ul className={`flex items-center gap-1 bg-white/5 rounded-full backdrop-blur-md border transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] origin-left overflow-hidden whitespace-nowrap
                    ${showNavBlob 
                        ? 'max-w-0 opacity-0 scale-95 p-0 border-transparent translate-x-[-10px]' 
                        : 'max-w-[400px] opacity-100 scale-100 p-1 border-white/5 translate-x-0'
                    }
               `}>
                 {navItems.map((item) => (
                     <li 
                        key={item} 
                        onClick={() => onNavigate(item)}
                        className="relative cursor-pointer z-10"
                     >
                         {activeTab === item && (
                             <div className="absolute inset-0 bg-white/10 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.1)] backdrop-blur-md border border-white/10 transition-all duration-500 ease-out" />
                         )}
                         <span className={`relative block px-4 py-1.5 text-xs md:text-sm font-medium transition-colors duration-300 ${activeTab === item ? 'text-white' : 'text-gray-400 hover:text-white'}`}>
                            {item}
                         </span>
                     </li>
                 ))}
               </ul>

               {/* Bubbly Blob (Collapsed Menu) */}
               <div className={`absolute left-0 top-0 bottom-0 m-auto flex items-center justify-center w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/10 transition-all duration-500 delay-75 ease-[cubic-bezier(0.34,1.56,0.64,1)]
                    ${showNavBlob ? 'opacity-100 scale-100 translate-x-0 rotate-0' : 'opacity-0 scale-0 -translate-x-8 -rotate-90 pointer-events-none'}
               `}>
                    <LayoutGrid size={18} className="text-white" />
               </div>
           </div>
        </div>

        {/* Actions Section - Expands to full width on mobile when search is active */}
        <div className={`flex items-center gap-3 transition-all duration-300 ${isSearchOpen ? 'w-full md:w-auto justify-center md:justify-end' : ''}`}>
            {/* Liquid Expanding Search */}
            <div 
                ref={searchContainerRef}
                className={`relative flex items-center transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] 
                ${isSearchOpen 
                    ? 'w-full md:w-72 bg-white/10 border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.1)]' 
                    : 'w-10 bg-transparent border-transparent hover:bg-white/5'
                } h-10 rounded-full border border-transparent overflow-hidden`}
            >
                <div 
                    className={`absolute left-0 top-0 w-10 h-10 flex items-center justify-center cursor-pointer rounded-full z-10 hover:bg-white/10 transition-colors ${isSearchOpen ? 'hover:bg-transparent' : ''}`}
                    onClick={toggleSearch}
                >
                    {isSearchingExternal ? (
                        <Loader2 size={16} className="animate-spin text-red-500" />
                    ) : isSearchOpen ? (
                         <X size={16} className="text-white/80 hover:text-red-400 transition-colors" />
                    ) : (
                        <Search size={18} className="text-white/80 hover:text-white" />
                    )}
                </div>
                
                <form onSubmit={handleSearchSubmit} className="w-full h-full flex items-center">
                    <input 
                        ref={inputRef}
                        type="text" 
                        className={`w-full bg-transparent border-none outline-none text-sm text-white pl-10 pr-4 placeholder-white/40 font-medium transition-all duration-300 translate-y-[1px]
                        ${isSearchOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none'}`}
                        placeholder="Search titles..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        disabled={!isSearchOpen}
                        style={{ margin: 0 }} 
                    />
                </form>
            </div>
            
            <button className={`hidden sm:flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/10 transition-all active:scale-95 group flex-shrink-0 ${isSearchOpen ? 'hidden md:flex' : 'flex'}`}>
                <Bell size={18} className="text-gray-300 group-hover:text-white group-hover:rotate-[15deg] transition-all" />
            </button>
            
            {/* Profile Dropdown */}
            <div className={`relative ${isSearchOpen ? 'hidden md:block' : 'block'}`} ref={profileRef}>
                <div 
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="w-10 h-10 rounded-full p-[2px] bg-gradient-to-tr from-red-500 to-orange-500 shadow-lg cursor-pointer hover:scale-105 transition-transform active:scale-95 flex-shrink-0"
                >
                    <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                        <User size={18} className="text-white" />
                    </div>
                </div>

                {/* Profile Popup */}
                <div 
                    className={`absolute top-full right-0 mt-3 w-48 bg-[#121212]/90 backdrop-blur-2xl border border-white/10 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] overflow-hidden transition-all duration-300 origin-top-right
                    ${isProfileOpen ? 'opacity-100 scale-100 translate-y-0 visible' : 'opacity-0 scale-95 -translate-y-2 invisible'}`}
                >
                    <div className="p-4 border-b border-white/5">
                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Signed in as</p>
                        <p className="text-white font-bold truncate">Cherry</p>
                    </div>
                    <div className="p-2">
                         <div className="flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-lg cursor-pointer transition-colors">
                             <User size={16} />
                             <span>Account</span>
                         </div>
                         <div className="flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-lg cursor-pointer transition-colors">
                             <Settings size={16} />
                             <span>Settings</span>
                         </div>
                         <div className="flex items-center gap-3 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg cursor-pointer transition-colors mt-1">
                             <LogOut size={16} />
                             <span>Sign out</span>
                         </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
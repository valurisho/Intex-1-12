import { useEffect } from 'react';

type Props = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  genres: string[];
  selectedGenres: string[];
  toggleGenre: (genre: string) => void;
  clearFilters: () => void;
  sidebarRef: React.RefObject<HTMLDivElement | null>;
};

const HamburgerSidebar = ({
  isSidebarOpen,
  setIsSidebarOpen,
  genres,
  selectedGenres,
  toggleGenre,
  clearFilters,
  sidebarRef,
}: Props) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsSidebarOpen(false);
      }
    };

    if (isSidebarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSidebarOpen, setIsSidebarOpen, sidebarRef]);

  return (
    <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`} ref={sidebarRef}>
      <h3>Filter by Genre</h3>
      <div className="genre-scroll-area">
        {genres.length === 0 ? (
          <p>Loading genres...</p>
        ) : (
          genres.map((genre) => (
            <label key={genre} className="genre-item">
              <input
                type="checkbox"
                checked={selectedGenres.includes(genre)}
                onChange={() => toggleGenre(genre)}
              />
              {genre}
            </label>
          ))
        )}
      </div>
      <button className="clear-filters-btn" onClick={clearFilters}>
        Clear Filters
      </button>
    </div>
  );
};

export default HamburgerSidebar;

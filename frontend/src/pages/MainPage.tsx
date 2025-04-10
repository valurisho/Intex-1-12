import './MainPage.css';
import { useEffect, useState, useRef } from 'react';
import { Movie } from '../types/Movie';
import { Link, useNavigate } from 'react-router-dom';
import AuthorizeView, { AuthorizedUser } from '../components/AuthorizeView';
import Logout from '../components/Logout';
import Recommender from '../components/Recommender';
import { useGenreRecommendations } from '../components/useGenreRecommendations';
import { useUserRecommendations } from '../components/useUserRecommendations';
import { FaSearch } from 'react-icons/fa';
import defaultPoster from '../assets/Intexfun.png';

interface User {
  email: string;
  role?: string;
}

interface MainPageContentProps {
  user: User | null;
}

const MainPageContent = ({ user }: MainPageContentProps) => {
  // All hooks in this component are now safe (they’re at top level)
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [showSearch, setShowSearch] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const allMoviesRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const API_URL = 'https://localhost:5000/Movie';


  const userId = (() => {
    switch (user?.email) {
      case 'rileywells@gmail.com':
        return '1';
      case 'test@test.com':
        return '2';
      case 'admin@test.com':
        return '3';
      case 'jbeals@gmail.com':
        return '4';
      case 'intex@test.com':
        return '5';
      default:
        return '0';
    }
  })();

  console.log('Logged in user:', user?.email);
  console.log('Computed userId:', userId);

  // Use recommendation hooks that now rely on the computed userId.
  const { recommendedMovies: comedyMovies } = useGenreRecommendations('comedy', userId);
  const { recommendedMovies: dramaMovies } = useGenreRecommendations('dramas', userId);
  const { recommendedMovies: horrorMovies } = useGenreRecommendations('horrorthrillers', userId);
  const { recommendedMovies: familyMovies } = useGenreRecommendations('family', userId);
  const { recommendedMovies: adventureMovies } = useGenreRecommendations('adventure', userId);
  const { recommendedMovies: userMovies } = useUserRecommendations(userId);

  // Setup scroll listener.
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch movies and genres.
  useEffect(() => {
    const fetchMoviesAndGenres = async () => {
      try {
        const movieRes = await fetch(`${API_URL}/GetAllMovies`, { credentials: 'include' });
        if (!movieRes.ok) throw new Error('Error fetching movies');
        const movieData = await movieRes.json();
        setMovies(movieData);

        const genreRes = await fetch(`${API_URL}/GetCategories`, { credentials: 'include' });
        if (!genreRes.ok) throw new Error('Error fetching genres');
        const genreData = await genreRes.json();
        setGenres(genreData);
      } catch (error) {
        console.error('Error loading data:', error);
        navigate('/login');
      }
    };
    fetchMoviesAndGenres();
  }, [navigate]);

  // Handle clicks outside the sidebar.
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsSidebarOpen(false);
      }
    };

    if (isSidebarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      setTimeout(() => {
        allMoviesRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 0);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSidebarOpen]);

  const toggleGenre = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  const filteredMovies = movies.filter(
    (m: Movie) =>
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedGenres.length === 0 ||
        selectedGenres.some((genre) =>
          m.categories?.some(
            (movieGenre) => movieGenre.toLowerCase() === genre.toLowerCase()
          )
        ))
  );

  const formatBlobUrl = (title: string): string =>
    `https://inteximages.blob.core.windows.net/movie-posters-2/${title
      .replace(/[^\w\s]/gi, '')
      .trim()}.jpg`;

  return (
    <div className={`page-container ${isSidebarOpen ? 'sidebar-open' : ''}`}>
      {/* Fixed Top Header */}
      <div className="main-header">
        <div className="main-logo">
          <img src="/logo.png" alt="CineNiche Logo" />
        </div>
        <div className="main-nav">
          {user?.role === 'Administrator' && (
            <Link to="/adminPage" className="main-link">
              Manage Movies
            </Link>
          )}
          <Link to="/privacy-policy" className="main-link">
            Privacy
          </Link>
          <Logout>
            Logout: <AuthorizedUser value="email" />
          </Logout>
          <div className="main-search">
            <button
              className="search-icon-btn"
              onClick={() => {
                setShowSearch((prev) => {
                  const newState = !prev;
                  if (!prev && allMoviesRef.current) {
                    setTimeout(() => {
                      allMoviesRef.current?.scrollIntoView({ behavior: 'smooth' });
                    }, 0);
                  }
                  return newState;
                });
              }}
              aria-label="Toggle Search"
            >
              <FaSearch />
            </button>
            {showSearch && (
              <input
                type="text"
                className="main-search-input"
                placeholder="Search for titles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            )}
          </div>
        </div>
      </div>
      {/* Hamburger */}
      <button className="hamburger-btn" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
        ☰
      </button>
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
        <button className="clear-filters-btn" onClick={() => setSelectedGenres([])}>
          Clear Filters
        </button>
      </div>
      {/* Page Content */}
      <div className="content-wrap">
        <Recommender movies={userMovies} title="Your Personalized Picks" />
        <Recommender movies={comedyMovies} title="Comedy Picks for You" />
        <Recommender movies={dramaMovies} title="Dramas You'll Love" />
        <Recommender movies={horrorMovies} title="Thrillers & Horror" />
        <Recommender movies={familyMovies} title="Family Friendly" />
        <Recommender movies={adventureMovies} title="Adventure Awaits" />
        <div ref={allMoviesRef} style={{ position: 'relative' }}>
          <div style={{ height: '60px', marginTop: '-60px' }}></div>
          <div className="section-header">
            <h2>All Movies</h2>
          </div>
        </div>
        <div className="card-container">
          {filteredMovies.map((m) => (
            <Link to={`/movie/${m.show_id}`} key={m.show_id} className="card">
              <img
                src={formatBlobUrl(m.title)}
                alt={m.title}
                loading="lazy"
                width="200"
                height="300"
                style={{ borderRadius: '8px', objectFit: 'cover' }}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = defaultPoster;
                }}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

const MainPage = () => {
  return (
    <AuthorizeView>
      {(user) => <MainPageContent user={user} />}
    </AuthorizeView>
  );
};

export default MainPage;

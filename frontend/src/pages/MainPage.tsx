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
import HamburgerSidebar from '../components/HamburgerSideBar';
import { API_URL } from '../api/MovieAPI';

interface User {
  email: string;
  role?: string;
}

interface MainPageContentProps {
  user: User | null;
}

const MainPageContent = ({ user }: MainPageContentProps) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [showSearch, setShowSearch] = useState(false);
  // const [isScrolled, setIsScrolled] = useState(false);

  const allMoviesRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

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
      case 'inte2x@test.com':
        return '6';
      case 'intex3@test.com':
        return '7';
      case 'intex4@test.com':
        return '8';
      case 'intex5@test.com':
        return '9';
      default:
        return '0';
    }
  })();

  console.log('Logged in user:', user?.email);
  console.log('Computed userId:', userId);

  const { recommendedMovies: comedyMovies } = useGenreRecommendations(
    'comedy',
    userId
  );
  const { recommendedMovies: dramaMovies } = useGenreRecommendations(
    'dramas',
    userId
  );
  const { recommendedMovies: horrorMovies } = useGenreRecommendations(
    'horrorthrillers',
    userId
  );
  const { recommendedMovies: familyMovies } = useGenreRecommendations(
    'family',
    userId
  );
  const { recommendedMovies: adventureMovies } = useGenreRecommendations(
    'adventure',
    userId
  );
  const { recommendedMovies: userMovies } = useUserRecommendations(userId);

  // useEffect(() => {
  //   const handleScroll = () => setIsScrolled(window.scrollY > 50);
  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);

  useEffect(() => {
    const fetchMoviesAndGenres = async () => {
      try {
        const movieRes = await fetch(`${API_URL}/Movie/GetAllMovies`, {
          credentials: 'include',
        });
        if (!movieRes.ok) throw new Error('Error fetching movies');
        const movieData = await movieRes.json();
        setMovies(movieData);

        const genreRes = await fetch(`${API_URL}/Movie/GetCategories`, {
          credentials: 'include',
        });
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
                      allMoviesRef.current?.scrollIntoView({
                        behavior: 'smooth',
                      });
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

      <button
        className="hamburger-btn"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        ☰
      </button>

      {/* Commented out in favor of new component-based sidebar */}
      {/* <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`} ref={sidebarRef}> */}
      {/*   ... */}
      {/* </div> */}

      <HamburgerSidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        genres={genres}
        selectedGenres={selectedGenres}
        toggleGenre={toggleGenre}
        clearFilters={() => setSelectedGenres([])}
        sidebarRef={sidebarRef}
      />

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
    <AuthorizeView>{(user) => <MainPageContent user={user} />}</AuthorizeView>
  );
};

export default MainPage;

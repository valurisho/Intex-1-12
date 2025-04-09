import './AdminMoviePage.css';

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Movie } from '../types/Movie';
import { deleteMovie } from '../api/MovieAPI';
import Pagination from '../components/pagination';

const AdminMoviePage = () => {
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [pageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [totalPages, setTotalPages] = useState(0);

  const API_URL = 'https://localhost:5000/Movie';

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(`${API_URL}/GetAllMovies`);
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setAllMovies(data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    const filtered = allMovies.filter((m) =>
      m.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setTotalPages(Math.ceil(filtered.length / pageSize));

    const startIndex = (pageNum - 1) * pageSize;
    const paged = filtered.slice(startIndex, startIndex + pageSize);
    setMovies(paged);
  }, [searchQuery, pageNum, pageSize, allMovies]);

  const handleDelete = async (show_id: string) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this movie?'
    );
    if (!confirmDelete) return;
    try {
      await deleteMovie(show_id);
      const updated = allMovies.filter((m) => m.show_id !== show_id);
      setAllMovies(updated);
    } catch (err) {
      alert('Failed to delete movie, please try again.');
    }
  };

  return (
    <div className="admin-page">
      {/* Top Header */}
      <div className="admin-header">
        <div className="admin-logo">
          <img src="/logo.png" alt="CineNiche Logo" />
        </div>
        <div className="admin-nav">
          <Link to="/privacy-policy" className="admin-link">
            Privacy Policy
          </Link>
          <Link to="/logout" className="admin-link">
            Logout
          </Link>
        </div>
      </div>

      {/* Search Bar */}
      <div className="admin-search-bar-wrap">
        <input
          type="text"
          placeholder="Search for a Title"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setPageNum(1); // reset page on new search
          }}
          className="admin-search-bar"
        />
      </div>

      {/* Header + Add Button */}
      <div className="admin-header-row">
        <h2>All Movies</h2>
        <Link to="/addMovie" className="add-movie-btn">
          Add New Movie
        </Link>
      </div>

      {/* Movie Cards */}
      <div className="admin-movie-grid">
        {movies.map((m) => (
          <div key={m.show_id} className="admin-movie-card">
            <img
              src={`https://inteximages.blob.core.windows.net/movie-posters-2/${encodeURIComponent(m.title)}.jpg`}
              alt={m.title}
              className="movie-poster"
            />
            <p className="movie-title">{m.title}</p>
            <div className="movie-actions">
              <Link to={`/editMovie/${m.show_id}`} className="action-icon">
                ✏️
              </Link>
              <button
                onClick={() => handleDelete(m.show_id)}
                className="action-icon"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={pageNum}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={setPageNum}
        onPageSizeChange={(newSize) => {
          setPageSize(newSize);
          setPageNum(1);
        }}
      />
    </div>
  );
};

export default AdminMoviePage;

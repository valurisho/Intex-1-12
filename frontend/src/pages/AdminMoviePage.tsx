import { useEffect, useState } from 'react';
import { Movie } from '../types/Movie';
import Pagination from '../components/Pagination';
import { deleteMovie } from '../api/MovieAPI';
// import PrivacyPageFooter from '../components/PrivacyPageFooter'; // optional

const AdminMoviePage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  const API_URL = 'https://localhost:5000/Movie';

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(`${API_URL}/GetAllMovies`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const allMovies: Movie[] = await response.json();
        setTotalPages(Math.ceil(allMovies.length / pageSize));

        const startIndex = (pageNum - 1) * pageSize;
        const pagedMovies = allMovies.slice(startIndex, startIndex + pageSize);
        setMovies(pagedMovies);
      } catch (err) {
        console.error('Error fetching movies:', err);
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [pageSize, pageNum]);

  const handleDelete = async (show_id: string) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this movie?'
    );
    if (!confirmDelete) return;
    try {
      await deleteMovie(show_id);
      setMovies(movies.filter((m) => m.show_id !== show_id));
    } catch (err) {
      alert('Failed to delete movie, please try again.');
    }
  };

  if (loading) return <p>Loading Movies...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div>
      <h1>Admin - Movies</h1>

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>Movie ID</th>
            <th>Title</th>
            <th>Type</th>
            <th>Director</th>
            <th>Cast</th>
            <th>Country</th>
            <th>Release Year</th>
            <th>Rating</th>
            <th>Duration</th>
            <th>Description</th>
            <th>Genre</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((b) => (
            <tr key={b.show_id}>
              <td>{b.show_id}</td>
              <td>{b.title}</td>
              <td>{b.type}</td>
              <td>{b.director}</td>
              <td>{b.cast}</td>
              <td>{b.country}</td>
              <td>{b.release_year}</td>
              <td>{b.rating}</td>
              <td>{b.duration}</td>
              <td>{b.description}</td>
              <td>
                <button className="btn btn-primary btn-sm w-100 mb-1">
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm w-100"
                  onClick={() => handleDelete(b.show_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        currentPage={pageNum}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={setPageNum}
        onPageSizeChange={(newSize) => {
          setPageSize(newSize);
          setPageNum(1); // reset to first page on page size change
        }}
      />
    </div>
  );
};

export default AdminMoviePage;

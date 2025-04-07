import { useEffect, useState } from 'react';
// import NewBookForm from '../components/NewBookForm';
// import EditBookForm from '../components/EditBookForm';
import { Movie } from '../types/Movie';
import Pagination from '../components/Pagination';
import { fetchMovies } from '../api/MovieAPI';
import { deleteMovie } from '../api/MovieAPI';

const AdminBooksPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [pageSize, setPageSize] = useState<number>(5); //default value 1
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [showForm, setShowForm] = useState(false); //infer the type

  //check to see if there is something to change
  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await fetchMovies(pageSize, pageNum, []);
        setMovies(data.movies);
        setTotalPages(Math.ceil(data.totalNumberOfMovies / pageSize));
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    loadMovies();
  }, [pageSize, pageNum]); //recalls it when this things change

  const handleDelete = async (showId: string) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this movie?'
    );
    if (!confirmDelete) return;
    try {
      await deleteMovie(showId);
      setMovies(movies.filter((b) => b.show_id !== showId));
    } catch (error) {
      alert('Failed to delete book, please try again.');
    }
  };

  if (loading) return <p>Loading books...</p>;
  if (error) return <p className="text-red-500">Error{error}</p>;

  return (
    <div>
      <h1>Admin - Books</h1>
      {!showForm && (
        <button
          className="btn btn-success mb-3"
          onClick={() => setShowForm(true)}
        >
          Add Book
        </button>
      )}

      {/* {showForm && (
        <NewBookForm
          onSuccess={() => {
            setShowForm(false);
            fetchMovies(pageSize, pageNum, []).then((data) =>
              setMovies(data.movies)
            );
          }}
          onCancel={() => setShowForm(false)}
        />
      )}
      {editingBook && (
        <EditBookForm
          book={editingBook}
          onSuccess={() => {
            setEditingBook(null);
            fetchBooks(pageSize, pageNum, 'asc', []).then((data) =>
              setMovies(data.books)
            );
          }}
          onCancel={() => setEditingBook(null)}
        />
      )} */}

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>Movie ID:</th>
            <th>Title:</th>
            <th>Type:</th>
            <th>Director:</th>
            <th>Cast:</th>
            <th>Country:</th>
            <th>Release year: </th>
            <th>Rating:</th>
            <th>Duration:</th>
            <th>Description:</th>
            <th>Genre:</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {movies.map((b) => (
            <tr key={b.show_id}>
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
                <button
                  className="btn btn-primary btn-sm w-100 mb-1"
                  //pasing the whole book info
                >
                  Edit
                </button>
                <button className="btn btn-danger btn-sm w=100">Delete</button>
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
          setPageNum(1);
        }}
      />
    </div>
  );
};
export default AdminBooksPage;

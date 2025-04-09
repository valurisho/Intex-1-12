import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AuthorizeView from '../components/AuthorizeView';
import Select from 'react-select';
import './EditMoviePage.css';

const EditMoviePage = () => {
  const navigate = useNavigate();
  const { show_id } = useParams();

  const [formData, setFormData] = useState({
    title: '',
    type: '',
    director: '',
    cast: '',
    country: '',
    release_year: '',
    rating: '',
    duration: '',
    description: '',
    categories: [] as string[],
  });

  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Load movie data and categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [movieRes, categoriesRes] = await Promise.all([
          fetch(`https://localhost:5000/Movie/GetMovieById/${show_id}`, {
            credentials: 'include'
          }),
          fetch('https://localhost:5000/Movie/GetCategories', {
            credentials: 'include'
          })
        ]);
      
        if (!movieRes.ok || !categoriesRes.ok) throw new Error('Fetch failed.');

        const movieData = await movieRes.json();
        const categoriesData = await categoriesRes.json();

        setFormData({
          ...movieData,
          release_year: movieData.release_year.toString(),
          categories: movieData.categories, // assuming this is a string[] of names
        });

        setAvailableCategories(categoriesData);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setSubmitError('Failed to load movie data.');
      }
    };

    fetchData();
  }, [show_id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleGenre = (genre: string) => {
    setFormData((prev) => {
      const updatedGenres = prev.categories.includes(genre)
        ? prev.categories.filter((g) => g !== genre)
        : [...prev.categories, genre];
      return { ...prev, categories: updatedGenres };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    const releaseYear = Number(formData.release_year);
    if (releaseYear < 1700) {
      setSubmitError('Release year must be 1700 or later.');
      return;
    }

    const payload = {
      ...formData,
      release_year: releaseYear,
      categories: formData.categories.map((c) => c.trim().toLowerCase()),
    };

    try {
      const response = await fetch(
        `https://localhost:5000/Movie/updateMovie/${show_id}`,
        {
          credentials: 'include',
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(errText);
      }

      alert('Movie updated!');
      navigate('/AdminPage');
    } catch (error) {
      setSubmitError('Failed to update movie. Please try again.');
      console.error(error);
    }
  };

  if (loading) return <p>Loading movie info...</p>;

  return 
    (<AuthorizeView requiredRole='Administrator'>
            
        <div className="edit-movie-page">
        <h2>Edit Movie</h2>
        <form className="movie-form" onSubmit={handleSubmit}>
          <input
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <input
            name="type"
            placeholder="Type"
            value={formData.type}
            onChange={handleChange}
            required
          />
          <input
            name="director"
            placeholder="Director"
            value={formData.director}
            onChange={handleChange}
          />
          <input
            name="cast"
            placeholder="Cast"
            value={formData.cast}
            onChange={handleChange}
          />
          <input
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleChange}
          />
          <input
            name="release_year"
            type="number"
            placeholder="Release Year"
            value={formData.release_year}
            onChange={handleChange}
            required
          />
          <input
            name="rating"
            placeholder="Rating"
            value={formData.rating}
            onChange={handleChange}
          />
          <input
            name="duration"
            placeholder="Duration"
            value={formData.duration}
            onChange={handleChange}
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
          />

        <div className="select-group">
          <label>Genres:</label>
          <Select
            isMulti
            options={availableCategories.map((genre) => ({
              value: genre,
              label: genre,
            }))}
            value={formData.categories.map((genre) => ({
              value: genre,
              label: genre,
            }))}
            onChange={(selectedOptions) => {
              const genres = selectedOptions.map((option) => option.value);
              setFormData((prev) => ({ ...prev, categories: genres }));
            }}
            className="react-select-container"
            classNamePrefix="react-select"
          />
        </div>

          {submitError && <p className="error-message">{submitError}</p>}

          <div className="form-actions">
            <button type="submit" className="submit-btn">
              Update
            </button>
            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate('/AdminPage')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
      </AuthorizeView>
    );


};

export default EditMoviePage;

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddMoviePage.css';
import Select from 'react-select';
import AuthorizeView from '../components/AuthorizeView';

const AddMoviePage = () => {
  const navigate = useNavigate();

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
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Fetch categories from backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          'https://localhost:5000/Movie/GetCategories',
          {
            credentials: 'include',
          }
        );
        if (!response.ok) throw new Error('Failed to fetch categories');
        const data: string[] = await response.json();
        setAvailableCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  // Form input handler
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // // Genre selection toggle
  // const toggleGenre = (genre: string) => {
  //   setFormData((prev) => {
  //     const updatedGenres = prev.categories.includes(genre)
  //       ? prev.categories.filter((g) => g !== genre)
  //       : [...prev.categories, genre];
  //     return { ...prev, categories: updatedGenres };
  //   });
  // };

  // Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    const releaseYear = Number(formData.release_year);
    if (releaseYear < 1700) {
      setSubmitError('Release year must be 1700 or later.');
      return;
    }
    const cleanedCategories = formData.categories.map((c) =>
      c.trim().toLowerCase()
    );

    const payload = {
      ...formData,
      release_year: releaseYear,
      categories: cleanedCategories,
    };
    console.log('Submitting movie:', payload);
    console.log('Payload categories:', payload.categories);

    try {
      const response = await fetch('https://localhost:5000/Movie/AddMovie', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server error:', errorText);
        throw new Error(errorText || 'Failed to add movie.');
      }
      const result = await response.json();
      console.log(result.message); // For debug

      alert('Movie added successfully!');
      navigate('/AdminPage');
    } catch (error) {
      setSubmitError('Error submitting form. Please try again.');
      console.error(error);
    }
  };

  return (
    <AuthorizeView requiredRole="Administrator">
      <div className="add-movie-page">
        <h2>Add New Movie</h2>
        <form className="movie-form" onSubmit={handleSubmit}>
          <input
            name="title"
            placeholder="Title"
            onChange={handleChange}
            required
          />
          <input
            name="type"
            placeholder="Type (e.g. Movie, TV Show)"
            onChange={handleChange}
            required
          />
          <input
            name="director"
            placeholder="Director"
            onChange={handleChange}
          />
          <input name="cast" placeholder="Cast" onChange={handleChange} />
          <input name="country" placeholder="Country" onChange={handleChange} />
          <input
            name="release_year"
            type="number"
            placeholder="Release Year"
            onChange={handleChange}
            required
          />
          <input
            name="rating"
            placeholder="Rating (e.g. PG-13)"
            onChange={handleChange}
          />
          <input
            name="duration"
            placeholder="Duration (e.g. 90 min)"
            onChange={handleChange}
          />
          <textarea
            name="description"
            placeholder="Description"
            rows={3}
            onChange={handleChange}
          />

          {loadingCategories ? (
            <p>Loading categories...</p>
          ) : (
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
          )}

          {submitError && <p className="error-message">{submitError}</p>}

          <div className="form-actions">
            <button type="submit" className="submit-btn">
              Add Movie
            </button>
            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate('/adminPage')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </AuthorizeView>
  );
};

export default AddMoviePage;

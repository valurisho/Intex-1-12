import { Movie } from '../types/Movie';

// interface FetchMoviesResponse {
//   movies: Movie[];
//   totalNumberOfMovies: number;
// }

export const API_URL = 'https://intex-group1-12-backend-bdb9gqd9ecfvhtc8.westus3-01.azurewebsites.net';

export const addMovie = async (newMovie: Movie): Promise<Movie> => {
  try {
    const response = await fetch(`${API_URL}/Movie/AddMovie?`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newMovie),
    });
    if (!response.ok) {
      throw new Error('Failed to add Movie');
    }
    return await response.json();
  } catch (error) {
    console.error('Error adding movie', error);
    throw error;
  }
};
export const updateMovie = async (
  show_id: string,
  updatedMovie: Movie
): Promise<Movie> => {
  try {
    const response = await fetch(`${API_URL}/Movie/UpdateMovie/${show_id}?`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedMovie),
    });
    if (!response.ok) {
      throw new Error('Failed to edit movie');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating Movie:', error);
    throw error;
  }
};

export const deleteMovie = async (show_id: string): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/Movie/deleteMovie/${show_id}?`, {
      method: 'DELETE',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to delete movie');
    }
  } catch (error) {
    console.error('Error deleting movie:', error);
    throw error;
  }
};

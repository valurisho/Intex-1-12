import { useEffect, useState } from 'react';
import { Movie } from '../types/Movie';

export const useGenreRecommendations = (genre: string, userId: string) => {
  const [recommendedMovies, setRecommendedMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await fetch(
          `https://intex-group1-12-backend-bdb9gqd9ecfvhtc8.westus3-01.azurewebsites.net/api/GenreRecommendation/${genre}/${userId}`,
          {
            credentials: 'include',
          }
        );
        const raw = await response.text();

        if (!response.ok) {
          console.error('API error:', raw);
          return;
        }

        const recommendedIds: string[] = JSON.parse(raw);

        const allMoviesRes = await fetch(
          `https://intex-group1-12-backend-bdb9gqd9ecfvhtc8.westus3-01.azurewebsites.net/Movie/GetAllMovies`,
          {
            credentials: 'include',
          }
        ); // Adjust this if needed
        const allMovies: Movie[] = await allMoviesRes.json();

        const matched = allMovies.filter((m) =>
          recommendedIds.includes(m.show_id)
        );

        const ordered = recommendedIds
          .map((id) => matched.find((m) => m.show_id === id))
          .filter(Boolean) as Movie[];

        setRecommendedMovies(ordered);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      }
    };

    fetchRecommendations();
  }, [genre, userId]);

  return { recommendedMovies, loading };
};

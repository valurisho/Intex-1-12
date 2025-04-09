import { useEffect, useState } from 'react';
import { UserRecommendation } from '../types/UserRecommendation';
import { Movie } from '../types/Movie';

export const useUserRecommendations = (userId: string) => {
  const [recommendedMovies, setRecommendedMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRecs = async () => {
      try {
        const response = await fetch(
          `https://localhost:5000/api/UserRecommendation/${userId}`,
          {
            credentials: 'include',
          }
        );

        if (!response.ok) {
          console.error('Failed to fetch user recs');
          return;
        }

        const userRec: UserRecommendation = await response.json();
        const recIds = [
          userRec.rec_1,
          userRec.rec_2,
          userRec.rec_3,
          userRec.rec_4,
          userRec.rec_5,
          userRec.rec_6,
          userRec.rec_7,
          userRec.rec_8,
          userRec.rec_9,
          userRec.rec_10,
        ];

        const allMoviesRes = await fetch(
          `https://localhost:5000/Movie/GetAllMovies`,
          {
            credentials: 'include',
          }
        );
        const allMovies: Movie[] = await allMoviesRes.json();

        const matched = allMovies.filter((m) => recIds.includes(m.show_id));

        const ordered = recIds
          .map((id) => matched.find((m) => m.show_id === id))
          .filter(Boolean) as Movie[];

        setRecommendedMovies(ordered);
      } catch (error) {
        console.error('Error fetching user recommendations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRecs();
  }, [userId]);

  return { recommendedMovies, loading };
};

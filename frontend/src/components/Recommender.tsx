// src/components/Recommender.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Movie } from '../types/Movie';
import './Recommender.css';

interface RecommenderProps {
  movies: Movie[];
  title?: string;
}

const Recommender: React.FC<RecommenderProps> = ({
  movies,
  title = 'Recommended for You',
}) => {
  return (
    <div className="section-wrap">
      <div className="section-header">
        <h2>{title}</h2>
      </div>
      <div className="recommended-row">
        {movies.slice(0, 10).map((m) => (
          <Link
            to={`/movie/${m.show_id}`}
            key={m.show_id}
            className="recommended-card"
          >
            <img
              className="recommended-img"
              src={`https://inteximages.blob.core.windows.net/movie-posters-2/${encodeURIComponent(m.title)}.jpg`}
              alt={m.title}
              loading="lazy"
              width="160"
              height="240"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Recommender;

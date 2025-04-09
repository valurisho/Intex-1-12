// src/components/StarRating.tsx
import React, { useState } from 'react';
import { StarRatingProps } from '../types/StarRatingProps';

const StarRating: React.FC<StarRatingProps> = ({
  showId,
  userId,
  initialRating = 0,
}) => {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);
  const [message, setMessage] = useState('');

  const handleRating = async (selectedRating: number) => {
    setRating(selectedRating);
    setMessage('');

    try {
      const response = await fetch('https://localhost:5000/Movie/AddRating', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          showId,
          rating: selectedRating,
        }),
      });

      const text = await response.text();
      console.log('📡 Response status:', response.status);
      console.log('🧾 Raw response text:', text);

      if (!response.ok) throw new Error('Failed to submit rating');

      const result = JSON.parse(text);
      setMessage(result.message);
    } catch (error) {
      console.error('Error submitting rating:', error);
    }
  };

  return (
    <div className="rating-section">
      <strong>Rate this movie:</strong>
      <div className="star-rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <label key={star}>
            <input
              type="radio"
              name="userRating"
              value={star}
              onChange={() => {
                handleRating(star);
              }}
              style={{ display: 'none' }}
            />
            <span
              className={star <= (hoverRating || rating) ? 'filled' : ''}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
            >
              ★
            </span>
          </label>
        ))}
      </div>
      {message && (
        <p style={{ color: 'green', marginTop: '0.5rem' }}>{message}</p>
      )}
    </div>
  );
};

export default StarRating;

// src/components/StarRating.tsx
import React, { useState } from 'react';

interface StarRatingProps {
  showId: string;
  userId: number;
  initialRating?: number;
}

const StarRating: React.FC<StarRatingProps> = ({
  showId,
  userId,
  initialRating = 0,
}) => {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);

  const handleRating = async (selectedRating: number) => {
    setRating(selectedRating);

    const payload = {
      userId: userId,
      showId: showId,
      rating: selectedRating,
    };

    console.log('🚀 Submitting rating:', payload); // ✅ Log before sending

    try {
      const response = await fetch('https://localhost:5000/Movie/AddRating', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          showId: showId,
          rating: selectedRating,
        }),
      });

      if (!response.ok) throw new Error('Failed to submit rating');

      const result = await response.json();
      console.log(result.message); // Optional: Display to user
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
                console.log(`⭐ Clicked star: ${star}`);
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
    </div>
  );
};

export default StarRating;

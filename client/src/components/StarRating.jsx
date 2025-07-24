import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

const StarRating = ({
  rating,
  maxRating = 5,
  onRatingChange,
  readonly = false,
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const handleStarClick = (index) => {
    if (!readonly && onRatingChange) {
      onRatingChange(index + 1);
    }
  };

  return (
    <div className="star-rating">
      {Array.from({ length: maxRating }, (_, index) => (
        <Star
          key={index}
          className={cn(
            'star transition-all duration-200',
            sizeClasses[size],
            {
              'filled': index < rating,
              'cursor-pointer hover:scale-110': !readonly
            }
          )}
          fill={index < rating ? 'currentColor' : 'none'}
          onClick={() => handleStarClick(index)}
        />
      ))}
    </div>
  );
};

export default StarRating;

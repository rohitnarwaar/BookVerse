import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Tag } from 'lucide-react';
import StarRating from './StarRating';
import { Badge } from '@/components/ui/badge';

const BookCard = ({ book }) => {
  const avgRating = typeof book.averageRating === 'number' ? book.averageRating : 0;
  const reviewCount = typeof book.reviewCount === 'number' ? book.reviewCount : 0;
  const description = book.description?.trim() || "No description available.";
  const publishedYear = book.publishedYear || "N/A";
  const genre = book.genre || "General";
  const author = book.author?.trim() || "Unknown Author";

  return (
    <Link to={`/books/${book._id}`} className="block">
      <div className="book-card p-6 rounded-xl h-full">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="book-title text-xl font-playfair font-semibold text-foreground mb-2 line-clamp-2">
              {book.title}
            </h3>
            <p className="text-muted-foreground font-medium mb-1">
              {author}
            </p>
            <div className="flex items-center space-x-3 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{publishedYear}</span>
              </div>
            </div>
          </div>
          <Badge
            variant="secondary"
            className="bg-primary-muted text-primary border-primary/20"
          >
            <Tag className="w-3 h-3 mr-1" />
            {genre}
          </Badge>
        </div>

        {/* Description */}
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
          {description}
        </p>

        {/* Rating */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <StarRating rating={avgRating} readonly size="sm" />
            <span className="text-sm font-medium text-foreground">
              {avgRating.toFixed(1)}
            </span>
          </div>
          <span className="text-xs text-muted-foreground">
            {reviewCount} review{reviewCount !== 1 ? 's' : ''}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default BookCard;

import React, { useState } from 'react';
import { Star, ThumbsUp, Flag } from 'lucide-react';
import clsx from 'clsx';
import Rating from './Rating';
import Button from './Button';
import { formatRelativeTime } from '../utils/formatters';

const ProductReviews = ({ reviews = [], productRating = 0, totalReviews = 0 }) => {
  const [sortBy, setSortBy] = useState('recent');

  // Calculate rating distribution
  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => {
    const count = reviews.filter((r) => Math.floor(r.rating) === rating).length;
    const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
    return { rating, count, percentage };
  });

  // Sort reviews
  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortBy === 'recent') {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else if (sortBy === 'helpful') {
      return b.helpful - a.helpful;
    } else if (sortBy === 'rating-high') {
      return b.rating - a.rating;
    } else if (sortBy === 'rating-low') {
      return a.rating - b.rating;
    }
    return 0;
  });

  return (
    <div className="space-y-8">
      {/* Overall Rating Summary */}
      <div className="bg-gray-50 rounded-xl p-6">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Average Rating */}
          <div className="flex flex-col items-center justify-center text-center">
            <div className="text-5xl font-bold text-gray-900 mb-2">
              {productRating.toFixed(1)}
            </div>
            <Rating value={productRating} size="lg" showValue={false} />
            <p className="text-gray-600 mt-2">Based on {totalReviews} reviews</p>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-2">
            {ratingDistribution.map(({ rating, count, percentage }) => (
              <div key={rating} className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-700 w-8">
                  {rating} ★
                </span>
                <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-400 transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600 w-12 text-right">
                  {count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-gray-900">
          Customer Reviews ({totalReviews})
        </h3>
        
        {/* Sort Dropdown */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          <option value="recent">Most Recent</option>
          <option value="helpful">Most Helpful</option>
          <option value="rating-high">Highest Rating</option>
          <option value="rating-low">Lowest Rating</option>
        </select>
      </div>

      {/* Reviews List */}
      {sortedReviews.length > 0 ? (
        <div className="space-y-6">
          {sortedReviews.map((review) => (
            <ReviewItem key={review.id} review={review} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <p className="text-gray-500">No reviews yet. Be the first to review!</p>
          <Button variant="primary" className="mt-4">
            Write a Review
          </Button>
        </div>
      )}

      {/* Load More Button */}
      {sortedReviews.length > 5 && (
        <div className="text-center">
          <Button variant="outline">Load More Reviews</Button>
        </div>
      )}
    </div>
  );
};

const ReviewItem = ({ review }) => {
  const [helpful, setHelpful] = useState(review.helpful);
  const [hasVoted, setHasVoted] = useState(false);

  const handleHelpful = () => {
    if (!hasVoted) {
      setHelpful(helpful + 1);
      setHasVoted(true);
    }
  };

  return (
    <div className="border-b border-gray-200 pb-6 last:border-0">
      <div className="flex items-start gap-4">
        {/* User Avatar */}
        <img
          src={review.userAvatar}
          alt={review.userName}
          className="w-12 h-12 rounded-full object-cover"
        />

        {/* Review Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="flex items-start justify-between mb-2">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-semibold text-gray-900">{review.userName}</h4>
                {review.verified && (
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                    Verified Purchase
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Rating value={review.rating} size="sm" showValue={false} />
                <span className="text-sm text-gray-500">
                  {formatRelativeTime(review.createdAt)}
                </span>
              </div>
            </div>
          </div>

          {/* Review Title */}
          {review.title && (
            <h5 className="font-semibold text-gray-900 mb-2">{review.title}</h5>
          )}

          {/* Review Text */}
          <p className="text-gray-700 mb-4 leading-relaxed">{review.comment}</p>

          {/* Review Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleHelpful}
              disabled={hasVoted}
              className={clsx(
                'flex items-center gap-2 text-sm transition-colors',
                hasVoted
                  ? 'text-primary-600 cursor-not-allowed'
                  : 'text-gray-600 hover:text-primary-600'
              )}
            >
              <ThumbsUp className={clsx('w-4 h-4', hasVoted && 'fill-current')} />
              Helpful ({helpful})
            </button>

            <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-600 transition-colors">
              <Flag className="w-4 h-4" />
              Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductReviews;
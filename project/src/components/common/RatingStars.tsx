import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  showRatingValue?: boolean;
  onClick?: (rating: number) => void;
}

const RatingStars = ({
  rating,
  maxRating = 5,
  size = 'md',
  showRatingValue = false,
  onClick
}: RatingStarsProps) => {
  const getSizeClass = () => {
    switch (size) {
      case 'sm': return 'h-4 w-4';
      case 'lg': return 'h-7 w-7';
      default: return 'h-5 w-5';
    }
  };

  const handleClick = (selectedRating: number) => {
    if (onClick) {
      onClick(selectedRating);
    }
  };

  const sizeClass = getSizeClass();
  const isInteractive = !!onClick;

  return (
    <div className="flex items-center">
      <div className="flex">
        {[...Array(maxRating)].map((_, index) => {
          const starValue = index + 1;
          const isFilled = starValue <= rating;
          
          return (
            <button
              key={index}
              type="button"
              onClick={() => handleClick(starValue)}
              className={`${isFilled ? 'text-amber-400' : 'text-gray-300'} 
                ${isInteractive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} 
                transition-all duration-150`}
              disabled={!isInteractive}
            >
              <Star className={`${sizeClass} fill-current`} />
            </button>
          );
        })}
      </div>
      
      {showRatingValue && (
        <span className="ml-2 text-sm font-medium text-gray-600">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
};

export default RatingStars;
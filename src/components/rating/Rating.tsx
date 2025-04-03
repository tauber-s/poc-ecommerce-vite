import { useEffect, useState, JSX } from 'react';

import { RatingProps } from './Rating.props';
import './Rating.css';
import Star from './Star';

const Rating = ({
  rating,
  ratingCount,
  className,
  ...props
}: RatingProps): JSX.Element => {
  const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>));

  const constructRating = (currentRating: number) => {
    const updatedArray = ratingArray.map((ratingItem: JSX.Element, idx: number) => {
      return (
        <Star
          isFilled={idx < Math.round(currentRating)}
          key={idx}
          className={`${className || ''}`}
          tabIndex={-1}
        />
      );
    });
    setRatingArray(updatedArray);
  };

  useEffect(() => {
    constructRating(rating);
  }, [rating]);

  return (
    <span {...props}>
      <span className='rating-rate'>{rating} </span>
      {ratingArray.map((r: JSX.Element, idx) => (
        <span className='rating-star' key={idx}>{r}</span>
      ))}
      <span className='rating-count'> ({ratingCount}) </span>
    </span>
  );
};

export default Rating;

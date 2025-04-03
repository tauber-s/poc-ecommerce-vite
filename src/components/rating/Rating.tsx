import { useEffect, useState, KeyboardEvent, JSX } from 'react';

import { RatingProps } from './Rating.props';
import './Rating.css';
import Star from './Star';

const Rating = ({
  isEditable = false,
  rating,
  setRating,
  ratingCount,
  className,
  ...props
}: RatingProps): JSX.Element => {
  const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>));

  const hoverHandle = (idx: number) => {
    if (!isEditable) {
      return;
    }
    constructRating(idx);
  };

  const clickHandle = (idx: number) => {
    if (!isEditable || !setRating) {
      return;
    }
    setRating(idx);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLSpanElement>, idx: number) => {
    if (!isEditable || !setRating) {
      return;
    }
    if (e.code !== 'Space') {
      return;
    }
    setRating(idx);
  };

  const constructRating = (currentRating: number) => {
    const updatedArray = ratingArray.map((ratingItem: JSX.Element, idx: number) => {
      return (
        <Star
          isFilled={idx < Math.round(currentRating)}
          key={idx}
          onMouseEnter={() => hoverHandle(idx + 1)}
          onMouseLeave={() => hoverHandle(rating)}
          onClick={() => clickHandle(idx + 1)}
          className={`${className || ''} ${isEditable ? 'cursor-pointer' : ''}`}
          tabIndex={isEditable ? 0 : -1}
          onKeyDown={(e: KeyboardEvent<HTMLSpanElement>) => handleKeyDown(e, idx + 1)}
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

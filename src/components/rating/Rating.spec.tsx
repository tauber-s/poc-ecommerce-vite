import { render, screen } from '@testing-library/react';
import Rating from './Rating';

describe('Rating Component', () => {
  const rating = 3;
  const ratingCount = 100;
  
  it('renders the component with the given rating and count', () => {
    render(<Rating rating={rating} ratingCount={ratingCount} />);
    
    const filledStars = screen.getAllByTestId('star-filled');
    expect(filledStars).toHaveLength(3);
  });

  it('shows correct number of filled stars based on rating', () => {
    render(<Rating rating={rating} ratingCount={ratingCount} />);

    const filledStars = screen.getAllByTestId('star-filled');
    expect(filledStars).toHaveLength(3);

    const unfilledStars = screen.getAllByTestId('star-unfilled');
    expect(unfilledStars).toHaveLength(2);
  });


});

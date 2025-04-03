import { render, screen, fireEvent } from '@testing-library/react';
import Star from './Star';

const getStarPath = () => screen.getByTestId(/star/).querySelector('svg path');

describe('Star Component', () => {
  it('renders correctly when not filled', () => {
    render(<Star isFilled={false} tabIndex={0} />);

    const star = screen.getByTestId('star-unfilled');
    expect(star).toBeInTheDocument();

    const path = getStarPath();
    expect(path).toHaveAttribute('fill', 'none');
    expect(path).toHaveAttribute('stroke', '#212121');
  });

  it('renders correctly when filled', () => {
    render(<Star isFilled={true} tabIndex={0} />);

    const star = screen.getByTestId('star-filled');
    expect(star).toBeInTheDocument();

    const path = getStarPath();
    expect(path).toHaveAttribute('fill', '#FD7E14'); 
    expect(path).toHaveAttribute('stroke', '#FD7E14');
  });

  it('applies the className prop', () => {
    render(<Star className="custom-class" isFilled={false} tabIndex={0} />);

    const star = screen.getByTestId('star-unfilled');
    expect(star).toHaveClass('custom-class');
  });

  it('triggers onMouseEnter and onMouseLeave handlers', () => {
    const onMouseEnter = jest.fn();
    const onMouseLeave = jest.fn();

    render(<Star onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} isFilled={false} tabIndex={0} />);

    const star = screen.getByTestId('star-unfilled');
    fireEvent.mouseEnter(star);
    expect(onMouseEnter).toHaveBeenCalledTimes(1);

    fireEvent.mouseLeave(star);
    expect(onMouseLeave).toHaveBeenCalledTimes(1);
  });

  it('triggers onClick handler', () => {
    const onClick = jest.fn();

    render(<Star onClick={onClick} isFilled={false} tabIndex={0} />);

    const star = screen.getByTestId('star-unfilled');
    fireEvent.click(star);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('triggers onKeyDown handler', () => {
    const onKeyDown = jest.fn();

    render(<Star onKeyDown={onKeyDown} isFilled={false} tabIndex={0} />);

    const star = screen.getByTestId('star-unfilled');
    fireEvent.keyDown(star, { key: 'Enter', code: 'Enter' });
    expect(onKeyDown).toHaveBeenCalledTimes(1);
  });

  it('supports the tabIndex prop', () => {
    render(<Star tabIndex={0} isFilled={false} />);

    const star = screen.getByTestId('star-unfilled');
    expect(star).toHaveAttribute('tabIndex', '0');
  });
});

import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from './SearchBar';

describe('SearchBar Component', () => {
  it('renders correctly', () => {
    render(<SearchBar searchText="" setSearchText={() => {}} />);

    const input = screen.getByPlaceholderText('Search for a product...');
    expect(input).toBeInTheDocument();
  });

  it('displays the correct value from searchText prop', () => {
    render(<SearchBar searchText="Notebook" setSearchText={() => {}} />);

    const input = screen.getByPlaceholderText('Search for a product...');
    expect(input).toHaveValue('Notebook');
  });

  it('calls setSearchText function on input change', () => {
    const setSearchText = jest.fn();
    render(<SearchBar searchText="" setSearchText={setSearchText} />);

    const input = screen.getByPlaceholderText('Search for a product...');
    fireEvent.change(input, { target: { value: 'Smartphone' } });

    expect(setSearchText).toHaveBeenCalledTimes(1);
    expect(setSearchText).toHaveBeenCalledWith('Smartphone');
  });

  it('applies the className prop correctly', () => {
    const { container } = render(<SearchBar searchText="" setSearchText={() => {}} className="custom-class" />);

    const form = container.querySelector('form'); 
    expect(form).toHaveClass('custom-class'); 
  });

  it('has the correct placeholder text', () => {
    render(<SearchBar searchText="" setSearchText={() => {}} />);

    const input = screen.getByPlaceholderText('Search for a product...');
    expect(input).toHaveAttribute('placeholder', 'Search for a product...');
  });
});

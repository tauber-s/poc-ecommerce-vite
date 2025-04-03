import { render, screen, fireEvent } from '@testing-library/react';
import Products from './Products';
import { Product } from './Product.type';

jest.mock('@/_data/products.json', () => [
  { id: 1, title: 'Product Test 1', category: 'Electronics', rating: 4, ratingCount: 100, description: 'Description 1', price: 100, image: 'image1.jpg' },
  { id: 2, title: 'Product Test 2', category: 'Electronics', rating: 5, ratingCount: 200, description: 'Description 2', price: 200, image: 'image2.jpg' },
  { id: 3, title: 'Product Test 3', category: 'Electronics', rating: 3, ratingCount: 50, description: 'Description 3', price: 300, image: 'image3.jpg' },
]);

jest.mock('./card/ProductCard', () => ({ product }: { product: Product }) => (
  <div data-testid={`product-card-${product.id}`}>
    {product.title}
  </div>
));

jest.mock('@/components/searchBar/SearchBar', () => ({ searchText, setSearchText }: { searchText: string, setSearchText: <T>(value: T) => T}) => (
  <input
    value={searchText}
    onChange={(e) => setSearchText(e.target.value)}
    placeholder="Search products"
  />
));

describe('Products component', () => {
  it('should render without crashing', () => {
    render(<Products />);
    expect(screen.getByText('Product Test 1')).toBeInTheDocument();
    expect(screen.getByText('Product Test 2')).toBeInTheDocument();
    expect(screen.getByText('Product Test 3')).toBeInTheDocument();
  });

  it('should filter products based on search input', () => {
    render(<Products />);
    
    expect(screen.getByText('Product Test 1')).toBeInTheDocument();
    expect(screen.getByText('Product Test 2')).toBeInTheDocument();
    expect(screen.getByText('Product Test 3')).toBeInTheDocument();

    const searchInput = screen.getByPlaceholderText('Search products');
    fireEvent.change(searchInput, { target: { value: 'Product Test 1' } });
    
    expect(screen.queryByText('Product Test 1')).toBeInTheDocument();
    expect(screen.queryByText('Product Test 2')).toBeNull();
    expect(screen.queryByText('Product Test 3')).toBeNull();
  });

  it('should render ProductCard for each filtered product', () => {
    render(<Products />);

    expect(screen.getByTestId('product-card-1')).toBeInTheDocument();
    expect(screen.getByTestId('product-card-2')).toBeInTheDocument();
    expect(screen.getByTestId('product-card-3')).toBeInTheDocument();
    
    const searchInput = screen.getByPlaceholderText('Search products');
    fireEvent.change(searchInput, { target: { value: 'Product Test 2' } });

    expect(screen.queryByTestId('product-card-1')).toBeNull();
    expect(screen.getByTestId('product-card-2')).toBeInTheDocument();
    expect(screen.queryByTestId('product-card-3')).toBeNull();
  });
});

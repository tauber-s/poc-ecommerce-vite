import { render, screen } from '@testing-library/react';
import ProductCard from '@/components/products/card/ProductCard';
import { ProductCardProps } from '@/components/products/card/ProductCard.props';
import { BrowserRouter as Router } from 'react-router';

const mockProduct: ProductCardProps['product'] = {
  id: 123,
  title: 'Test Product',
  image: 'https://example.com/product-image.jpg',
  rating: 4.5,
  price: 19.99,
  description: 'Product description',
  category: 'Test',
  ratingCount: 123
};

describe('ProductCard', () => {
  test('renders product card with product information', () => {
    render(
      <Router>
        <ProductCard product={mockProduct} />
      </Router>
    );

    expect(screen.getByText(/Test Product/i)).toBeInTheDocument();
    expect(screen.getByText(/★ 4.5/i)).toBeInTheDocument();
    expect(screen.getByText(/\$ 19.99/i)).toBeInTheDocument();
    
    const image = screen.getByAltText(/Test Product/i) as HTMLImageElement;

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('alt', 'Test Product');
    expect(image.src).toBe('https://example.com/product-image.jpg');
  });

  test('contains a link to the product details page', () => {
    render(
      <Router>
        <ProductCard product={mockProduct} />
      </Router>
    );

    expect(screen.getByRole('link', { name: 'View Product' })).toHaveAttribute('href', '/product/123')
  });
});

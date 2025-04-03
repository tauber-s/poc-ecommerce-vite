import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import ProductView from './ProductView';
import { Product } from '../Product.type';

jest.mock('@/_data/products.json', () => [
  { id: 1, title: 'Product Test 1', category: 'Electronics', rating: 4, ratingCount: 100, description: 'Description 1', price: 100, image: 'image1.jpg' },
  { id: 2, title: 'Product Test 2', category: 'Electronics', rating: 5, ratingCount: 200, description: 'Description 2', price: 200, image: 'image2.jpg' },
  { id: 3, title: 'Product Test 3', category: 'Electronics', rating: 3, ratingCount: 50, description: 'Description 3', price: 300, image: 'image3.jpg' },
  { id: 4, title: 'Product Test 4', category: 'Clothing', rating: 5, ratingCount: 250, description: 'Description 4', price: 50, image: 'image4.jpg' },
  { id: 5, title: 'Product Test 5', category: 'Electronics', rating: 4, ratingCount: 150, description: 'Description 5', price: 150, image: 'image5.jpg' },
]);

jest.mock('@/components/rating/Rating', () => {
  return ({ rating }: { rating: number }) => <div>{rating}</div>;
});

jest.mock('@/components/products/card/ProductCard', () => {
  return ({ product }: { product: Product }) => <div>{product.title}</div>;
});

describe('ProductView', () => {
  const renderProductView = (id: string) => {
    return render(
      <MemoryRouter initialEntries={[`/product/${id}`]}>
        <Routes>
          <Route path="/product/:id" element={<ProductView />} />
        </Routes>
      </MemoryRouter>
    );
  };

  it('renders the correct product details when product exists', async () => {
    const productId = '2';
    renderProductView(productId);

    await waitFor(() => {
      expect(screen.getByText('Product Test 2')).toBeInTheDocument();
      expect(screen.getByText('Electronics')).toBeInTheDocument();
      expect(screen.getByText('5')).toBeInTheDocument();
      expect(screen.getByText('$ 200')).toBeInTheDocument();
      expect(screen.getByText('Description 2')).toBeInTheDocument();
    });
  });

  it('shows "Product not found" if product does not exist', async () => {
    const productId = '999';
    renderProductView(productId);

    await waitFor(() => {
      expect(screen.getByText('Product not found')).toBeInTheDocument();
    });
  });

  it('displays product recommendations correctly sorted by rating and ID', async () => {
    const productId = '2';
    renderProductView(productId);

    await waitFor(() => {
      const recommendedProducts = screen.getAllByText(/Product Test/);
      expect(recommendedProducts).toHaveLength(4);

      expect(recommendedProducts[0]).toHaveTextContent('Product Test 2');
      expect(recommendedProducts[1]).toHaveTextContent('Product Test 5');
      expect(recommendedProducts[2]).toHaveTextContent('Product Test 1');
      expect(recommendedProducts[3]).toHaveTextContent('Product Test 3');
    });
  });

  
});

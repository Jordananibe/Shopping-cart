
import { render, screen, fireEvent } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import ProductCard from '../components/ProductCard';

const mockProduct = {
  id: 1,
  title: 'Test T-Shirt',
  price: 25.99,
  image: 'https://example.com/shirt.jpg',
  description: 'A comfortable shirt',
  category: 'clothing',
  rating: { rate: 4.5, count: 10 },
};

test('renders the product title and price', () => {
  render(
    <ProductCard
      product={mockProduct}
      onAddToCart={() => {}}
    />
  );

  expect(screen.getByText('Test T-Shirt')).toBeInTheDocument();
  expect(screen.getByText('$25.99')).toBeInTheDocument();
});

test('calls onAddToCart when the button is clicked', () => {
  const handleAddToCart = vi.fn();

  render(
    <ProductCard
      product={mockProduct}
      onAddToCart={handleAddToCart}
    />
  );

  fireEvent.click(screen.getByRole('button', { name: /add to cart/i }));

  expect(handleAddToCart).toHaveBeenCalledWith(mockProduct);
});

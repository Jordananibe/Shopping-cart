
import { render, screen } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import Cart from '../pages/Cart';

const mockCartItems = [
  {
    id: 1,
    title: 'Test T-Shirt',
    price: 25.99,
    image: 'https://example.com/shirt.jpg',
    quantity: 2,
  },
];

test('renders the product in the cart', () => {
  render(
    <Cart
      cartItems={mockCartItems}
      onIncrease={vi.fn()}
      onDecrease={vi.fn()}
      onRemove={vi.fn()}
    />
  );

  expect(screen.getByText('Test T-Shirt')).toBeInTheDocument();
});

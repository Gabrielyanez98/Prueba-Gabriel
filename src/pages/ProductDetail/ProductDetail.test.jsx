import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import * as useProductDetailHook from '../../hooks/useProductDetail';
import * as useCartHook from '../../hooks/useCart';
import * as useCartContextHook from '../../context/CartContext';
import ProductDetailPage from './ProductDetail';

vi.mock('../../hooks/useProductDetail');
vi.mock('../../hooks/useCart');
vi.mock('../../context/CartContext');

describe('ProductDetailPage Component', () => {
  const mockProduct = {
    id: 'test-id',
    brand: 'Apple',
    model: 'iPhone 15',
    price: '999',
    imgUrl: 'image.jpg',
    options: {
      colors: [{ code: 1, name: 'Black' }],
      storages: [{ code: 10, name: '128GB' }]
    }
  };

  const mockUpdateCartCount = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    useCartContextHook.useCartContext.mockReturnValue({
      updateCartCount: mockUpdateCartCount
    });
  });

  it('should show loading state initially', () => {
    useProductDetailHook.useProductDetail.mockReturnValue({ loading: true });
    useCartHook.useCart.mockReturnValue({ addProductToCart: vi.fn(), isAdding: false });

    render(<MemoryRouter><ProductDetailPage /></MemoryRouter>);
    expect(screen.getByText(/loading product details.../i)).toBeInTheDocument();
  });

  it('should render product details and handle add to cart', async () => {
    const mockAddProductToCart = vi.fn().mockResolvedValue(1);
    
    useProductDetailHook.useProductDetail.mockReturnValue({
      product: mockProduct,
      loading: false,
      error: null
    });
    
    useCartHook.useCart.mockReturnValue({
      addProductToCart: mockAddProductToCart,
      isAdding: false
    });

    render(
      <MemoryRouter initialEntries={['/product/test-id']}>
        <Routes>
          <Route path="/product/:id" element={<ProductDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    // Verify brand and model are rendered
    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.getByText('iPhone 15')).toBeInTheDocument();

    // Simulate Add to Cart
    const addButton = screen.getByRole('button', { name: /add to cart/i });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(mockAddProductToCart).toHaveBeenCalledWith('test-id', 1, 10);
      expect(mockUpdateCartCount).toHaveBeenCalledWith(1);
    });
  });

  it('should show error message if product fetch fails', () => {
    useProductDetailHook.useProductDetail.mockReturnValue({
      loading: false,
      error: 'Failed to load'
    });
    useCartHook.useCart.mockReturnValue({ addProductToCart: vi.fn(), isAdding: false });

    render(<MemoryRouter><ProductDetailPage /></MemoryRouter>);
    expect(screen.getByText(/failed to load/i)).toBeInTheDocument();
  });
});
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ProductDetailPage from './ProductDetail';
import * as productsApi from '../../features/api/productsApi';
import * as reactRedux from 'react-redux';
import { updateCartCount } from '../../features/cart/cartSlice';

vi.mock('../../features/api/productsApi');
vi.mock('react-redux', async () => {
    const actual = await vi.importActual('react-redux');
    return {
        ...actual,
        useDispatch: vi.fn(),
    };
});

vi.mock('../../features/cart/cartSlice', () => ({
    updateCartCount: vi.fn(),
}));

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

    const mockDispatch = vi.fn();
    const mockAddToCart = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
        reactRedux.useDispatch.mockReturnValue(mockDispatch);
        updateCartCount.mockReturnValue({ type: 'cart/updateCartCount', payload: 1 });
    });

    it('should show loading state initially', () => {
        vi.spyOn(productsApi, 'useGetProductDetailQuery').mockReturnValue({ isLoading: true });
        vi.spyOn(productsApi, 'useAddToCartMutation').mockReturnValue([mockAddToCart, { isLoading: false }]);

        render(<MemoryRouter><ProductDetailPage /></MemoryRouter>);
        expect(screen.getByText(/loading product details.../i)).toBeInTheDocument();
    });

    it('should render product details and handle add to cart', async () => {
        vi.spyOn(productsApi, 'useGetProductDetailQuery').mockReturnValue({
            data: mockProduct,
            isLoading: false,
            error: null
        });

        const mockUnwrap = vi.fn().mockResolvedValue({ count: 1 });
        mockAddToCart.mockReturnValue({ unwrap: mockUnwrap });

        vi.spyOn(productsApi, 'useAddToCartMutation').mockReturnValue([mockAddToCart, { isLoading: false }]);

        render(
            <MemoryRouter initialEntries={['/product/test-id']}>
                <Routes>
                    <Route path="/product/:id" element={<ProductDetailPage />} />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText('Apple')).toBeInTheDocument();
        expect(screen.getByText('iPhone 15')).toBeInTheDocument();

        const addButton = screen.getByRole('button', { name: /add to cart/i });
        fireEvent.click(addButton);

        await waitFor(() => {
            expect(mockAddToCart).toHaveBeenCalled();

            expect(mockDispatch).toHaveBeenCalled();
        });
    });

    it('should show error message if product fetch fails', () => {
        vi.spyOn(productsApi, 'useGetProductDetailQuery').mockReturnValue({
            isLoading: false,
            error: 'Failed to load'
        });
        vi.spyOn(productsApi, 'useAddToCartMutation').mockReturnValue([mockAddToCart, { isLoading: false }]);

        render(<MemoryRouter><ProductDetailPage /></MemoryRouter>);
        expect(screen.getByText(/failed to load/i)).toBeInTheDocument();
    });
});
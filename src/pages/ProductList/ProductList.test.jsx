import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import ProductListPage from './ProductList';
import * as productsApi from '../../features/api/productsApi';

vi.mock('../../features/api/productsApi');

describe('ProductListPage Component', () => {
    it('should show loading spinner when data is fetching', () => {
        vi.spyOn(productsApi, 'useGetProductsQuery').mockReturnValue({
            data: [],
            isLoading: true,
            error: null
        });

        render(<ProductListPage />);

        expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('should show error message when fetching fails', () => {
        vi.spyOn(productsApi, 'useGetProductsQuery').mockReturnValue({
            data: [],
            isLoading: false,
            error: 'Failed to fetch products'
        });

        render(<ProductListPage />);
        expect(screen.getByText(/failed to fetch products/i)).toBeInTheDocument();
    });

    it('should render a list of products', () => {
        const mockProducts = [
            { id: '1', brand: 'Acer', model: 'Iconia', price: '100', imgUrl: '' },
            { id: '2', brand: 'Alcatel', model: 'OneTouch', price: '150', imgUrl: '' }
        ];

        vi.spyOn(productsApi, 'useGetProductsQuery').mockReturnValue({
            data: mockProducts,
            isLoading: false,
            error: null
        });

        render(
            <MemoryRouter>
                <ProductListPage />
            </MemoryRouter>
        );

        expect(screen.getByText('Acer')).toBeInTheDocument();
        expect(screen.getByText('Alcatel')).toBeInTheDocument();
    });
});
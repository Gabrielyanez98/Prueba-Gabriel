import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import ProductListPage from './ProductList';
import * as hooks from '../../hooks/useProducts';

vi.mock('../../hooks/useProducts');

describe('ProductListPage Component', () => {
    it('should show loading spinner when data is fetching', () => {
        vi.spyOn(hooks, 'useProducts').mockReturnValue({
            products: [],
            loading: true,
            error: null
        });

        render(<ProductListPage />);

        expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('should show error message when fetching fails', () => {
        vi.spyOn(hooks, 'useProducts').mockReturnValue({
            products: [],
            loading: false,
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

        vi.spyOn(hooks, 'useProducts').mockReturnValue({
            products: mockProducts,
            loading: false,
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
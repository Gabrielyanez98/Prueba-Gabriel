import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import Header from './Header';
import * as CartContext from '../../context/CartContext';


vi.mock('../../context/CartContext', () => ({
  useCartContext: vi.fn(),
}));

describe('Header Component', () => {
  it('should render the application title as a link to home', () => {
    CartContext.useCartContext.mockReturnValue({ cartCount: 0 });

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const titleLink = screen.getByText(/ITX-Store/i);
    expect(titleLink.closest('a')).toHaveAttribute('href', '/');
  });

  it('should display the correct cart count from global context', () => {

    CartContext.useCartContext.mockReturnValue({ cartCount: 5 });

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const countElement = screen.getByText('5');
    expect(countElement).toBeInTheDocument();
    expect(countElement.parentElement).toHaveClass('bg-blue-50');
  });

  it('should render breadcrumbs based on the current URL path', () => {
    CartContext.useCartContext.mockReturnValue({ cartCount: 0 });

    render(
      <MemoryRouter initialEntries={['/product/123']}>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByText(/Home/i)).toBeInTheDocument();

    expect(screen.getByText(/PRODUCT/i)).toBeInTheDocument();
    
    expect(screen.getByText(/123/i)).toBeInTheDocument();
  });

  it('should handle navigation through breadcrumbs', () => {
    CartContext.useCartContext.mockReturnValue({ cartCount: 0 });

    render(
      <MemoryRouter initialEntries={['/product/123']}>
        <Header />
      </MemoryRouter>
    );

    const productLink = screen.getByRole('link', { name: /product/i });
    expect(productLink).toHaveAttribute('href', '/product');
  });
});
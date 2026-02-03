import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import Item from './Item';

describe('Item Component', () => {
  const mockProps = {
    id: 'test-id',
    imgUrl: 'https://test.com/image.png',
    brand: 'Apple',
    model: 'iPhone 15',
    price: '999'
  };

  it('should render product information correctly', () => {
    render(
      <MemoryRouter>
        <Item {...mockProps} />
      </MemoryRouter>
    );

    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.getByText('iPhone 15')).toBeInTheDocument();
    expect(screen.getByText('999€')).toBeInTheDocument();
  });

  it('should link to the correct product detail page', () => {
    render(
      <MemoryRouter>
        <Item {...mockProps} />
      </MemoryRouter>
    );

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/product/test-id');
  });

  it('should display N/A when price is missing', () => {
    render(
      <MemoryRouter>
        <Item {...mockProps} price="" />
      </MemoryRouter>
    );
    expect(screen.getByText('N/A')).toBeInTheDocument();
  });
});
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Description from './Description';

describe('Description Component', () => {
  const mockProduct = {
    brand: 'Acer',
    model: 'Iconia Tab',
    price: '150',
    cpu: 'Quad-core',
    ram: '2 GB',
  };

  it('should render correct labels and values', () => {
    render(<Description product={mockProduct} />);
    
    expect(screen.getByText(/BRAND/i)).toBeInTheDocument();
    expect(screen.getByText('Acer')).toBeInTheDocument();
    expect(screen.getByText('150€')).toBeInTheDocument();
    expect(screen.getByText('Quad-core')).toBeInTheDocument();
  });

  it('should show N/A for missing values', () => {
    render(<Description product={{ brand: 'Test' }} />);

    const ramValue = screen.getByText(/RAM/i).nextSibling;
    expect(ramValue.textContent).toBe('N/A');
  });
});
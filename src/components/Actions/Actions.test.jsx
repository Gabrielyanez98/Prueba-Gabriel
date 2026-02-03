import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Actions from './Actions';

describe('Actions Component', () => {
  const mockOptions = {
    colors: [
      { code: 1, name: 'Black' },
      { code: 2, name: 'White' }
    ],
    storages: [
      { code: 10, name: '64GB' },
      { code: 20, name: '128GB' }
    ]
  };

  it('should render storage and color selectors with provided options', () => {
    render(<Actions options={mockOptions} onAddToCart={vi.fn()} isAdding={false} />);
    
    expect(screen.getByLabelText(/storage/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/color/i)).toBeInTheDocument();
    expect(screen.getByText('Black')).toBeInTheDocument();
    expect(screen.getByText('128GB')).toBeInTheDocument();
  });

  it('should have the first options selected by default', () => {
    render(<Actions options={mockOptions} onAddToCart={vi.fn()} isAdding={false} />);
    
    expect(screen.getByLabelText(/storage/i).value).toBe('10');
    expect(screen.getByLabelText(/color/i).value).toBe('1');
  });

  it('should call onAddToCart with selected values when form is submitted', () => {
    const onAddToCartMock = vi.fn();
    render(<Actions options={mockOptions} onAddToCart={onAddToCartMock} isAdding={false} />);
    
    const submitButton = screen.getByRole('button', { name: /add to cart/i });
    fireEvent.click(submitButton);

    expect(onAddToCartMock).toHaveBeenCalledWith(1, 10);
  });

  it('should disable button and show loading text when isAdding is true', () => {
    render(<Actions options={mockOptions} onAddToCart={vi.fn()} isAdding={true} />);
    
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveTextContent(/adding to cart.../i);
  });
});
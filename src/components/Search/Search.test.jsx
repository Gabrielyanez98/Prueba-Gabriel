import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Search from './Search';

describe('Search Component', () => {
  it('should display the current value in the input', () => {
    render(<Search value="Samsung" onChange={() => {}} />);
    const input = screen.getByPlaceholderText(/search brand or model/i);
    expect(input.value).toBe('Samsung');
  });

  it('should call onChange callback when user types', () => {
    const onChangeMock = vi.fn();
    render(<Search value="" onChange={onChangeMock} />);
    
    const input = screen.getByPlaceholderText(/search brand or model/i);
    fireEvent.change(input, { target: { value: 'Nokia' } });
    
    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(onChangeMock).toHaveBeenCalledWith('Nokia');
  });
});
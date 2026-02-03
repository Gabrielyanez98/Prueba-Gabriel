import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Image from './Image';

describe('Image component', () => {
  it('Should show the image with the correct src and alt', () => {
    const testSrc = 'http://test.com/img.jpg';
    const testAlt = 'Mobile Test';
    
    render(<Image src={testSrc} alt={testAlt} />);
    
    const imgElement = screen.getByRole('img');
    expect(imgElement).toHaveAttribute('src', testSrc);
    expect(imgElement).toHaveAttribute('alt', testAlt);
  });
});
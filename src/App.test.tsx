import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Sell USD', () => {
  render(<App />);
  const text = screen.getByText('Sell USD');
  expect(text).toBeInTheDocument();
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import Stopwatch from './Stopwatch';

test('renders stopwatch', () => {
  const {rerender} = render(<Stopwatch />);
  // const linkElement = screen.getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
});

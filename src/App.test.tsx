import { render, screen } from '@testing-library/react';
import App from './App';

test('renders page', () => {
  render(<App />);
  const fontElement = screen.getByText(/Font:/i);
  const fontSizeElement = screen.getByText(/Font size:/i);
  const signWidthElement = screen.getByText(/Sign width:/i);
  const signHeightElement = screen.getByText(/Sign height:/i);
  const fontWeightElement = screen.getByText(/Font weight:/i);
  const charsetElement = screen.getByText(/Charset:/i);
  const spaceWidthElement = screen.getByText(/Space width:/i);
  const fontImageNameElement = screen.getByText(/Font image name:/i);
  const otfontFileNameElement = screen.getByText(/Otfont file name:/i);

  expect(fontElement).toBeInTheDocument();
  expect(fontSizeElement).toBeInTheDocument();
  expect(signWidthElement).toBeInTheDocument();
  expect(signHeightElement).toBeInTheDocument();
  expect(fontWeightElement).toBeInTheDocument();
  expect(charsetElement).toBeInTheDocument();
  expect(spaceWidthElement).toBeInTheDocument();
  expect(fontImageNameElement).toBeInTheDocument();
  expect(otfontFileNameElement).toBeInTheDocument();
});

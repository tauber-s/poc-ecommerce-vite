import { render, screen } from "@testing-library/react";
import Header from "@/components/header/Header";

describe('Header component', () => {
  test('renders header element', () => {
    render(<Header />);
    const headerElement = screen.getByRole('banner'); // "banner" role for header
    expect(headerElement).toBeInTheDocument();
  });

  test('renders navbar element', () => {
    render(<Header />);
    const navbarElement = screen.getByRole('navigation'); // "navigation" role for navbar
    expect(navbarElement).toBeInTheDocument();
  });

  test('renders Home link inside navbar', () => {
    render(<Header />);
    const homeLink = screen.getByRole('link', { name: /home/i });  // Check if the "Home" link is present
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/'); // Check the link's href attribute
  });
});
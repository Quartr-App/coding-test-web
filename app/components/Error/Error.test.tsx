import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Error from "./Error";

describe('Error', () => {
  it('renders default message when no message prop provided', () => {
    render(<Error />);
    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
  });

  it('renders provided message', () => {
    render(<Error message="Ooops! Issues loading data... Try again? " />);
    expect(screen.getByText('Ooops! Issues loading data... Try again?')).toBeInTheDocument();
  });

  it('shows loader and calls sync onRetry when clicked', async () => {
    const onRetry = jest.fn();
    render(<Error message="Network error" onRetry={onRetry} />);
    const button = screen.getByRole('button', { name: /retry fetching data/i });
    fireEvent.click(button);
    expect(screen.getByRole('status', { name: /loading companies/i })).toBeInTheDocument();
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it('shows loader while async onRetry promise resolves', async () => {
    let resolveFn: () => void;
    const promise = new Promise<void>((resolve) => {
      resolveFn = resolve;
    });
    const onRetry = jest.fn(() => promise);
    render(<Error message="Network error" onRetry={onRetry} />);
    const button = screen.getByRole('button', { name: /retry fetching data/i });
    fireEvent.click(button);
    expect(screen.getByRole('status', { name: /loading companies/i })).toBeInTheDocument();
    resolveFn!();
    await waitFor(() => {
      expect(screen.queryByRole('status', { name: /loading companies/i })).toBeNull();
    });
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it('renders structured error (code and message) on separate lines', () => {
    render(<Error message={{ code: 500, message: 'Internal Server Error' }} />);
    const alert = screen.getByRole('alert');
    // Check top line for error
    expect(alert.querySelector('div')?.textContent).toMatch(/error/i);
    // Check second line for code and message
    expect(alert).toHaveTextContent('500: Internal Server Error');
  });
});

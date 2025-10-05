import { render, screen } from "@testing-library/react";
import Loader from "./Loader";

describe("Loader", () => {
  it("renders and announces loading status", () => {
    render(<Loader />);
    const status = screen.getByRole('status', { name: 'Loading companies' });
    expect(status).toBeInTheDocument();
    expect(status).toHaveTextContent('Loading companies...');
  });
});
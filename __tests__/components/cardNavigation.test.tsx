import { fireEvent, render, screen } from "@testing-library/react";
import CardNavigation from "../../app/components/Card/cardNavigation";

describe("CardNavigation", () => {
  it("renders the Event and About tab buttons", () => {
    render(<CardNavigation activeTab="event" onTabChange={jest.fn()} />);

    expect(screen.getByRole("button", { name: "EVENT" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "ABOUT" })).toBeInTheDocument();
  });

  it("notifies when a tab is selected", () => {
    const onTabChange = jest.fn();
    render(<CardNavigation activeTab="event" onTabChange={onTabChange} />);

    fireEvent.click(screen.getByRole("button", { name: "ABOUT" }));

    expect(onTabChange).toHaveBeenCalledTimes(1);
    expect(onTabChange).toHaveBeenCalledWith("about");
  });

  it("marks the active tab with the active styles", () => {
    render(<CardNavigation activeTab="about" onTabChange={jest.fn()} />);

    expect(screen.getByRole("button", { name: "ABOUT" })).toHaveClass(
      "border-b-2",
      "border-gray-800",
    );
    expect(screen.getByRole("button", { name: "EVENT" })).toHaveClass(
      "text-gray-400",
    );
  });
});

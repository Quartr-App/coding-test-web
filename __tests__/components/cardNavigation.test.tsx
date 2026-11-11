import { fireEvent, render, screen } from "@testing-library/react";
import CardNavigation from "../../app/components/Card/cardNavigation";

describe("CardNavigation", () => {
  it("renders the Events and About tab buttons", () => {
    render(<CardNavigation activeTab="event" onTabChange={jest.fn()} />);

    expect(screen.getByRole("tab", { name: "EVENTS" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "ABOUT" })).toBeInTheDocument();
  });

  it("notifies when a tab is selected", () => {
    const onTabChange = jest.fn();
    render(<CardNavigation activeTab="event" onTabChange={onTabChange} />);

    fireEvent.click(screen.getByRole("tab", { name: "ABOUT" }));

    expect(onTabChange).toHaveBeenCalledTimes(1);
    expect(onTabChange).toHaveBeenCalledWith("about");
  });

  it("marks the active tab with the active styles", () => {
    render(<CardNavigation activeTab="about" onTabChange={jest.fn()} />);

    expect(screen.getByRole("tab", { name: "ABOUT" })).toHaveClass(
      "border-b-2",
      "border-company-gray-600",
    );
    expect(screen.getByRole("tab", { name: "EVENTS" })).toHaveClass(
      "text-company-gray-300",
    );
  });
});

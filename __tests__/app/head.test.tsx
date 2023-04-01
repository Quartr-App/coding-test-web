import { render, screen } from "@testing-library/react";
import Head from "@/app/head"; 

describe("Head", () => {
    it("should render", async () => {
        render(<Head />);

        const title = screen.getByRole("title");
        expect(title).toHaveTextContent("Quartr");
    });
});
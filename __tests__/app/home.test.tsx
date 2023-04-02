import Home from "../../app/page";
import { render, screen } from "@testing-library/react";

describe("Home", () => {
    it("Home renders correctly", async () => {
        render(<Home />);

        const heading = screen.getAllByRole("heading");
        expect(heading[0]).toHaveTextContent("Quartr");
        expect(heading[1]).toHaveTextContent("Trending companies");
    });
    it("Connects to the API", async () => {
        const fetchData = async () => {
            const data_res = await fetch("/api/companies");
            console.log("here is the " + {data_res});

            expect(data_res.status).toBe(200);
          };
    });
});

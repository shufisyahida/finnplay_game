import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import Dashboard from "../Dashboard";
import { Data } from "@/interfaces";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useRef: jest.fn(),
}));

describe("Dashboard", () => {
  const mockRouter = {
    refresh: jest.fn(),
  };

  const testData: Data = {
    games: [
      {
        id: 1,
        name: "Game 1",
        provider: 1,
        cover: "https://example.com/cover1.jpg",
        coverLarge: "https://example.com/cover1_large.jpg",
        date: new Date("2023-05-01"),
      },
      {
        id: 2,
        name: "Game 2",
        provider: 2,
        cover: "https://example.com/cover2.jpg",
        coverLarge: "https://example.com/cover2_large.jpg",
        date: new Date("2023-05-02"),
      },
      {
        id: 3,
        name: "Game 2",
        provider: 3,
        cover: "https://example.com/cover2.jpg",
        coverLarge: "https://example.com/cover2_large.jpg",
        date: new Date("2023-05-03"),
      },
    ],
    providers: [
      {
        id: 1,
        name: "Provider 1",
        logo: "logo1.jpg",
      },
      {
        id: 2,
        name: "Provider 2",
        logo: "logo2.jpg",
      },
      {
        id: 3,
        name: "Provider 3",
        logo: "logo3.jpg",
      },
    ],
    groups: [
      {
        id: 1,
        name: "Group 1",
        games: [1, 2],
      },
      {
        id: 2,
        name: "Group 2",
        games: [2, 3],
      },
    ],
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (useRef as jest.Mock).mockReturnValue({
      current: {
        scrollIntoView: jest.fn(),
      },
    });

    global.fetch = jest.fn().mockResolvedValueOnce(
      Promise.resolve({
        ok: true,
        headers: new Headers(),
        json: jest.fn().mockResolvedValue({}),
      }) as unknown as Response
    );
  });

  describe("general", () => {
    test("renders the dashboard component", () => {
      render(
        <Dashboard
          data={{ groups: [], games: [], providers: [] }}
          username="Player"
        />
      );

      expect(screen.queryByRole("header")).toBeInTheDocument();
      expect(screen.queryByLabelText("Search")).toBeInTheDocument();
      expect(screen.queryByText("Providers")).toBeInTheDocument();
      expect(screen.queryByText("Groups")).toBeInTheDocument();
      expect(screen.queryByText("Sorting")).toBeInTheDocument();
      expect(screen.queryByText("Columns")).toBeInTheDocument();
      expect(screen.getByText("Games amount: 0")).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Reset" })).toBeInTheDocument();
      expect(screen.queryByText("Player")).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Logout" })
      ).toBeInTheDocument();
      waitFor(() => {
        expect(
          screen.queryByTestId("list-container")?.querySelectorAll("img").length
        ).toBe(2);
        expect(screen.getByText("Games amount: 2")).toBeInTheDocument();
      });
    });

    it("should filter data based on selected providers, groups, and query", () => {
      const selectedProviders = [2]; // Provider 1
      const selectedGroups = [1, 2]; // Group 1 and Group 2
      const searchQuery = "game";

      const expectedDisplayedData = [
        {
          id: 2,
          name: "Game 2",
          provider: 2,
          cover: "https://example.com/cover2.jpg",
          coverLarge: "https://example.com/cover2_large.jpg",
          date: new Date("2023-05-02"),
        },
      ];

      const { container } = render(
        <Dashboard data={testData} username="player1" />
      );

      const filterElement = container.querySelector(".filter");

      const searchInput = filterElement?.querySelector("#Search");
      if (searchInput) {
        fireEvent.change(searchInput, {
          target: { value: searchQuery },
        });
      }

      selectedProviders.forEach((providerId) => {
        const checkboxElement = filterElement?.querySelector(
          `#checkbox-${providerId}`
        );
        if (checkboxElement) {
          fireEvent.click(checkboxElement);
        }
      });

      selectedGroups.forEach((groupId) => {
        const checkboxElement = filterElement?.querySelector(
          `#checkbox-${groupId}`
        );
        if (checkboxElement) {
          fireEvent.click(checkboxElement);
        }
      });

      waitFor(() => {
        const imageList = screen
          .getByTestId("list-container")
          ?.querySelectorAll("img");
        const renderedAltTexts = imageList?.forEach((image) => image.alt);

        expect(renderedAltTexts).toEqual(
          expectedDisplayedData.map((data) => data.name)
        );
        expect(screen.getByText("Games amount: 1")).toBeInTheDocument();
      });
    });

    test("sort data by name (A-Z)", () => {
      render(<Dashboard data={testData} username="player1" />);

      fireEvent.click(screen.getByText("A-Z"));

      const expectedDisplayedData = [...testData.games];

      waitFor(() => {
        const imageList = screen
          .getByTestId("list-container")
          ?.querySelectorAll("img");
        const renderedAltTexts = imageList?.forEach((image) => image.alt);

        expect(renderedAltTexts).toEqual(
          expectedDisplayedData.map((data) => data.name)
        );
      });
    });

    test("sort data by name (Z-A)", () => {
      render(<Dashboard data={testData} username="player1" />);

      fireEvent.click(screen.getByText("Z-A"));

      const expectedDisplayedData = [...testData.games].reverse();

      waitFor(() => {
        const imageList = screen
          .getByTestId("list-container")
          ?.querySelectorAll("img");
        const renderedAltTexts = imageList?.forEach((image) => image.alt);

        expect(renderedAltTexts).toEqual(
          expectedDisplayedData.map((data) => data.name)
        );
      });
    });

    test("sort data by newest date", () => {
      render(<Dashboard data={testData} username="player1" />);

      fireEvent.click(screen.getByText("Newest"));

      const expectedDisplayedData = [...testData.games].reverse();

      waitFor(() => {
        const imageList = screen
          .getByTestId("list-container")
          ?.querySelectorAll("img");
        const renderedAltTexts = imageList?.forEach((image) => image.alt);

        expect(renderedAltTexts).toEqual(
          expectedDisplayedData.map((data) => data.name)
        );
      });
    });

    test("calls logout API when logout button is clicked", () => {
      render(
        <Dashboard
          data={{ groups: [], games: [], providers: [] }}
          username="Player"
        />
      );

      const logoutButton = screen.getByRole("button", { name: "Logout" });

      fireEvent.click(logoutButton);

      expect(fetch).toHaveBeenCalledWith("/api/logout", { method: "POST" });
    });

    test("calls router refresh when logout API call is successful", async () => {
      render(
        <Dashboard
          data={{ groups: [], games: [], providers: [] }}
          username="Player"
        />
      );

      const logoutButton = screen.getByRole("button", { name: "Logout" });

      fireEvent.click(logoutButton);

      await waitFor(() => {
        expect(mockRouter.refresh).toHaveBeenCalled();
      });
    });
  });

  describe("desktop", () => {
    test("column size change", () => {
      render(<Dashboard data={testData} username="player1" />);

      fireEvent.change(screen.getByTestId("column-size"), {
        target: { value: "3" },
      });

      expect(screen.getByTestId("list-container")).toHaveClass("column-3");
    });

    it("doesn't have 'show filters' button", () => {
      render(<Dashboard data={testData} username="player1" />);

      expect(screen.queryByText(/show filters/)).not.toBeInTheDocument();
    });
  });

  describe("mobile", () => {
    beforeEach(() => {
      global.innerWidth = 418;
      window.dispatchEvent(new Event("resize"));
    });

    test("column size should be 2", () => {
      render(<Dashboard data={testData} username="player1" />);

      waitFor(() => {
        expect(screen.getByTestId("list-container")).toHaveClass("column-2");
      });
    });

    it("has 'show filters' button", () => {
      render(<Dashboard data={testData} username="player1" />);

      waitFor(() => {
        expect(screen.queryByText(/show filters/)).toBeInTheDocument();
      });
    });

    test("not showing the rest of filters", () => {
      render(<Dashboard data={testData} username="player1" />);

      waitFor(() => {
        expect(screen.queryByLabelText("Search")).toBeInTheDocument();
        expect(screen.queryByText("Providers")).not.toBeInTheDocument();
        expect(screen.queryByText("Groups")).not.toBeInTheDocument();
        expect(screen.queryByText("Sorting")).not.toBeInTheDocument();
        expect(screen.getByText(/games amount/)).not.toBeInTheDocument();
        expect(screen.getByText(/reset/)).not.toBeInTheDocument();
        expect(screen.queryByText("Columns")).not.toBeInTheDocument();
      });
    });

    test("show filters", () => {
      render(<Dashboard data={testData} username="player1" />);

      waitFor(() => {
        fireEvent.click(screen.getByText(/show filters/));

        expect(screen.queryByLabelText("Search")).toBeInTheDocument();
        expect(screen.queryByText("Providers")).toBeInTheDocument();
        expect(screen.queryByText("Groups")).toBeInTheDocument();
        expect(screen.queryByText("Sorting")).toBeInTheDocument();
        expect(screen.getByText(/games amount/)).toBeInTheDocument();
        expect(screen.getByText(/reset/)).toBeInTheDocument();
        expect(screen.queryByText("Columns")).not.toBeInTheDocument();
        expect(screen.getByText(/show filters/)).not.toBeInTheDocument();
        expect(screen.getByText(/hide filters/)).toBeInTheDocument();
      });
    });
  });
});

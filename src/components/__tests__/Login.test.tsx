import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";
import Login from "../Login";

jest.mock("next/navigation");

const mockRefresh = jest.fn();

describe("Login", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      refresh: mockRefresh,
    });
  });

  test("submits form successfully", async () => {
    render(<Login />);

    fireEvent.change(screen.getByLabelText("Login"), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "testpassword" },
    });

    global.fetch = jest.fn().mockResolvedValueOnce(
      Promise.resolve({
        ok: true,
        headers: new Headers(),
        json: jest.fn().mockResolvedValue({}),
      }) as unknown as Response
    );

    fireEvent.submit(screen.getByRole("submit"));
    expect(screen.getByAltText("loading")).toBeInTheDocument();

    await waitFor(() => {
      expect(mockRefresh).toHaveBeenCalled();
    });
  });

  test("submits form failed", async () => {
    render(<Login />);

    fireEvent.change(screen.getByLabelText("Login"), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "testpassword" },
    });

    global.fetch = jest.fn().mockResolvedValueOnce(
      Promise.resolve({
        ok: false,
        headers: new Headers(),
        json: jest.fn().mockResolvedValue({}),
      }) as unknown as Response
    );

    fireEvent.submit(screen.getByRole("submit"));
    expect(screen.queryByAltText("loading")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByAltText("loading")).not.toBeInTheDocument();
    });
  });
});

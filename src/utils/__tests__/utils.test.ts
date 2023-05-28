import { getUser } from "../utils";
import { getLoginSession } from "@/lib/auth";
import { findUser } from "@/lib/user";

jest.mock("@/lib/auth", () => ({
  getLoginSession: jest.fn(),
}));
jest.mock("@/lib/user", () => ({
  findUser: jest.fn(),
}));

describe("getUser", () => {
  it("should return the username when session and user are found", async () => {
    const mockSession = { id: "123" };
    const mockUser = { username: "testUser" };

    (getLoginSession as jest.Mock).mockResolvedValue(mockSession);
    (findUser as jest.Mock).mockResolvedValue(mockUser);

    const result = await getUser();

    expect(result).toBe("testUser");
  });

  it("should return undefined when session or user is not found", async () => {
    (getLoginSession as jest.Mock).mockResolvedValue(null);
    (findUser as jest.Mock).mockResolvedValue(null);

    const result = await getUser();

    expect(result).toBeUndefined();
  });
});

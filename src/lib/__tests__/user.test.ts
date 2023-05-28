import { createUser, findUser, validatePassword, users } from "../user";
import { Session } from "@/interfaces/session";

jest.mock("uuid", () => ({
  v4: jest.fn().mockReturnValue("mockId"),
}));

describe("User", () => {
  const mockUsername1 = "user1";
  const mockPassword1 = "password1";

  beforeEach(() => {
    jest.clearAllMocks();
    users.length = 0; // Clear the users array before each test
  });

  it("should create a new user", async () => {
    const mockSalt = "mockSalt";
    const mockHash = "mockHash";

    await createUser({
      username: mockUsername1,
      password: mockPassword1,
    });

    expect(users[0].hash).not.toBeNull();
    expect(users[0].salt).not.toBeNull();
    expect(users[0].username).toBe(mockUsername1);
  });

  it("should find an existing user", async () => {
    const mockUser = {
      id: "mockId",
      createdAt: 123456789,
      username: mockUsername1,
      hash: "mockHash",
      salt: "mockSalt",
    };
    users.push(mockUser);

    const result = await findUser({ username: mockUsername1 });

    expect(result).toEqual(mockUser);
  });

  it("should not find a non-existing user", async () => {
    const result = await findUser({ username: "nonExistingUser" });

    expect(result).toBeUndefined();
  });

  it("should not validate an incorrect password", () => {
    const mockUser = {
      id: "mockId",
      createdAt: 123456789,
      username: mockUsername1,
      hash: "mockHash",
      salt: "mockSalt",
    };
    const inputPassword = "incorrectPassword";
    const result = validatePassword(mockUser, inputPassword);

    expect(result).toBe(false);
  });
});

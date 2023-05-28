import Iron from "@hapi/iron";
import { setLoginSession, getLoginSession } from "../auth";
import { setTokenCookie, getTokenCookie, MAX_AGE } from "../auth-cookies";

const SECRET_TOKEN = process.env.SECRET_TOKEN as string;

jest.mock("@hapi/iron", () => ({
  seal: jest.fn(),
  unseal: jest.fn(),
}));

jest.mock("../auth-cookies", () => ({
  setTokenCookie: jest.fn(),
  getTokenCookie: jest.fn(),
  MAX_AGE: 1000,
}));

describe("Authentication", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockToken = "mockToken";
  const mockSession = {
    id: "id",
    username: "user",
    hash: "hash",
    salt: "salt",
  };

  it("should set the login session and token cookie", async () => {
    (Iron.seal as jest.Mock).mockResolvedValueOnce(mockToken);

    await setLoginSession(mockSession);

    expect(Iron.seal).toHaveBeenCalledWith(
      {
        ...mockSession,
        createdAt: expect.any(Number),
        maxAge: MAX_AGE,
      },
      SECRET_TOKEN,
      Iron.defaults
    );
    expect(setTokenCookie).toHaveBeenCalledWith(mockToken);
  });

  it("should get the login session when a valid token cookie is present", async () => {
    const mockExpiresAt = Date.now() + MAX_AGE * 1000;
    (getTokenCookie as jest.Mock).mockResolvedValueOnce(mockToken);
    (Iron.unseal as jest.Mock).mockResolvedValueOnce(mockSession);

    const result = await getLoginSession();

    expect(getTokenCookie).toHaveBeenCalled();
    expect(Iron.unseal).toHaveBeenCalledWith(
      mockToken,
      SECRET_TOKEN,
      Iron.defaults
    );
    expect(result).toEqual(mockSession);
  });

  it("should return undefined when no token cookie is present", async () => {
    (getTokenCookie as jest.Mock).mockResolvedValueOnce(null);

    const result = await getLoginSession();

    expect(getTokenCookie).toHaveBeenCalled();
    expect(result).toBeUndefined();
  });

  it("should throw an error when the session has expired", async () => {
    const expiredSession = { maxAge: MAX_AGE, createdAt: 0 };
    (getTokenCookie as jest.Mock).mockResolvedValueOnce(mockToken);
    (Iron.unseal as jest.Mock).mockResolvedValueOnce(expiredSession);

    await expect(getLoginSession()).rejects.toThrow("Session expired");
  });
});

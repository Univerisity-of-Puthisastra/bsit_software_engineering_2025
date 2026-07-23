const jwt = require("jsonwebtoken");
const { generateToken, verify } = require("./jwt");

// --- STUB: Replace the real jsonwebtoken library with a fake ---
jest.mock("jsonwebtoken");

describe("JWT Utils", () => {
  // Reset all mocks before each test so they don't bleed into each other
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("generateToken()", () => {
    test("returns the token that jwt.sign produces", () => {
      // STUB: jwt.sign always returns this fixed value, no real crypto happens
      jwt.sign.mockReturnValue("fake-token-abc123");

      const user = { id: 1, role: "admin" };
      const result = generateToken(user);

      // We are testing OUR code (generateToken), not the jwt library itself
      expect(result).toBe("fake-token-abc123");
    });

    // ----------------------------------------------------------------
    // SPY DEMO
    // A spy lets us observe HOW a function was called — its arguments,
    // how many times it was invoked, etc. — without necessarily replacing
    // what it returns.  Here we assert that generateToken() hands the
    // right payload and options to jwt.sign.
    // ----------------------------------------------------------------
    test("SPY – calls jwt.sign with the correct payload and options", () => {
      jwt.sign.mockReturnValue("any-token");

      const user = { id: 42, role: "student" };
      generateToken(user);

      // The SPY assertion: was jwt.sign called exactly once?
      expect(jwt.sign).toHaveBeenCalledTimes(1);

      // And was it called with OUR specific arguments?
      expect(jwt.sign).toHaveBeenCalledWith(
        user,                           // payload
        expect.any(String),             // secret (we don't expose it, but it must be a string)
        { expiresIn: 3600, algorithm: "HS512" } // options
      );
    });
  });

  // ----------------------------------------------------------------
  // MOCK DEMO
  // A mock fully replaces the dependency and controls what it returns.
  // Here we mock jwt.verify so that verify() never touches real crypto,
  // and we confirm our wrapper hands back whatever jwt.verify gives it.
  // ----------------------------------------------------------------
  describe("verify()", () => {
    test("MOCK – returns the decoded payload produced by jwt.verify", () => {
      const fakeDecoded = { id: 7, role: "teacher", iat: 1000, exp: 4600 };

      // MOCK: jwt.verify will always return our fake decoded object
      jwt.verify.mockReturnValue(fakeDecoded);

      const result = verify("some.fake.jwt.token");

      // Our wrapper should pass the result straight through
      expect(result).toEqual(fakeDecoded);

      // Bonus spy assertion: confirm the token was forwarded to jwt.verify
      expect(jwt.verify).toHaveBeenCalledTimes(1);
      expect(jwt.verify).toHaveBeenCalledWith(
        "some.fake.jwt.token",
        expect.any(String) // secret
      );
    });
  });
});

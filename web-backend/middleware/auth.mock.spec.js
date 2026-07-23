// MOCK = verify HOW a dependency was called (behaviour verification).
jest.mock("../utils/jwt");

const { verify } = require("../utils/jwt");
const authMiddleWare = require("./auth");

test("MOCK – verify() is called once with only the token", () => {
  const req = { headers: { authorization: "Bearer some.jwt.token" } };
  const res = { status: () => ({ end: () => {} }) };
  authMiddleWare(req, res, jest.fn());

  expect(verify).toHaveBeenCalledTimes(1);
  expect(verify).toHaveBeenCalledWith("some.jwt.token");
});

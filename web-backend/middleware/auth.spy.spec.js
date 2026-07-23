// SPY = wrap a REAL function, let it run for real, just WATCH how it's called.
const jsonwebtoken = require("jsonwebtoken");
const { generateToken } = require("../utils/jwt");
const authMiddleWare = require("./auth");

test("SPY – the real jsonwebtoken.verify runs, and we observe it was called", () => {
  const token = generateToken({ id: 1, role: "student" }); // a real token

  // jest.spyOn wraps the REAL verify. Behaviour is NOT replaced — it still runs.
  const spy = jest.spyOn(jsonwebtoken, "verify");

  const req = { headers: { authorization: `Bearer ${token}` } };
  const next = jest.fn();
  authMiddleWare(req, {}, next);

  // The spy lets us observe the real call.
  expect(spy).toHaveBeenCalledTimes(1);
  expect(next).toHaveBeenCalledTimes(1); // real verify succeeded, so next() ran

  spy.mockRestore(); // remove the spy, restore the original
});

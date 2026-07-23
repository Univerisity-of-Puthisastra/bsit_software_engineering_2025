// STUB = control what a dependency RETURNS, to drive our code's path.
function handler(db, res) {
  const user = db.find();                 // <-- dependency we stub
  if (user) return res.status(200).json(user);
  return res.status(400).json({ error: "not found" });
}

test("STUB returns a user -> 200", () => {
  const db = { find: jest.fn().mockReturnValue({ id: 1 }) }; // stub
  const res = { status: jest.fn(() => ({ json: jest.fn() })) };

  handler(db, res);

  expect(res.status).toHaveBeenCalledWith(200);
});

test("STUB returns nothing -> 400", () => {
  const db = { find: jest.fn().mockReturnValue(null) };      // stub
  const res = { status: jest.fn(() => ({ json: jest.fn() })) };

  handler(db, res);

  expect(res.status).toHaveBeenCalledWith(400);
});

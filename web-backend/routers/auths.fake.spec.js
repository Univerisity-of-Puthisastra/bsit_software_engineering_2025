// FAKE = a WORKING lightweight replacement for a real dependency.
// Here the dependency is the DATABASE (Prisma). We replace it with an
// in-memory fake that ACTUALLY implements findFirst — so the REAL /login
// route runs unchanged, with real bcrypt and real JWT. Only the DB is fake.

jest.mock("@prisma/client", () => {
  const bcrypt = require("bcrypt");

  // The fake's in-memory data. "alice" has a REAL bcrypt hash of "secret".
  const users = [
    { id: 1, name: "alice", password: bcrypt.hashSync("secret", 10) },
  ];

  return {
    PrismaClient: function () {
      return {
        user: {
          // A working implementation — searches the list like a real DB query.
          findFirst: async ({ where }) =>
            users.find((u) => u.name === where.name) || null,
        },
      };
    },
  };
});

const express = require("express");
const request = require("supertest");
const authRouter = require("./auths"); // the REAL router under test

// Mount the real router on a test app (no app.listen).
const app = express();
app.use(express.json());
app.use("/", authRouter);

test("FAKE – correct credentials log in (real route + real bcrypt, fake DB)", async () => {
  const res = await request(app)
    .post("/login")
    .send({ username: "alice", password: "secret" });

  expect(res.status).toBe(200);
  expect(res.body.token).toBeDefined();
});

test("FAKE – wrong password is rejected", async () => {
  const res = await request(app)
    .post("/login")
    .send({ username: "alice", password: "wrong" });

  expect(res.status).toBe(401);
});

test("FAKE – unknown user is rejected (fake returns null)", async () => {
  const res = await request(app)
    .post("/login")
    .send({ username: "ghost", password: "secret" });

  expect(res.status).toBe(401);
});

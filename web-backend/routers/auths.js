const bcrypt = require("bcrypt");
const { generateToken, verify } = require("../utils/jwt");
const { PrismaClient } = require("@prisma/client");
const authRouter = require("express").Router();
const authMiddleWare = require("../middleware/auth");

const prisma = new PrismaClient();

authRouter.post("/login", async (req, res) => {
  const { username: user, password } = req.body || {};
  console.log({ user, password });

  if (user && password) {
    const foundUser = await prisma.user.findFirst({
      where: { name: user },
    });
    console.log({ foundUser });
    if (foundUser && bcrypt.compareSync(password, foundUser.password)) {
      const { _: password, ...u } = foundUser;
      return res
        .status(200)
        .json({ message: "Login success", token: generateToken(u) });
    }
  }

  return res.status(401).json({ message: "Invalid user or password" });
});

authRouter.post("/protected", authMiddleWare, (req, res) => {
  return res.json({ message: "Success" })
});

module.exports = authRouter;

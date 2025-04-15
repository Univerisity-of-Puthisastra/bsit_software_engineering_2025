const { PrismaClient } = require("@prisma/client");
const userRoutes = require("express").Router();
const bcrypt = require("bcrypt");
const authMiddleWare = require("../middleware/auth");
const salt = 10;
const prisma = new PrismaClient();

userRoutes.get("/", authMiddleWare, async (req, res) => {
  const { password: _, ...users } = await prisma.user.findUnique({
    where: { id: req.user.id },
  });
  res.send(users);
});
userRoutes.get("/:userId", async (req, res) => {
  const { userId } = req.params || {};
  console.log({ userId });
  const foundUser = await prisma.user.findUnique({
    where: { id: parseInt(userId) },
  });
  if (foundUser) res.send(foundUser);
  else {
    res.status(404).send({ message: "not found" });
  }
});

userRoutes.post("/register", async (req, res) => {
  console.log("Request body", req.body);
  const { username: name, password } = req.body || {};

  if (name && password) {
    const createdUser = await prisma.user.create({
      data: { name, password: bcrypt.hashSync(password, salt) },
    });
    res.status(201).send(createdUser);
  } else {
    res.status(400).send({ message: "Bad Request" });
  }
});

module.exports = userRoutes;
